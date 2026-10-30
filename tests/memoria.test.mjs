import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { initMemory, migrateMemory, memoryStatus, backupMemory, resolveMemoryDir } from '../skills/sabatina-visual/scripts/memoria.mjs';

const helper = fileURLToPath(new URL('../skills/sabatina-visual/scripts/memoria.mjs', import.meta.url));
async function fixture(t) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'sabatina-memory-test-'));
  t.after(async () => {
    assert.equal(path.dirname(root), path.resolve(os.tmpdir()));
    assert(path.basename(root).startsWith('sabatina-memory-test-'));
    await fs.rm(root, { recursive: true });
  });
  return { root, dir: path.join(root, 'personal-memory') };
}
async function oldSkill(root, name, lesson = '### L-001 · Acentos\r\nRegra já aprovada: atenção à leitura.\r\n') {
  const source = path.join(root, name);
  await fs.mkdir(path.join(source, 'aprendizados'), { recursive: true });
  await fs.mkdir(path.join(source, 'references'));
  await fs.writeFile(path.join(source, 'aprendizados', 'licoes.md'), lesson);
  await fs.writeFile(path.join(source, 'aprendizados', 'registro.md'), 'Histórico: não apagar.\n');
  await fs.writeFile(path.join(source, 'SKILL.md'), 'Método com ajuste pessoal antigo.\n');
  await fs.writeFile(path.join(source, 'references', 'extra.md'), 'Ajuste promovido.\n');
  return source;
}
const read = file => fs.readFile(file, 'utf8');

test('consultar não cria memória nem revela seu conteúdo', async t => {
  const { dir } = await fixture(t);
  assert.equal((await memoryStatus(dir)).exists, false);
  await assert.rejects(fs.stat(dir), { code: 'ENOENT' });
  await initMemory(dir);
  await fs.writeFile(path.join(dir, 'licoes.md'), 'PREFERENCIA_PRIVADA');
  assert(!JSON.stringify(await memoryStatus(dir)).includes('PREFERENCIA_PRIVADA'));
});

test('reinicializar preserva bytes de lições, preferências e histórico', async t => {
  const { dir } = await fixture(t);
  await initMemory(dir);
  for (const name of ['licoes.md', 'preferencias.md', 'registro.md']) {
    await fs.writeFile(path.join(dir, name), `Conteúdo pessoal: ${name} · aprovação\r\n`);
  }
  const before = await Promise.all(['licoes.md', 'preferencias.md', 'registro.md'].map(n => read(path.join(dir, n))));
  await initMemory(dir);
  assert.deepEqual(await Promise.all(['licoes.md', 'preferencias.md', 'registro.md'].map(n => read(path.join(dir, n)))), before);
});

test('migração mantém originais e snapshots exatos; repetir não duplica', async t => {
  const { root, dir } = await fixture(t);
  const source = await oldSkill(root, 'old');
  await initMemory(dir);
  await fs.writeFile(path.join(dir, 'preferencias.md'), 'Preferência pessoal existente.');
  const original = await fs.readFile(path.join(source, 'aprendizados', 'licoes.md'));
  const first = await migrateMemory(source, dir);
  assert.equal(first.imported, true);
  assert.equal(first.files, 4);
  const snapshot = path.join(dir, 'legado', first.id);
  assert.deepEqual(await fs.readFile(path.join(snapshot, 'aprendizados', 'licoes.md')), original);
  assert.deepEqual(await fs.readFile(path.join(source, 'aprendizados', 'licoes.md')), original);
  assert.equal(await read(path.join(snapshot, 'references', 'extra.md')), 'Ajuste promovido.\n');
  assert.equal((await migrateMemory(source, dir)).imported, false);
  assert.equal(JSON.parse(await read(path.join(dir, 'origens.json'))).imports.length, 1);
  assert.equal(await read(path.join(dir, 'preferencias.md')), 'Preferência pessoal existente.');
});

test('duas origens com o mesmo ID de lição não se apagam', async t => {
  const { root, dir } = await fixture(t);
  const one = await oldSkill(root, 'one', '### L-001\nPrimeira regra aprovada.');
  const two = await oldSkill(root, 'two', '### L-001\nOutra regra aprovada.');
  await migrateMemory(one, dir);
  await migrateMemory(two, dir);
  const index = JSON.parse(await read(path.join(dir, 'origens.json')));
  assert.equal(index.imports.length, 2);
  assert.notEqual(index.imports[0].id, index.imports[1].id);
  assert.notEqual(await read(path.join(dir, index.imports[0].lessons_path)), await read(path.join(dir, index.imports[1].lessons_path)));
});

test('troca de versão e de skill direta para plugin usa a mesma memória', async t => {
  const { root, dir } = await fixture(t);
  const savedEnv = process.env.SABATINA_VISUAL_MEMORY_DIR;
  process.env.SABATINA_VISUAL_MEMORY_DIR = dir;
  try {
    for (const name of ['direct', 'plugin-v1', 'plugin-v2']) {
      const dest = path.join(root, name, 'skills', 'sabatina-visual', 'scripts', 'memoria.mjs');
      await fs.mkdir(path.dirname(dest), { recursive: true });
      await fs.copyFile(helper, dest);
      const installed = await import(pathToFileURL(dest));
      assert.equal(await installed.resolveMemoryDir(), dir);
      await installed.initMemory();
      if (name === 'direct') await fs.writeFile(path.join(dir, 'licoes.md'), 'Lição aprovada antes dos updates.');
      assert.equal(await read(path.join(dir, 'licoes.md')), 'Lição aprovada antes dos updates.');
    }
  } finally {
    if (savedEnv === undefined) delete process.env.SABATINA_VISUAL_MEMORY_DIR;
    else process.env.SABATINA_VISUAL_MEMORY_DIR = savedEnv;
  }
});

test('backup recupera a memória anterior sem sobrescrever a atual nem recursão de backups', async t => {
  const { dir } = await fixture(t);
  await initMemory(dir);
  await fs.writeFile(path.join(dir, 'licoes.md'), 'Antes.');
  const first = await backupMemory(dir);
  await fs.writeFile(path.join(dir, 'licoes.md'), 'Depois.');
  const second = await backupMemory(dir);
  assert.equal(await read(path.join(first.backup, 'licoes.md')), 'Antes.');
  assert.equal(await read(path.join(second.backup, 'licoes.md')), 'Depois.');
  await assert.rejects(fs.stat(path.join(second.backup, 'backups')), { code: 'ENOENT' });
  assert.equal(await read(path.join(dir, 'licoes.md')), 'Depois.');
});

test('formato futuro é recusado sem reescrever ou perder campos', async t => {
  const { dir } = await fixture(t);
  await fs.mkdir(dir);
  const future = '{"schema_version":99,"campo_futuro":"preservar"}';
  await fs.writeFile(path.join(dir, 'memoria.json'), future);
  await assert.rejects(initMemory(dir), /Formato de memória desconhecido/);
  assert.equal(await read(path.join(dir, 'memoria.json')), future);
  assert.deepEqual(await fs.readdir(dir), ['memoria.json']);
});

test('destinos dentro do pacote, da origem ou relativos são recusados', async t => {
  const { root, dir } = await fixture(t);
  await assert.rejects(resolveMemoryDir('relative'), /absoluto/);
  await assert.rejects(resolveMemoryDir(path.resolve(path.dirname(helper), '..', 'memoria')), /fora da instalação/);
  const source = await oldSkill(root, 'old');
  await assert.rejects(migrateMemory(source, path.join(source, 'memory')), /fora da instalação/);
  await fs.mkdir(path.join(root, 'repo', '.git'), { recursive: true });
  await assert.rejects(resolveMemoryDir(path.join(root, 'repo', 'memory')), /repositórios/);
  assert.notEqual(await resolveMemoryDir(dir), source);
});

test('índice corrompido e trava existente não são zerados', async t => {
  const { dir } = await fixture(t);
  await initMemory(dir);
  await fs.writeFile(path.join(dir, 'origens.json'), 'NAO_E_JSON');
  await assert.rejects(initMemory(dir));
  assert.equal(await read(path.join(dir, 'origens.json')), 'NAO_E_JSON');
  await fs.writeFile(path.join(dir, '.memoria.lock'), 'outro agente');
  await assert.rejects(initMemory(dir), /Memória em uso/);
  assert.equal(await read(path.join(dir, '.memoria.lock')), 'outro agente');
});

test('migração repetida detecta snapshot incompleto em vez de afirmar sucesso', async t => {
  const { root, dir } = await fixture(t);
  const source = await oldSkill(root, 'old');
  const result = await migrateMemory(source, dir);
  await fs.writeFile(path.join(dir, 'legado', result.id, 'aprendizados', 'licoes.md'), 'alterado');
  await assert.rejects(migrateMemory(source, dir), /alterada ou incompleta/);
  assert((await read(path.join(source, 'aprendizados', 'licoes.md'))).includes('Acentos'));
});

test('um link na pasta de backups não permite gravar fora da memória', async t => {
  const { root, dir } = await fixture(t);
  await initMemory(dir);
  const outside = path.join(root, 'outside');
  await fs.mkdir(outside);
  await fs.symlink(outside, path.join(dir, 'backups'), process.platform === 'win32' ? 'junction' : 'dir');
  await assert.rejects(backupMemory(dir), /Diretório de dados inválido/);
  assert.deepEqual(await fs.readdir(outside), []);
});

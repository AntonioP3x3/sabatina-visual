# Instalação

## Pelo terminal

Instale [Node.js](https://nodejs.org/) 22.20 ou superior e [Git](https://git-scm.com/). Abra o terminal na pasta do projeto e execute:

```sh
npx skills@latest add AntonioP3x3/sabatina-visual --skill sabatina-visual
```

O instalador deixa escolher o agente. Para selecionar diretamente, use `-a codex`, `-a claude-code` ou `-a cursor`. Para instalar no usuário e usar em vários projetos, acrescente `-g`.

Exemplo para Codex, disponível em vários projetos:

```sh
npx skills@latest add AntonioP3x3/sabatina-visual --skill sabatina-visual -a codex -g
```

Se o PowerShell bloquear `npx.ps1`, use `npx.cmd` no mesmo comando; não é necessário alterar a política de execução.

Se o instalador perguntar como disponibilizar os arquivos, pode escolher cópia. A opção `--copy` também permite pedir isso diretamente.

## Pelo próprio agente

Copie um dos [prompts prontos](PROMPTS.md). O agente precisa ter acesso a terminal e internet, ou a um instalador de skills do próprio ambiente.

No Codex, o prompt específico usa o instalador nativo quando disponível. O instalador `npx skills` é a alternativa comum para vários agentes.

## Plugin no Codex

O pacote inclui `plugin.json`, compatibilidade em `.codex-plugin/plugin.json` e catálogo em `.agents/plugins/marketplace.json`. Para instalar pelo repositório:

```sh
codex plugin marketplace add AntonioP3x3/sabatina-visual
codex plugin add sabatina-visual@antonio-castro
```

Abra uma nova sessão e confirme que a skill do plugin foi carregada. Não mantenha a instalação direta e o plugin ativos simultaneamente no mesmo agente. As duas formas usam o mesmo endereço de memória pessoal; não precisam transferir dados entre caches de instalação. A configuração é local e não publica o plugin no diretório universal.

## Sem Node.js: instalação manual

Baixe o ZIP em **Code → Download ZIP** no [repositório](https://github.com/AntonioP3x3/sabatina-visual), ou clone:

```sh
git clone https://github.com/AntonioP3x3/sabatina-visual.git
```

Copie a pasta inteira `skills/sabatina-visual` para a pasta de skills reconhecida pelo seu agente. Não copie só o `SKILL.md`: ele usa os arquivos de referência ao lado.

| Agente | Só neste projeto | Para seu usuário |
| --- | --- | --- |
| Codex | `.agents/skills/sabatina-visual/` | `$CODEX_HOME/skills/sabatina-visual/`, ou `~/.codex/skills/sabatina-visual/` quando não definido |
| Claude Code | `.claude/skills/sabatina-visual/` | `~/.claude/skills/sabatina-visual/` |
| Cursor | `.agents/skills/sabatina-visual/` | `~/.cursor/skills/sabatina-visual/` |

`~` significa a pasta do seu usuário. No Windows, em geral é `C:\Users\seu-usuario`. Se o ambiente usa uma pasta personalizada de skills, respeite essa configuração. Antes de copiar, confira se já existe uma versão modificada e guarde-a.

No Codex, o instalador nativo usa `$CODEX_HOME/skills` e o instalador `skills` pode usar a pasta compartilhada `~/.agents/skills`. Confira o caminho informado pelo instalador e evite duplicar a mesma skill.

A pasta instalada deve conter:

```text
sabatina-visual/
├── SKILL.md
├── agents/openai.yaml
├── scripts/memoria.mjs
├── aprendizados/
│   ├── licoes.md
│   └── registro.md
└── references/
    ├── acabamento-tecnico.md
    ├── aprender.md
    ├── brief-transferivel.md
    ├── configurar-conectores.md
    ├── estilos-e-controles.md
    ├── fontes-e-proveniencia.md
    ├── memoria-persistente.md
    └── qualidade-visual.md
```

## Confira se funcionou

Abra uma nova sessão do agente e peça:

```text
Localize a skill sabatina-visual e confirme se consegue ler o SKILL.md
e references/brief-transferivel.md. Diga de qual pasta está lendo.
```

Depois use [um dos pedidos de exemplo](PROMPTS.md). A primeira conversa deve verificar contexto e ferramentas antes de propor decisões visuais. Só ver o nome em uma lista não comprova que as referências foram instaladas.

## Atualização

**Vindo da versão antiga:** faça primeiro a [migração da memória](MEMORIA.md#se-você-já-usava-a-versão-antiga), antes de executar qualquer comando que substitua a instalação. Isso também preserva ajustes incorporados ao método antigo para comparação.

**A partir da versão 1.1:** as memórias pessoais já ficam fora da instalação. Atualize o método mantendo o mesmo endereço externo. Não apague a pasta de memória quando reinstalar ou remover o plugin.

Se instalou pelo `skills`:

```sh
npx skills@latest check
npx skills@latest update sabatina-visual
```

Se usa o plugin do Codex, atualize o catálogo e a instalação:

```sh
codex plugin marketplace upgrade antonio-castro
codex plugin add sabatina-visual@antonio-castro
```

Confira a versão instalada e abra uma nova sessão; reinicie o aplicativo se a atualização não aparecer. Se instalou manualmente, baixe a versão nova e substitua somente o pacote, preservando a pasta externa. Edições próprias em arquivos do método ainda precisam de comparação; prefira guardar personalizações na memória externa.

Antes de qualquer atualização, você pode pedir: “faça um backup da minha memória da sabatina e atualize o método preservando esse endereço”. [Procedimento e limitações →](MEMORIA.md)

## Problemas comuns

- **A skill não aparece:** confira a pasta do agente e abra uma nova sessão.
- **Aparece, mas faltam referências:** reinstale a pasta completa, preservando suas alterações.
- **Não há navegador ou conector:** a instalação pode estar correta; as capacidades vêm do agente. Peça que informe o que está disponível e siga com as alternativas.
- **O agente só permite conversar:** use um ambiente que aceite skills locais. Colar apenas o `SKILL.md` perde as referências complementares.
- **O comando não encontra o repositório:** confira acesso à internet e a URL. O repositório é público; baixar não exige convite.

Referências: [instalador e opções](https://github.com/vercel-labs/skills/blob/main/docs/commands.md), [agentes e diretórios](https://github.com/vercel-labs/skills/blob/main/docs/agents.md).

Plugins: [formato, catálogo e comandos oficiais do Codex](https://developers.openai.com/plugins/build/plugins).

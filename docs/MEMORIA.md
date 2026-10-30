# Atualize a skill sem perder o que aprendeu

A partir da versão 1.1, o método e a memória pessoal têm endereços diferentes. Você recebe melhorias da skill sem precisar reaprender suas preferências a cada atualização.

| Conteúdo | Onde fica | Quem recebe atualizações |
| --- | --- | --- |
| Método, guias e lições compartilhadas | Repositório ou pasta instalada do plugin/skill | Quem atualiza a instalação. |
| Suas lições e preferências aprovadas | `~/.sabatina-visual/memoria/` | Só você; atualizações do pacote não substituem essa pasta. |
| Decisões e materiais de um cliente/projeto | `sabatina/` naquele projeto | Quem tem acesso ao projeto. |

Cada amigo mantém sua própria memória. Nada é enviado ao autor automaticamente. Melhorias genéricas que você queira distribuir precisam ser revisadas e incorporadas ao método público; uma preferência sua não vira padrão para todos.

## No dia a dia

Peça **“registra o que aprendemos”**. O agente propõe até três memórias, mostra onde serão salvas e espera sua aprovação. Em sessões seguintes, a skill lê as lições e preferências externas junto das regras atuais e das lições antigas migradas. Decisões atuais e a identidade do cliente prevalecem quando uma preferência não se aplica.

O endereço padrão é `~/.sabatina-visual/memoria/`. No Windows, fica dentro da sua pasta de usuário; no macOS/Linux, dentro da sua home. Para usar outro endereço, configure `SABATINA_VISUAL_MEMORY_DIR` com um caminho absoluto e mantenha o mesmo valor nos agentes. Ele precisa estar fora de instalações, caches e repositórios. A skill não usa o diretório de uma versão do plugin para salvar dados pessoais.

A estrutura pessoal é:

```text
memoria/
├── memoria.json          Versão do formato de dados
├── licoes.md             Lições pessoais aprovadas
├── preferencias.md       Preferências aprovadas e seu escopo
├── registro.md           Histórico de alterações
├── origens.json          Índice das instalações antigas migradas
├── legado/               Cópias preservadas das memórias e do método antigos
└── backups/              Cópias de segurança locais
```

Esses arquivos não são gerados dentro do repositório. Se a pasta estiver inacessível, o agente deve informar isso e preservar as propostas no projeto, sem afirmar que gravou.

## Se você já usava a versão antiga

**Migre antes de substituir a instalação antiga.** Ela armazenava lições em `aprendizados/` e podia incorporar regras pessoais diretamente ao método. Uma atualização que já tenha apagado esses arquivos não pode ser desfeita pelo mecanismo novo sem uma cópia anterior.

A forma mais simples é colar o [prompt de atualização com preservação de memória](PROMPTS.md#atualizar-preservando-minha-memória) no agente.

Para fazer pelo terminal, clone a versão nova em uma pasta separada da instalação antiga, entre nela e use:

```sh
# Troque o marcador pelo caminho absoluto da instalação antiga.
node skills/sabatina-visual/scripts/memoria.mjs migrate --source "CAMINHO_ABSOLUTO_DA_SKILL_ANTIGA"
```

O auxiliar copia e verifica os arquivos de aprendizado, `SKILL.md` e referências antigos em uma pasta externa identificada pelo conteúdo. Os originais ficam intactos. A cópia é indexada para que a skill continue lendo as lições antigas. Repetir a mesma migração não duplica a origem; arquivos de duas instalações com IDs de lição iguais permanecem distintos. Regras pessoais promovidas diretamente ao método ficam disponíveis para comparação e aprovação; não são aplicadas como substituição integral da versão nova.

Migre cada cópia antiga distinta que tenha usado. Depois confira o resultado e siga os comandos de atualização em [Instalação](INSTALACAO.md#atualização). Se não tiver Node, o agente pode preservar e indexar os arquivos com suas ferramentas de arquivo, conforme o guia interno da skill. Se não puder verificar a cópia, não deve substituir a instalação.

## Comandos de manutenção

Estes exemplos partem da raiz do repositório. Numa instalação pelo plugin, use o caminho real do auxiliar dentro da skill instalada. Ele precisa de Node.js 18+ e não instala dependências nem acessa a rede.

```sh
# Mostra o endereço e os nomes dos arquivos, sem imprimir memórias.
node skills/sabatina-visual/scripts/memoria.mjs status

# Cria somente os arquivos ausentes. Não zera os existentes.
node skills/sabatina-visual/scripts/memoria.mjs init

# Faz uma cópia integral da memória, sem incluir backups anteriores.
node skills/sabatina-visual/scripts/memoria.mjs backup
```

`--dir "CAMINHO_ABSOLUTO"` seleciona outro endereço para a operação. Isso não configura sozinho os próximos agentes: para uso permanente, configure a variável ou comunique o mesmo endereço em cada sessão. Não use uma pasta temporária de projeto como memória pessoal definitiva.

Faça backup antes de editar memórias ou converter seu formato. Para recuperar, compare a cópia com o conteúdo atual antes de substituir arquivos. Uma memória corrompida ou de formato desconhecido não deve ser “corrigida” com uma pasta vazia; a ferramenta interrompe a operação nesses casos. Não execute gravações concorrentes por dois agentes.

## Plugin, atualização e outros computadores

O plugin e a skill direta usam o mesmo endereço pessoal na mesma máquina. Nenhum hook obrigatório nem serviço externo é necessário. Atualizações substituem o pacote; a memória permanece fora dele. Desinstalar/reinstalar não deve remover a pasta pessoal.

A persistência depende de acesso a essa pasta: em um computador novo, copie-a por um meio escolhido por você. Em ambientes web/cloud sem arquivos pessoais persistentes, a skill deve exportar as memórias aprovadas e explicar que você precisa levá-las à próxima sessão. Não há sincronização automática entre máquinas, contas ou amigos. Um backup no mesmo disco não protege contra perda do dispositivo.

O código e a documentação são distribuídos pelo [repositório](https://github.com/AntonioP3x3/sabatina-visual); suas memórias pessoais não entram em ZIPs, commits ou publicações. Alterações feitas diretamente nos arquivos instalados do método continuam sujeitas à substituição: guarde personalizações no endereço externo.

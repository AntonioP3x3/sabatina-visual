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

Se instalou pelo `skills`, confira e atualize a skill:

```sh
npx skills@latest check
npx skills@latest update sabatina-visual
```

Guarde antes suas alterações e os arquivos de `aprendizados/`; uma atualização pode substituí-los. Se instalou manualmente, baixe a versão nova e compare as pastas antes de substituir arquivos. Não mantenha duas instalações da mesma skill no mesmo agente.

## Problemas comuns

- **A skill não aparece:** confira a pasta do agente e abra uma nova sessão.
- **Aparece, mas faltam referências:** reinstale a pasta completa, preservando suas alterações.
- **Não há navegador ou conector:** a instalação pode estar correta; as capacidades vêm do agente. Peça que informe o que está disponível e siga com as alternativas.
- **O agente só permite conversar:** use um ambiente que aceite skills locais. Colar apenas o `SKILL.md` perde as referências complementares.
- **O comando não encontra o repositório:** confira acesso à internet e a URL. O repositório é público; baixar não exige convite.

Referências: [instalador e opções](https://github.com/vercel-labs/skills/blob/main/docs/commands.md), [agentes e diretórios](https://github.com/vercel-labs/skills/blob/main/docs/agents.md).

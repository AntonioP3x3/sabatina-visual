# Sabatina visual

**Defina a direção visual com seu agente de IA, mesmo sem saber design.**

Você pede uma landing page e o agente já começa a escolher cores, fontes e componentes. A Sabatina visual cria uma conversa antes disso: mostra referências, explica as opções e faz uma pergunta por vez até vocês chegarem a uma direção que faça sentido.

É uma skill em português criada por [Antonio Castro](https://github.com/AntonioP3x3) para compartilhar com amigos e com quem quiser experimentar. Uma skill é uma pasta de instruções que ensina um jeito de trabalhar ao agente.

## Instale em um comando

No terminal, dentro do seu projeto:

```sh
npx skills@latest add AntonioP3x3/sabatina-visual --skill sabatina-visual
```

Escolha seu agente no instalador. Precisa de [Node.js](https://nodejs.org/) 22.20 ou superior e Git. O comando usa o instalador aberto [skills](https://github.com/vercel-labs/skills), também adotado pelos repositórios de referência.

Para instalar diretamente no agente que você usa:

```sh
# Codex
npx skills@latest add AntonioP3x3/sabatina-visual --skill sabatina-visual -a codex

# Claude Code
npx skills@latest add AntonioP3x3/sabatina-visual --skill sabatina-visual -a claude-code

# Cursor
npx skills@latest add AntonioP3x3/sabatina-visual --skill sabatina-visual -a cursor
```

A instalação vale para o projeto atual. Acrescente `-g` para usar em vários projetos. [Outras formas de instalar e resolver problemas →](docs/INSTALACAO.md)

## Prefere pedir ao agente? Cole isto

```text
Instale a skill sabatina-visual deste repositório:
https://github.com/AntonioP3x3/sabatina-visual

Use o instalador de skills disponível no seu ambiente ou execute:
npx skills@latest add AntonioP3x3/sabatina-visual --skill sabatina-visual

Instale apenas para o agente que estou usando, no projeto atual. Se precisar
escolher o agente e não conseguir identificá-lo, pergunte. Preserve qualquer
instalação existente com alterações locais. A instalação precisa incluir a
pasta inteira skills/sabatina-visual, com references, aprendizados e agents.
Ao terminar, confirme onde instalou e como começo a usar. Se faltar acesso
ao terminal ou à internet, explique a limitação sem afirmar que instalou.
```

[Prompts específicos para Codex, Claude Code e uso no dia a dia →](docs/PROMPTS.md)

## Comece uma conversa

No Codex:

```text
Use $sabatina-visual para definir comigo o visual de uma landing page
para meu projeto. Quero ver referências e entender as escolhas antes
de começar a implementação.
```

No Claude Code, use `/sabatina-visual` seguido do pedido. Em outros agentes, peça: “Use a skill sabatina-visual para…”. Se a skill não aparecer, abra uma nova sessão do agente.

## O que acontece na prática

1. **Contexto e identidade.** O agente entende a tarefa, examina a marca e verifica as ferramentas disponíveis.
2. **Referências.** Mostra imagens e explica onde olhar, distinguindo capturas reais de estudos próprios.
3. **Decisões.** Ajuda a escolher estrutura, personalidade, quantidade de informação e movimento, uma pergunta por vez.
4. **Recursos.** Procura componentes e outros recursos compatíveis com a direção escolhida.
5. **Brief e execução.** Entrega um documento com as decisões e critérios de qualidade; implementa quando isso fizer parte do pedido.

No projeto, a conversa pode gerar `sabatina/decisoes.md`, `sabatina/quadro-referencias.html` e um brief para continuar com o mesmo agente ou outro executor.

Use para páginas novas, landing pages, interfaces e redesigns com a direção em aberto. Ajustes pequenos e projetos com visual já aprovado recebem um fluxo abreviado.

## Ferramentas e limites

A pasta contém o método completo. Não é necessário instalar as skills de Matt Pocock, Emil Kowalski ou qualquer conector para carregar as instruções.

Para a experiência visual completa, seu agente precisa conseguir pesquisar, mostrar imagens e criar arquivos. Navegador, geração de imagens, 21st.dev, Landingfolio e OpenDesign Cloud ampliam as possibilidades quando disponíveis. Sem uma ferramenta, o agente deve explicar o limite e aproveitar as alternativas existentes. Instalar esta skill não instala nem conecta esses serviços; recursos pagos dependem da sua autorização.

Os comandos de instalação atendem agentes com suporte a skills e arquivos locais. Eles não instalam automaticamente a skill em um chat comum do ChatGPT ou Claude.

## Personalize e compartilhe

Você pode adaptar a sua cópia. Para guardar uma melhoria de método descoberta durante o uso, peça **“registra o que aprendemos”**: o agente propõe as lições e só grava as aprovadas. Informações de clientes e do projeto ficam fora da skill.

Antes de atualizar, guarde suas adaptações e lições locais. [Como contribuir →](CONTRIBUTING.md)

## Referências e créditos

A organização e a instalação deste repositório foram informadas pelos projetos de [Matt Pocock](https://github.com/mattpocock/skills) e [Emil Kowalski](https://github.com/emilkowalski/skills). O guia de acabamento da skill também reúne adaptações de Emil Kowalski, [Jakub Krehel](https://github.com/jakubkrehel/make-interfaces-feel-better) e das [Web Interface Guidelines da Vercel](https://github.com/vercel-labs/web-interface-guidelines).

Esses projetos são referências independentes; seus autores não são responsáveis por esta skill. Atribuições e avisos de licença estão em [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Licença

[MIT](LICENSE). Pode usar, adaptar e redistribuir, inclusive comercialmente, preservando os avisos de licença.

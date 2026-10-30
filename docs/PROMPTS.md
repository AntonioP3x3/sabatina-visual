# Prompts para copiar e colar

Escolha o que combina com o seu ambiente. A instalação não começa uma sabatina nem autoriza conectar serviços pagos.

Se já houver uma versão antiga, acrescente: “antes de substituir, use a ferramenta de memória da versão nova para migrar a instalação antiga; verifique a cópia e preserve meus ajustes”. Veja [o procedimento completo](MEMORIA.md).

## Instalar no Codex

```text
Use $skill-installer para instalar a skill desta pasta do GitHub:
https://github.com/AntonioP3x3/sabatina-visual/tree/main/skills/sabatina-visual

Instale a pasta completa, incluindo references, aprendizados e agents.
Se o instalador nativo não estiver disponível, use o instalador skills
com o agente codex selecionado. Preserve uma instalação existente com
alterações locais. Confirme o caminho instalado e diga se preciso abrir
uma nova sessão para a skill aparecer.
```

## Instalar no Claude Code

```text
Instale a skill sabatina-visual neste projeto para o Claude Code:
npx skills@latest add AntonioP3x3/sabatina-visual --skill sabatina-visual -a claude-code

Preserve uma versão existente com alterações locais. Confira se a pasta
instalada inclui SKILL.md, references, aprendizados e agents. Ao terminar,
explique como invocar /sabatina-visual e se preciso abrir uma nova sessão.
Se não puder executar o comando, explique a limitação.
```

## Instalar no Cursor ou em outro agente

```text
Instale a skill sabatina-visual de https://github.com/AntonioP3x3/sabatina-visual
usando npx skills@latest add AntonioP3x3/sabatina-visual --skill sabatina-visual.
Selecione apenas o agente que estou usando, com instalação neste projeto.
Se não conseguir identificar o agente, pergunte antes de escolher.
Preserve alterações de uma versão já instalada e confirme que copiou
a pasta completa skills/sabatina-visual, com suas referências.
```

## Descobrir o visual de uma página

```text
Use a skill sabatina-visual para definir comigo a direção visual de uma
landing page para [descreva o projeto]. O público é [quem vai visitar]
e a ação principal é [o que a pessoa deve fazer]. Ainda não tenho uma
direção definida. Mostre referências, explique as opções com palavras
simples e me ajude a decidir uma coisa por vez. Por enquanto quero o brief.
```

## Redesenhar algo existente

```text
Use a skill sabatina-visual para me ajudar a redesenhar [tela ou página].
A versão atual está em [link ou arquivo]. Preserve a identidade da marca
e os componentes existentes quando fizer sentido. Quero entender o que
melhorar, comparar referências e aprovar a direção antes de implementar.
```

## Definir a direção e implementar

```text
Use a skill sabatina-visual para criar [página ou interface] para [projeto].
Primeiro, defina comigo a direção visual usando referências e decisões
guiadas. Depois das escolhas essenciais, prepare o brief e uma prévia
da primeira tela para eu validar. Com a direção validada, implemente no
projeto atual e verifique as telas relevantes. Não publique na internet.
```

## Entregar a outro agente

```text
Prepare o brief transferível da sabatina com identidade, fontes,
decisões confirmadas, recursos, comportamento e critérios de aceite
por extenso. Inclua os arquivos que preciso levar para outro agente
continuar sem ter acesso a esta conversa.
```

## Guardar uma lição

```text
Registra o que aprendemos nesta sessão. Proponha até três lições de método
ou preferências pessoais e espere minha aprovação antes de gravar.
Salve as aprovadas na memória pessoal externa da sabatina, nunca na pasta
instalada. Não inclua nomes, arquivos nem informações do cliente.
```

## Atualizar preservando minha memória

```text
Atualize minha sabatina-visual usando o repositório
https://github.com/AntonioP3x3/sabatina-visual.

Antes de substituir qualquer arquivo, identifique a instalação ativa e o
endereço da minha memória pessoal. Se ainda uso o modelo antigo, obtenha
a versão nova em uma pasta separada e use scripts/memoria.mjs migrate
com --source apontando para a instalação antiga. Confira a cópia antes
de atualizar. Preserve também ajustes pessoais promovidos ao método
para comparação. Faça backup da memória externa. Atualize somente o
pacote, mantendo o mesmo endereço de memória, e confirme que as lições
e preferências anteriores continuam acessíveis. Não publique meu histórico.
```

## Conferir o que a skill lembra

```text
Confira a memória persistente da sabatina-visual. Informe o endereço
resolvido, as lições e preferências ativas e eventuais conflitos com o
pedido atual. Não confunda exemplos de formato com memórias reais.
Confira também as lições antigas listadas no índice de migração,
deduplicando as origens. Se não houver memória, diga isso sem inventar.
```

## Fazer backup ou mudar de computador

```text
Faça um backup da minha memória pessoal da sabatina-visual, incluindo
lições, preferências, histórico e origens legadas. Preserve a memória
atual. Mostre o caminho do backup e explique qual pasta preciso levar
para outro computador. Não envie nem sincronize esses dados sem eu pedir.
```

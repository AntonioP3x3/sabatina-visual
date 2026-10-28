# Aprender com a sessão

Leia somente quando o usuário pedir para registrar o que a sessão ensinou (“registra o que aprendemos”, “aprende com essa conversa”, “adiciona isso ao seu conhecimento”). Nada é gravado sem aprovação explícita de cada lição; silêncio não aprova.

O objetivo é a skill melhorar com o uso em qualquer agente que leia esta pasta, sem virar diário de sessões. Separe três camadas:

| O que apareceu | Para onde vai |
| --- | --- |
| Fato do caso ou do cliente (nome, valor, decisão, arquivo) | Fica no projeto, em `sabatina/decisoes.md`; nunca na skill. |
| Lição do método que vale para outros casos | [lições](../aprendizados/licoes.md), como lição ativa. |
| Regra já confirmada várias vezes | Vira texto no arquivo certo (`SKILL.md` ou `references/`) e sai das lições. |

## 1. Garimpe a sessão

Procure só estes sinais:

- **Correção do usuário:** ele disse que algo estava errado, confuso ou fora do que queria.
- **Beco sem saída que virou caminho:** uma ferramenta falhou e outro jeito funcionou.
- **Preferência recorrente:** um gosto ou modo de decidir que ele repetiu.
- **Atrito com a própria skill:** regra ambígua, que travou ou que obrigou a improvisar.

Ignore o que correu como a skill já manda; isso não ensina nada novo.

## 2. Filtre cada candidata

Uma lição só passa se cumprir todos os pontos:

- É genérica: sem nome de cliente, pessoa, valor, dado sigiloso ou caminho do projeto. A skill é compartilhada.
- Muda o comportamento do agente; se ele já faria isso por padrão, descarte.
- Não repete regra existente: busque nos arquivos da skill e nas lições antes. Se repete uma lição, ela vira confirmação (passo 4), não lição nova.
- Diz o que fazer, em forma positiva, numa frase.
- Se contradiz uma regra da skill, mostre as duas ao usuário e pergunte qual vale; registre a escolha.

## 3. Proponha e espere

Mostre no chat de uma a três lições, cada uma com o texto exato, o destino (lição nova, confirmação ou mudança de regra com o trecho antes/depois) e o motivo em uma frase. Peça aprovação por lição. Se o usuário quiser revisar depois, salve a proposta em `sabatina/aprendizado-proposto.md` no projeto.

## 4. Grave com remendo pontual

- Edite só o trecho necessário; nunca reescreva um arquivo inteiro da skill.
- **Lição nova:** acrescente no fim de [lições](../aprendizados/licoes.md), com o próximo número, no formato de lá.
- **Confirmação:** some 1 ao contador “confirmada N×” da lição existente e atualize a data.
- **Promoção:** com 3 confirmações, ou quando o usuário pedir, proponha transformar a lição em regra no arquivo certo. Aprovada, edite a regra, marque a lição como “promovida para <arquivo>” e mova-a para o [registro](../aprendizados/registro.md).
- Atualize `generated.at` no topo de `licoes.md` e acrescente uma linha no [registro](../aprendizados/registro.md): data, agente, ação e IDs.

Se o agente não tiver permissão para escrever nesta pasta, salve o texto aprovado em `sabatina/aprendizado-proposto.md` no projeto e diga ao usuário para pedir, num agente com permissão: “aplica o aprendizado proposto em <caminho>”.

## 5. Pode

Mantenha no máximo 30 lições ativas. Ao passar disso, proponha juntar lições parecidas, promover as maduras ou retirar as que não se confirmaram. Lição sobre ferramenta ou site leva “revisar em” (três meses); vencida a data, confira se ainda vale antes de aplicar e proponha atualizar ou retirar. Retirada e fusão também exigem aprovação e vão para o registro.

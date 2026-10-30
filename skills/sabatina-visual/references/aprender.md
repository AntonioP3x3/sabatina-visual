# Aprender com a sessão

Leia quando o usuário pedir “registra o que aprendemos”, “aprende com essa conversa” ou algo equivalente. Proponha de uma a três memórias; grave somente as aprovadas. Um pedido de registro autoriza preparar propostas, não aprova automaticamente cada uma. Preserve delegações explícitas já dadas. Silêncio não aprova.

Antes de gravar, resolva o endereço pela [memória persistente](memoria-persistente.md), leia o que já existe e faça backup. Nunca grave experiência pessoal na instalação da skill/plugin, nem mesmo quando essa pasta parecer editável.

## 1. Garimpe e classifique

Procure correções do usuário, alternativas que resolveram um beco sem saída, preferências recorrentes e regras do método que causaram atrito. Não registre o que já correu como previsto.

| O que apareceu | Destino |
| --- | --- |
| Nome, valor, marca, arquivo, fato ou decisão do caso/cliente | `sabatina/decisoes.md` no projeto. |
| Lição de método útil para a pessoa em outros trabalhos | `licoes.md` externo. |
| Preferência pessoal de comunicação, visual ou modo de decidir | `preferencias.md` externo, com escopo explícito. |
| Melhoria genérica candidata a distribuição | Proposta no projeto; só o mantenedor incorpora ao pacote após autorização para compartilhar. |

Uma lição deve mudar uma decisão concreta do agente, ser descrita de forma positiva e não repetir o método ou memória existente. Uma preferência não pode ser vendida como regra universal de design. Não leve dados de clientes, credenciais nem caminhos de projetos para a memória reutilizável.

## 2. Proponha com o texto exato

Mostre texto, destino, escopo e motivo de cada candidata. Se contradiz uma regra distribuída, memória anterior ou identidade do trabalho, exponha o conflito antes de pedir aprovação. Se a pessoa quiser revisar depois, salve a proposta em `sabatina/aprendizado-proposto.md`; ela continua pendente e não deve ser aplicada como memória confirmada.

## 3. Grave no endereço externo

Faça um backup, releia o arquivo para detectar mudanças de outra sessão e edite somente o trecho necessário. Use IDs pessoais `U-L001…` para lições e `U-P001…` para preferências, incrementando sem reutilizar IDs retirados. Preserve os arquivos, IDs e contadores legados; ao confirmar uma lição legada, acrescente um registro pessoal que cite sua origem qualificada, sem alterar o snapshot.

```markdown
### U-L001 · Título curto
- **Regra:** o comportamento aprovado.
- **Quando vale:** situação e limites; quando não aplicar.
- **Origem:** AAAA-MM-DD · agente · tipo de caso, sem dados do cliente.
- **Aprovação:** AAAA-MM-DD · texto aprovado ou delegação explícita.
- **Status:** ativa · confirmada 1× (AAAA-MM-DD).
- **Revisar em:** AAAA-MM-DD, somente quando depender de ferramenta/site.
```

Preferências usam o mesmo formato com ID `U-P…`. Confirmações somam ao contador e atualizam a data somente com evidência real; não conte releituras como novas confirmações. Acrescente no `registro.md` externo data, agente, ação, ID e aprovação. Depois releia o trecho salvo, confirme o resultado e entregue o caminho absoluto clicável do arquivo. Se a escrita falhar, não diga “aprendi”: preserve a proposta no projeto, informe a falha e mantenha os arquivos anteriores.

## 4. Consolidar sem perder o aprendizado

Mantenha até 30 lições e 30 preferências ativas, propondo fusões ou retirada quando necessário. Com três confirmações, ou a pedido, proponha uma regra pessoal mais curta e estável no próprio arquivo externo. Consolidar não significa editar o pacote instalado. Marque o registro substituído como consolidado/retirado e preserve texto e histórico, em vez de apagá-lo.

Memórias de ferramentas/sites levam revisão em três meses; vencida a data, confira se ainda valem antes de aplicar. Retirada, fusão, ampliação de escopo e mudança de regra também passam pela aprovação do usuário.

## 5. Compartilhar uma melhoria do método

Memórias de quem usa a skill não são enviadas ao autor. Quando o usuário pedir para contribuir, prepare uma versão genérica e sem preferências identificáveis, compare com o método atual e mostre o diff. Abrir issue/PR ou publicar exige autorização correspondente. A aprovação de uma memória pessoal, por si só, não autoriza compartilhar. Quando uma melhoria pública já cobrir uma lição pessoal, proponha marcar a duplicata como incorporada, preservando sua história.

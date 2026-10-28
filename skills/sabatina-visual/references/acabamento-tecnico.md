# Acabamento técnico

Leia ao montar os critérios do brief e na execução. Estas regras orientam o executor; ao levar um termo à conversa, explique-o com imagem, conforme o passo 2 da skill. Tokens e componentes do projeto prevalecem; os valores abaixo são o padrão quando o projeto não define outro. Adaptado de Emil Kowalski (animations.dev), *make-interfaces-feel-better* e Web Interface Guidelines da Vercel, consultados em 23/10/2026.

## Movimento

| Situação | Regra |
| --- | --- |
| Entrada e resposta a uma ação | `ease-out` forte: `cubic-bezier(0.23, 1, 0.32, 1)`. Responde na hora e desacelera no fim. |
| Elemento que se desloca dentro da tela | `ease-in-out`: `cubic-bezier(0.77, 0, 0.175, 1)`. |
| Gaveta lateral ou inferior | `cubic-bezier(0.32, 0.72, 0, 1)`. |
| Curva `ease-in` | Fora da interface: começa lenta e faz a tela parecer travada. |
| Surgimento | Comece de `scale(0.95)` com `opacity: 0`; nada surge de `scale(0)`. |
| Botão pressionado | `:active { transform: scale(0.97) }`, faixa aceitável 0.95–0.98, transição de ~160 ms `ease-out`. |
| Popover, menu, tooltip | `transform-origin` no gatilho (ex.: `var(--transform-origin)`); modal fica centralizado. |
| Atalho de teclado e ação repetida o dia todo | Sem animação. |
| Propriedades | Liste as animadas (`transition: transform 200ms ease-out`), nunca `transition: all`; prefira `transform` e `opacity`. |
| Interrupção | Em estados que mudam com interação, prefira transições CSS, que podem ser interrompidas, a keyframes. Use `@starting-style` na entrada quando o navegador suportar. |
| Movimento reduzido | Respeite `prefers-reduced-motion`: estado e ação continuam compreensíveis sem animação. |
| Encaixe na rolagem (scroll snap) | Teste com um tique de roda (~100 px), um gesto curto de trackpad e teclado; `mandatory` com seções altas pode devolver roladas curtas. |
| Entrada da primeira tela | O texto aparece no primeiro quadro, sem esperar animação. |

Durações: clique 100–160 ms; tooltip e popover pequeno 125–200 ms; dropdown/select 150–250 ms; modal e gaveta 200–500 ms. Animação comum de interface fica abaixo de 300 ms. Entrada encadeada (stagger) só em momentos raros, como a primeira carga da abertura; nunca em hover de linha, digitação ou troca de aba.

## Superfícies e ótica

- **Raios concêntricos:** `raio externo = raio interno + padding`, nas mesmas unidades, quando superfícies aninhadas acompanham a mesma curva. A fórmula não justifica camada desnecessária.
- **Alinhamento óptico:** ícone e texto devem parecer centrados aos olhos; compense o centro visual (ex.: triângulo de “play” levemente à direita). Confira em tamanho real e ampliado.
- **Sombra e borda:** sombra em camadas transparentes comunica elevação; borda delimita estrutura, seleção e foco.
- **Contorno de imagem:** 1px `oklch(0 0 0 / 0.1)` no tema claro e `oklch(1 0 0 / 0.1)` no escuro, preto ou branco puro, nunca neutro tingido.
- **Área de clique:** 44×44px em toque/celular; mínimo de 40×40px em desktop denso. Amplie com pseudo-elemento quando o visível for menor; áreas vizinhas não se sobrepõem.
- **Ícones:** traço de 1.5px ao lado de texto regular (400) e 2px ao lado de semibold (600); um conjunto e um peso por superfície; cor por `currentColor`.

## Tipografia e números

- `text-wrap: balance` em títulos; `text-wrap: pretty` em parágrafos.
- `font-variant-numeric: tabular-nums` em números que atualizam ou se comparam em coluna; confira que nada pula durante a atualização.
- `-webkit-font-smoothing: antialiased` na raiz (efeito só no macOS).
- Teste textos longos, acentos e quebras nas larguras relevantes.

## Interface e acessibilidade

Checklist resumido das Web Interface Guidelines. Numa auditoria completa com acesso à web, busque a versão atual em `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md` e aplique-a; não afirme ter rodado uma auditoria que não rodou.

- HTML semântico: ação é `<button>`, navegação é `<a>`; títulos em ordem; rótulo em todo campo e `aria-label` em botão só com ícone.
- Foco visível no teclado (`:focus-visible`), nunca removido sem substituto; ordem de tabulação lógica.
- Contraste medido: texto comum ≥ 4.5:1; texto grande e componentes ≥ 3:1, inclusive texto secundário e estados.
- Estado comunicado além da cor: texto, ícone ou forma.
- Sem salto de layout: espaço reservado para imagem, mídia e carregamento; números estáveis.
- Hover nunca é o único acesso a uma ação ou informação.
- Formulários: tipo de campo correto, `autocomplete`, erro junto do campo e em texto, colar permitido.
- Zoom até 200% e tela estreita sem perder conteúdo nem criar rolagem horizontal.
- Estados vazio, erro, carregando e texto longo cobertos no escopo pedido.

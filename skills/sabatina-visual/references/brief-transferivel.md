# Brief/prompt transferível

Leia ao fechar a descoberta. Preencha com decisões e dados reais, ajustando a extensão ao trabalho. O resultado precisa funcionar em outra conversa/ferramenta sem “o que vimos acima”, anexos implícitos ou dependência desta skill instalada.

## Conteúdo necessário

1. **Entrega e autorização:** artefato, formato, objetivo, público, ação principal e escopo. Diga se o pedido inclui implementação e delimite publicação, contas e comunicação externa.
2. **Identidade comprovada:** nome, logo, fontes, paleta/tokens e arquivos de origem; separe extração de proposta. Use caminhos/URLs acessíveis ou enumere os anexos a transferir.
3. **Direção confirmada:** estrutura/conteúdo, hierarquia e os três controles — personalidade/estrutura, densidade e movimento — com palavras compreensíveis, evidências e motivo. Cite respostas/delegações; recomendações permanecem propostas até decididas.
4. **Referências:** IDs, URLs específicas, capturas e estudos rotulados, com o detalhe apontado. Explique o aspecto a adaptar, o que excluir e os limites da consulta. Inclua a explicação curta dos termos que o destinatário precisar compreender. Anexe `sabatina/quadro-referencias.html` e `sabatina/decisoes.md` quando existirem.
5. **Recursos escolhidos:** classifique inspiração, código/bloco, design system e criação própria. Para código, registre origem, finalidade, stack/base, dependências, condições de uso, adaptação e pendências; registre quando nenhum externo foi escolhido.
6. **Conteúdo/comportamento:** textos aprovados ou pendentes, fluxo, dados, formulários e estados necessários. Distinga simulação de integração funcional. Inclua restrições de domínio que limitam texto, preço ou prova (ex.: regras de publicidade profissional). Não invente fatos para preencher lacunas.
7. **Contrato visual e técnica:** stack observada/aprovada, tokens e componentes existentes, regras de responsividade e acessibilidade. Use `DESIGN.md` existente como contrato; sem um, proponha-o pelo [modelo abaixo](#modelo-de-designmd). Sem migração implícita.
8. **Aceite e acabamento:** inclua os critérios aplicáveis abaixo por extenso, com telas/elementos alvo e evidência esperada.
9. **Pendências/próximo passo:** questões essenciais abertas impedem implementação final; hipóteses de acabamento ficam explícitas. Indique o próximo passo já autorizado.

## Aceite transferível de qualidade

Selecione pelo formato e escopo; para cada critério, diga como conferir e registre depois aprovado/falhou/não verificado.

- **Identidade e direção:** logo/paleta/tipografia correspondem às fontes e aos três controles confirmados; nenhuma preferência externa substitui a marca.
- **Trava anti-slop:** excluir gradiente roxo/azul-neon sem relação com a marca, fundo bege/cinza lavado sem contraste, card dentro de card sem função, pílula decorativa acima do título, trio automático de caixas/ícones e bolinhas piscantes sem estado real. A estrutura precisa responder ao conteúdo, com prioridade de leitura e sem coleta/repetição gratuita.
- **Acabamento óptico:** ícones/textos parecem alinhados; superfícies aninhadas pertinentes seguem `raio externo = raio interno + padding`; sombras indicam elevação e bordas preservam estrutura/foco/seleção; área de clique de 44×44px no toque e mínimo de 40×40px no desktop denso. Inspecionar em tamanho real e ampliado, usando tokens existentes.
- **Tipografia e números:** quebras e textos longos funcionam nas larguras relevantes; `text-wrap: balance` em títulos; `tabular-nums` estabiliza valores atualizados/comparados em coluna. Conferir uma atualização quando houver esse comportamento.
- **Movimento:** respostas têm finalidade, propriedades listadas e estado final correto; entradas com `ease-out` (`cubic-bezier(0.23, 1, 0.32, 1)`), surgimento a partir de `scale(0.95)` com opacidade 0, durações abaixo de 300 ms na interface comum e nenhuma animação em atalhos de teclado. Testar interrupção e `prefers-reduced-motion`, sem bloquear a ação ou depender só de animação.
- **Interface/acessibilidade:** verificar caminho principal, estados solicitados, teclado/foco visível, rótulos/semântica, contraste medido (4.5:1 texto comum; 3:1 texto grande e componentes), feedback além da cor, zoom e larguras relevantes. Em documentos/slides, adaptar a leitura, ordem, contraste e limites de página; não inventar testes de formulário onde não há formulário.

Use a [checagem de qualidade](qualidade-visual.md) e o [acabamento técnico](acabamento-tecnico.md) ao elaborar esses critérios; copie para o brief final o necessário ao executor.

## Integrações opcionais no handoff

Nomeie somente as que couberem no trabalho e estejam disponíveis no destino; os critérios acima continuam autocontidos sem elas: `shadcn` para componentes/variantes e tokens existentes, respeitando base e configuração verificadas; `kami` para composição editorial de documentos/relatórios/slides compatíveis, preservando idioma e identidade aprovados, sem importar tema por padrão.

Um início copiável para o prompt: “Produza a entrega abaixo, preservando identidade e decisões confirmadas. Use as referências pelos aspectos indicados e os recursos pelas condições verificadas. Aplique os critérios de aceite listados. Trate pendências como pendências; execute somente o escopo autorizado.”

## Modelo de DESIGN.md

Quando o projeto não tiver contrato visual, proponha um `DESIGN.md` com estas cinco seções, preenchidas com valores extraídos ou decididos e a fonte de cada um:

1. **Atmosfera:** em duas ou três frases, a sensação geral e para quem a página é feita.
2. **Paleta semântica:** cada cor com nome descritivo, hex e função (fundo, texto, ação principal, borda, erro…).
3. **Tipografia:** famílias, pesos, tamanhos e papel de cada nível (título, apoio, corpo, legenda).
4. **Estilo de componentes:** botões, cards, campos e navegação — forma, raio, sombra/borda e estados.
5. **Princípios de layout:** grade, espaçamento, densidade, largura de leitura e comportamento no celular.

## Registro de decisões

| Decisão/controle | Resposta ou delegação | Motivo + segundo ângulo | Evidência | Status | Consequência |
| --- | --- | --- | --- | --- | --- |

Linhas em ordem cronológica, nova no fim. Identifique quem propôs/decidiu. Confirmação exige resposta, escolha anterior documentada ou delegação explícita; silêncio e opção preselecionada não bastam.

## Exemplo contextual, não requisito universal

Em eventual página ITBI da WP, relatórios HTML ARHNE/ARN e modelos Tributário/Ambiental podem fornecer identidade **se presentes e indicados como fontes pelo usuário**. Verifique grafia e versão nos arquivos.

Matrícula, CNPJ e IPTU como entrada simplificada são hipóteses a validar, não campos universais. Não invente promessa de benefício, elegibilidade, economia ou cálculo. O exemplo não limita a skill a ITBI/Direito/landing pages e não autoriza iniciar o projeto.

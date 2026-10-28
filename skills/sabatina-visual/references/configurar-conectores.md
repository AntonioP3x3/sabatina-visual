# Configurar conectores

Leia somente quando o usuário escolher **configurar agora** na etapa 1. Instalar, conectar conta, autenticar ou editar configuração exige autorização explícita para aquela ação. Se algo falhar, siga sem o conector e registre o limite; a sabatina continua.

Configure um conector por vez, na ordem que o usuário escolher, e no fim repita o teste barato da etapa 1 para atualizar a lista ✅/⚠️/❌.

## O que cada um acrescenta

| Ferramenta | Com conector | Sem conector |
| --- | --- | --- |
| 21st.dev | Busca de componentes e inspiração direto na conversa. | Site https://21st.dev/ pelo navegador. |
| Landingfolio | Confirme na documentação atual se existe conector oficial antes de oferecê-lo; o uso comum é pelo site. | Site https://www.landingfolio.com/ pelo navegador. |
| OpenDesign Cloud | Projetos, arquivos, specs de identidade e geração, conforme o plano da conta. | Site e fluxo documentados; nunca um catálogo ou URL inventado. |

## Passo a passo

1. Diga em uma frase o que falta e o que isso muda nesta sabatina.
2. Abra a documentação oficial atual da ferramenta e siga as instruções dela; não invente comando, pacote ou endereço de servidor.
3. Use o mecanismo do agente em uso e confira o formato atual na documentação dele antes de editar:
   - Claude Code: `claude mcp add` no terminal, ou `/mcp` numa sessão interativa; no app desktop, a área de conectores.
   - Codex: bloco `[mcp_servers.<nome>]` em `~/.codex/config.toml`.
   - Antigravity/Gemini: o gerenciador de servidores MCP da própria ferramenta.
4. Chaves e tokens: a pessoa digita no fluxo da própria ferramenta, num cofre de segredos ou numa variável de ambiente. Não peça a chave no chat, não a repita e não a grave em arquivo de configuração versionado nem nesta pasta.
5. Login por navegador (OAuth): a pessoa conclui sozinha; o agente não preenche credenciais.
6. Recarregue a sessão se o agente exigir e confirme que a ferramenta aparece. Se não aparecer, siga sem ela.

Configurar não autoriza assinatura, geração paga nem criação de projeto.

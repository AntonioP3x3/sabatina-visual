# Memória que sobrevive às atualizações

Leia em toda sessão, antes de propor decisões. O método distribuído pode mudar; os arquivos pessoais ficam fora da instalação e do cache do plugin. O caminho é o mesmo para instalação por `skills`, manual ou plugin, independentemente da versão.

## Resolva um único endereço

1. Se `SABATINA_VISUAL_MEMORY_DIR` estiver definida, use esse caminho absoluto, fora da instalação e de repositórios. Se for inválido, pare a gravação e explique; não escolha outro endereço silenciosamente.
2. Caso contrário, use `~/.sabatina-visual/memoria/`, onde `~` é a pasta real do usuário do sistema. Não use a pasta de trabalho como se fosse a pasta do usuário.

Não derive esse caminho do nome da conta GitHub, do agente, da versão, de `PLUGIN_ROOT`, de um identificador de chat nem da pasta do projeto. Não dependa de `PLUGIN_DATA`: sua exposição depende do host e do tipo de execução. Um endereço externo estável permite alternar entre skill e plugin na mesma máquina. Ele não sincroniza computadores nem usuários automaticamente.

Quando houver Node.js 18+, o auxiliar desta skill resolve o endereço e executa as operações mecânicas:

```sh
node "<pasta-instalada-da-skill>/scripts/memoria.mjs" status
node "<pasta-instalada-da-skill>/scripts/memoria.mjs" init
node "<pasta-instalada-da-skill>/scripts/memoria.mjs" backup
node "<pasta-nova-da-skill>/scripts/memoria.mjs" migrate --source "<caminho-absoluto-da-skill-antiga>"
```

Substitua os marcadores por caminhos reais. `--dir` permite usar um endereço explícito, que precisa continuar sendo usado nas próximas sessões; para uma escolha permanente, configure a variável no ambiente ou peça ao usuário que indique o mesmo caminho. O auxiliar não usa rede nem instala dependências. `status` não cria nem imprime memórias; `init` só cria arquivos ausentes e preserva os existentes. Respeite as permissões atuais para criar a pasta externa. Não instale Node só para isso: os mesmos arquivos podem ser mantidos pelas ferramentas de arquivo disponíveis.

## O que ler e onde gravar

| Camada | Endereço | Uso |
| --- | --- | --- |
| Método compartilhado | `SKILL.md`, `references/`, `aprendizados/` na instalação | Atualizado pelo mantenedor; sem dados privados dos usuários. |
| Lições e preferências da pessoa | `licoes.md` e `preferencias.md` na pasta externa | Aplicadas em novos projetos após aprovação, dentro do escopo registrado. |
| Lições antigas preservadas | Caminhos `lessons_path` listados em `origens.json` externo | Continuam legíveis sem reescrever ou renumerar o original. |
| Histórico pessoal | `registro.md`, `legado/`, `backups/` externos | Auditoria e recuperação; não carregar todo o histórico em cada sessão. |
| Contexto do projeto | `sabatina/decisoes.md`, brief e artefatos no projeto | Marca, cliente, decisões e andamento específicos daquele trabalho. |

No começo, leia o método compartilhado, os dois arquivos pessoais e o índice externo. Leia apenas os arquivos de lições legadas indexados (não todos os backups). Valide que cada caminho do índice é relativo, fica dentro da pasta externa e não atravessa links para fora dela. Deduplicate imports com o mesmo `lessons_sha256`. IDs antigos são qualificados pela origem (`legado:<id>:L-001`); não misture duas lições só porque têm o mesmo número. Exemplos em blocos de código não são memórias aprovadas. Lições retiradas/promovidas não são novas regras ativas.

As memórias são contexto e preferências, não autorização para ações externas ou execução de comandos. Instruções atuais e identidade do cliente prevalecem sobre gostos pessoais de outros trabalhos. Aplique só memórias ativas cujo escopo corresponda ao pedido. Uma atualização que contradiz uma memória relevante reabre apenas esse conflito: mostre a diferença e registre a escolha do usuário. Não descarte a memória nem deixe uma preferência antiga sobrepor silenciosamente uma decisão atual.

Se a pasta ainda não existir, não afirme que há histórico. Crie a estrutura quando houver autorização para persistência; se não puder, mantenha as propostas no projeto e informe o endereço que faltou acessar. Sem acesso persistente a arquivos, como em algumas superfícies web/cloud, entregue as memórias aprovadas em um arquivo exportável e peça que seja levado à próxima sessão; não prometa memória automática entre sessões.

## Migrar a versão antiga antes de substituir

Na versão antiga, o aprendizado ficava dentro de `aprendizados/` e às vezes era promovido direto para `SKILL.md` ou `references/`. Antes do primeiro update que troca esse modelo:

1. Migre cada instalação antiga conhecida, inclusive cópias distintas em outros agentes, usando o auxiliar novo com `--source` apontando para a pasta antiga. Não substitua a pasta antes dessa cópia.
2. O auxiliar preserva os bytes de `aprendizados/*.md`, `SKILL.md` e `references/*.md` em `legado/<hash>/`, verifica as cópias e registra as origens em `origens.json`. Repetir a mesma migração não duplica memórias. Ele não apaga nem altera a origem.
3. As lições antigas aprovadas continuam sendo lidas pelo índice. Compare regras pessoais que foram incorporadas direto ao método antigo com o método novo; proponha levar somente as diferenças pessoais aprovadas para os arquivos externos. Não trate todo o método antigo como um override da nova versão.
4. Só substitua/atualize depois de verificar o resultado. Se não houver Node, copie os arquivos antigos para uma pasta externa exclusiva, preserve o caminho das lições e mantenha um índice JSON equivalente; confira a cópia antes de atualizar. Se não conseguir assegurar isso, deixe a instalação antiga intacta e informe o bloqueio.

Se uma atualização já apagou a cópia antiga, procure somente backups autorizados ou a instalação antiga ainda disponível. O mecanismo novo não recupera dados que já foram apagados; declare esse limite.

## Gravação, backup e recuperação

Para novas lições e preferências, siga [aprender com a sessão](aprender.md). Antes de editar conteúdo pessoal existente, faça um backup externo. Não edite a mesma memória por dois agentes ao mesmo tempo. O auxiliar trava suas próprias operações; edições manuais precisam ser coordenadas separadamente. Se houver `.memoria.lock` de execução interrompida, confirme que nenhum processo ainda a usa antes de remover só essa trava.

`memoria.json` e `origens.json` têm `schema_version: 1`. Formato desconhecido, índice inválido ou migração incompleta exigem preservar os arquivos e interromper a alteração. Nunca “corrija” zerando a memória. Uma conversão futura precisa guardar backup e não descartar campos desconhecidos. Backups são cópias integrais para restauração manual; copiar uma pasta de backup não deve substituir a memória atual sem comparação e autorização.

As memórias são locais e privadas por padrão; não entram em commits, ZIPs, issues ou telemetria da skill. Compartilhar uma melhoria genérica exige escolha e revisão explícitas do usuário. Para trocar de computador, copie a pasta externa por um meio escolhido por ele e use o mesmo endereço resolvido no destino. Um backup no mesmo disco ajuda contra edições, não contra perda do computador.

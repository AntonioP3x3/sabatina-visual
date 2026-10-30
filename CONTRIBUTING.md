# Como contribuir

Encontrou uma pergunta confusa, uma referência quebrada ou uma ferramenta que mudou? Abra uma [issue](https://github.com/AntonioP3x3/sabatina-visual/issues) com o pedido que estava fazendo, o comportamento observado e o que teria ajudado. Remova dados de clientes, credenciais e arquivos privados.

Para propor uma alteração, faça um fork e envie um pull request. Prefira mudanças pontuais apoiadas em um exemplo real. Preserve o português simples, uma decisão por vez, a distinção entre referência real e estudo próprio e os limites de autorização do usuário.

As instruções ficam em `skills/sabatina-visual/SKILL.md`; os detalhes, em `references/`. Mantenha os links relativos funcionando e o pacote independente de arquivos do seu computador. Comandos e prompts de instalação ficam no README e em `docs/`.

Antes de enviar, confira se o instalador encontra a skill:

```sh
npx skills@latest add . --list
```

Confira também se todos os arquivos referenciados estão presentes. Se mudar o comportamento, experimente um pedido real em uma pasta de teste e relate o que verificou. Sugestões de lições seguem o processo de `references/aprender.md`; uma proposta ainda não é uma lição aprovada.

Ao alterar persistência, rode `node --test tests/memoria.test.mjs` com Node.js 22+ e confira a preservação de lições existentes, migração idempotente e troca de versão/plugin. Os testes criam pastas temporárias próprias. O auxiliar de memória usa apenas APIs de Node.js 18+.

Nunca inclua sua pasta pessoal de memória no PR ou em um ZIP de distribuição. Uma lição privada precisa de autorização para compartilhar e de uma versão genérica revisada antes de entrar no método público. Mudanças futuras no formato de memória precisam de migração com backup e preservação de campos desconhecidos, não de reinicialização vazia.

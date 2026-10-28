# Como contribuir

Encontrou uma pergunta confusa, uma referência quebrada ou uma ferramenta que mudou? Abra uma [issue](https://github.com/AntonioP3x3/sabatina-visual/issues) com o pedido que estava fazendo, o comportamento observado e o que teria ajudado. Remova dados de clientes, credenciais e arquivos privados.

Para propor uma alteração, faça um fork e envie um pull request. Prefira mudanças pontuais apoiadas em um exemplo real. Preserve o português simples, uma decisão por vez, a distinção entre referência real e estudo próprio e os limites de autorização do usuário.

As instruções ficam em `skills/sabatina-visual/SKILL.md`; os detalhes, em `references/`. Mantenha os links relativos funcionando e o pacote independente de arquivos do seu computador. Comandos e prompts de instalação ficam no README e em `docs/`.

Antes de enviar, confira se o instalador encontra a skill:

```sh
npx skills@latest add . --list
```

Confira também se todos os arquivos referenciados estão presentes. Se mudar o comportamento, experimente um pedido real em uma pasta de teste e relate o que verificou. Sugestões de lições seguem o processo de `references/aprender.md`; uma proposta ainda não é uma lição aprovada.

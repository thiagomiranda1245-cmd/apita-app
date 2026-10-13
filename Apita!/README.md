# Apita! como app instalável (PWA)

Esta pasta é o Apita! pronto para **ser hospedado**. Hospedado num endereço próprio (https), ele:
- pode ser **instalado na tela inicial** (Android/Chrome: botão "Instalar o Apita!" em Configurações; iPhone: Compartilhar → "Adicionar à Tela de Início");
- **abre sem internet** depois da primeira visita;
- continua guardando os dados no próprio aparelho.

> O link de pré-visualização do Claude **não** permite instalar nem usar offline. Para isso é preciso hospedar estes arquivos.

## Hospedar de graça (escolha uma opção)

**GitHub Pages**
1. Crie um repositório no GitHub e envie **todos** os arquivos desta pasta (inclusive `.nojekyll`).
2. Em *Settings → Pages*, escolha a branch `main` e a pasta `/ (root)`.
3. Abra `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

**Netlify (arrastar e soltar)**: acesse app.netlify.com/drop e solte esta pasta.

## Atualizar o app
Gere esta pasta de novo a partir do `Apita!.html` mais novo (ou peça ao Claude) e envie os arquivos outra vez. O `sw.js` muda de versão sozinho e os aparelhos recebem a atualização quando abrirem com internet.

## Arquivos
- `index.html` — o app (o mesmo do `Apita!.html` + etiquetas de PWA)
- `manifest.webmanifest` — nome, cores e ícones do app instalado
- `sw.js` — guarda o app para uso offline
- `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` — ícones

## Importante
Os dados ficam no navegador/app **deste aparelho**. Faça backup em Configurações → Exportar backup.

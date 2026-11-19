# Anel da Web Lusófona

[Português](#como-aderir) · [English](#how-to-join)

## Como aderir

Mostra a faixa, acrescenta o teu site à lista e abre um pull request. O site
pode estar em qualquer idioma.

### 1. Mostra a faixa

Escreve o endereço do teu site na
[página de adesão](https://offeringofpie.github.io/anel-da-web-lusofona/aderir/#banner), copia o
código e cola-o no teu site.

Se o teu site tem fundo escuro, acrescenta `data-theme="dark"` ao `<nav>`.

### 2. Acrescenta o teu site

Faz fork deste repositório e acrescenta isto ao fim de
`src/data/members.json`. Só `name` e `url` são obrigatórios.

```json
{
  "name": "O teu site",
  "url": "https://www.exemplo.com",
  "feed": "https://www.exemplo.com/feed.xml",
  "description": "Descrição do teu site.",
  "languages": ["pt", "en"],
  "banner": "https://www.exemplo.com/88x31.png"
}
```

### 3. Abre um pull request

Antes de o abrires, confirma que:

- O teu site está acessível por https.
- A faixa está visível no teu site.
- O site segue as [regras](https://offeringofpie.github.io/anel-da-web-lusofona/regras/).

Quando estiver tudo pronto,
[abre o pull request no GitHub](https://github.com/offeringofpie/anel-da-web-lusofona/compare).
Quem gere o webring revê-o e faz o merge.

## How to join

Show the banner, add your site to the list and open a pull request. Your site
can be in any language.

### 1. Show the banner

Type your site's address on the
[join page](https://offeringofpie.github.io/anel-da-web-lusofona/en/join/#banner), copy the code
and paste it into your site.

If your site has a dark background, add `data-theme="dark"` to the `<nav>`.

### 2. Add your site

Fork this repository and add this to the end of `src/data/members.json`. Only
`name` and `url` are required.

```json
{
  "name": "Your Site",
  "url": "https://www.example.com",
  "feed": "https://www.example.com/feed.xml",
  "description": "Description of your site.",
  "languages": ["pt", "en"],
  "banner": "https://www.example.com/88x31.png"
}
```

### 3. Open a pull request

Before you open it, check that:

- Your site is reachable over https.
- The banner is visible on your site.
- Your site follows the [rules](https://offeringofpie.github.io/anel-da-web-lusofona/en/rules/).

When everything is ready,
[open the pull request on GitHub](https://github.com/offeringofpie/anel-da-web-lusofona/compare).
A maintainer reviews it and merges.

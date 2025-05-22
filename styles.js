import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  /* ===============================
  basics.css
  - grundlegende Einstellungen
  - grundlegende Textgestaltung
  - Elementselektoren
  =============================== */

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui;
    padding: 0;
    background-image: url('/img/jay-mantri-TFyi0QOx08c-unsplash.jpg');
    background-size: auto;
    background-repeat: no-repeat;
    background-position: center;
    min-height: 100vh;
  }

  @media screen {
    /* Grundlegende Einstellung */
    html {
      box-sizing: border-box;
    }
    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }

    :root {
      --color-background: linear-gradient(to bottom, #E7E5D0 0%, #375652 50%, #182F37 100%);
      --color-card-background: rgba(14, 38, 45, 0.79);
      --color-footer: rgba(0, 0, 0, 0.89);
      --color-text-light: #FFFFFF;
      --color-button: linear-gradient(to bottom, rgba(56,57,62,1) 0%, rgba(24,25,29,1) 100%);
      --color-active-green: linear-gradient(to bottom, rgba(39,215,28,1) 0%, rgba(171,229,5,1) 100%);
      --color-off-gray: linear-gradient(to bottom, rgba(132,129,132,1) 0%, rgba(218,218,218,1) 100%);
    }

    /* Vermeidung von collapsing margins */
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    ul,
    ol,
    blockquote {
      margin-top: 0px;
      margin-bottom: 5px;
    }

    .visually-hidden {
      visibility: hidden;
      display: none;
    }

    /* Grundlegende Textgestaltung / Elementselektoren */
    body {
      margin: 0;
      font-family: 'source Sans Pro', Arial, sans-serif;
      font-size: 1rem;
      letter-spacing: 1px;
    }

    h1 {
      font-size: 2.5rem;
    }
    h2 {
      font-size: 2rem;
    }
    h3 {
      font-size: 1.75rem;
    }
    h4 {
      font-size: 1.5rem;
    }
  }
`;

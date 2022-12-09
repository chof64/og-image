import { ParsedRequest } from "./types";
import { readFileSync } from "fs";

const rglr = readFileSync(`${__dirname}/../fonts/Inter-Regular.woff2`).toString(
  "base64"
);
const bold = readFileSync(`${__dirname}/../fonts/Inter-Bold.woff2`).toString(
  "base64"
);

function getCss(theme: string) {
  let background = "#ffffff";
  let foreground = "#000000";

  if (theme === "dark") {
    background = "#000000";
    foreground = "#ffffff";
  }

  return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    body {
        background: ${background};
        color: ${foreground};
        background-size: 100px 100px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 5rem;
    }
    
    h1 {
        font-family: 'Inter';
        font-weight: bold;
        font-size: 8rem;
        line-height: 0.5;
    }

    h2 {
        font-family: 'Inter';
        font-weight: bold;
        font-size: 3.5rem;
        line-height: 0.5;
        opacity: 0.5;
    }

    .top-row {
        margin-top: auto;
    }
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { header, subheader, theme } = parsedReq;
  return `<!DOCTYPE html>
    <html>
        <meta charset="utf-8">
        <title>Generated Image</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            ${getCss(theme)}
        </style>
        <body>
            <div class="row">
                <h1>
                    ${header}
                </h1>
                <h2>
                ${subheader ?? ""}
                </h2>
            </div>
        </body>
    </html>`;
}

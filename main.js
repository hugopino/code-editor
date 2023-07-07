import "./style.css";
import Split from "split-grid";

import * as monaco from "monaco-editor";
import HtmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import CssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import JsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

window.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "html") return new HtmlWorker();
    if (label === "javascript") return new JsWorker();
    if (label === "css") return new CssWorker();
  },
};

const COMMON_EDITOR_OPTIONS = {
  automaticLayout: true,
  fontSize: 18,
  minimap: {
    enabled: false,
  },
  theme: "vs-dark",
};

const $ = (selector) => document.querySelector(selector);

const $js = $("#js");
const $css = $("#css");
const $html = $("#html");

const html = "";
const css = "";
const js = "";

const htmlEditor = monaco.editor.create($html, {
  value: html,
  language: "html",
  ...COMMON_EDITOR_OPTIONS,
});

const cssEditor = monaco.editor.create($css, {
  value: css,
  language: "css",
  ...COMMON_EDITOR_OPTIONS,
});

const jsEditor = monaco.editor.create($js, {
  value: js,
  language: "javascript",
  ...COMMON_EDITOR_OPTIONS,
});

htmlEditor.onDidChangeModelContent(update);
cssEditor.onDidChangeModelContent(update);
jsEditor.onDidChangeModelContent(update);

const htmlForPreview = createHtml({ html, js, css });
$("iframe").setAttribute("srcdoc", htmlForPreview);

function update() {
  const html = htmlEditor.getValue();
  const css = cssEditor.getValue();
  const js = jsEditor.getValue();

  const htmlForPreview = createHtml({ html, js, css });
  $("iframe").setAttribute("srcdoc", htmlForPreview);
}

function createHtml({ html, js, css }) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <style>
            ${css}
        </style>
    </head>
    <body>
        ${html}
    </body>
    <script>
        ${js} 
    </script>  
  `;
}

Split({
  columnGutters: [
    {
      track: 1,
      element: document.querySelector(".vertical-gutter"),
    },
  ],
  rowGutters: [
    {
      track: 1,
      element: document.querySelector(".horizontal-gutter"),
    },
  ],
});

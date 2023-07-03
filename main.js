import "./style.css";
import Split from "split-grid";

const $ = (selector) => document.querySelector(selector);

const $js = $("#js");
const $css = $("#css");
const $html = $("#html");

$js.addEventListener("input", update);

$css.addEventListener("input", update);

$html.addEventListener("input", update);

function update() {
  const html = createHtml();
  $("iframe").setAttribute("srcdoc", html);
}

const createHtml = () => {
  const html = $html.value;
  const css = $css.value;
  const js = $js.value;
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
};
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

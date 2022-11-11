import { HTMLTableRenderer } from "./tables/htmlTable";
import { MultiMarkdownTableParser } from "./tables/multiMarkdownTable";

const parser = new MultiMarkdownTableParser();
const renderer = new HTMLTableRenderer();

function updateHTMLTable() {
    let textAreaInput = (<HTMLInputElement>document.querySelector("#markdown-input"));
    let divResult = document.querySelector("#html-result");
    let table = parser.parse(textAreaInput.value);
    divResult.innerHTML = renderer.render(table);
}

window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector("#markdown-input").addEventListener("change", updateHTMLTable);
    updateHTMLTable();
});
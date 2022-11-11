import { HTMLTableRenderer } from "./tables/htmlTable";
import { MultiMarkdownTableParser, MultiMarkdownTableRenderer } from "./tables/multiMarkdownTable";

const mdParser = new MultiMarkdownTableParser();
const mdRenderer = new MultiMarkdownTableRenderer();
const htmlRenderer = new HTMLTableRenderer();

function updateHTMLTable() {
    let textAreaInput = (<HTMLInputElement>document.querySelector("#markdown-input"));
    let divResult = document.querySelector("#html-result");
    let table = mdParser.parse(textAreaInput.value);
    divResult.innerHTML = htmlRenderer.render(table);
}

function formatMarkdown() {
    let textAreaInput = (<HTMLInputElement>document.querySelector("#markdown-input"));
    let table = mdParser.parse(textAreaInput.value);
    textAreaInput.value = mdRenderer.render(table);
}

function test() {
    let textAreaInput = (<HTMLInputElement>document.querySelector("#markdown-input"));
    let table = mdParser.parse(textAreaInput.value);
    table.removeColumn(table.getColumn(0));
    table.sanitize();
    textAreaInput.value = mdRenderer.render(table);
}

window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector("#markdown-input").addEventListener("change", updateHTMLTable);
    document.querySelector("button#render-md").addEventListener("click", updateHTMLTable);
    document.querySelector("button#format-md").addEventListener("click", formatMarkdown);
    document.querySelector("button#test").addEventListener("click", test);
    updateHTMLTable();
});
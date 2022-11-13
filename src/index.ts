import { HTMLTableRenderer } from "./tables/htmlTable";
import { MultiMarkdownTableParser, PrettyMultiMarkdownTableRenderer, MinifiedMultiMarkdownTableRenderer } from "./tables/multiMarkdownTable";

const mdParser = new MultiMarkdownTableParser();
const mdPrettyRenderer = new PrettyMultiMarkdownTableRenderer();
const mdMinifyRenderer = new MinifiedMultiMarkdownTableRenderer();
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
    textAreaInput.value = mdPrettyRenderer.render(table);
}

function minifyMarkdown() {
    let textAreaInput = (<HTMLInputElement>document.querySelector("#markdown-input"));
    let table = mdParser.parse(textAreaInput.value);
    textAreaInput.value = mdMinifyRenderer.render(table);
}

function test() {
    let textAreaInput = (<HTMLInputElement>document.querySelector("#markdown-input"));
    let divResult = document.querySelector("#html-result");

    let table = mdParser.parse(textAreaInput.value);
    table.removeRow(table.getNormalRows()[0]);
    table.sanitize();

    textAreaInput.value = mdPrettyRenderer.render(table);
    divResult.innerHTML = htmlRenderer.render(table);
}

window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector("#markdown-input").addEventListener("change", updateHTMLTable);
    document.querySelector("button#render-md").addEventListener("click", updateHTMLTable);
    document.querySelector("button#format-md").addEventListener("click", formatMarkdown);
    document.querySelector("button#minify-md").addEventListener("click", minifyMarkdown);
    document.querySelector("button#test").addEventListener("click", test);
    updateHTMLTable();
});
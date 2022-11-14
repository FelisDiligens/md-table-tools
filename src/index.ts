import { CSVTableParser, CSVTableRenderer } from "./tables/csvTable";
import { HTMLTableRenderer } from "./tables/htmlTable";
import { MultiMarkdownTableParser, PrettyMultiMarkdownTableRenderer, MinifiedMultiMarkdownTableRenderer } from "./tables/multiMarkdownTable";
import { TableParser } from "./tables/tableParser";
import { TableRenderer } from "./tables/tableRenderer";

const mdParser = new MultiMarkdownTableParser();
const csvParser = new CSVTableParser();

function getParser(key: string): TableParser {
    switch (key) {
        case "mmd":
        case "md":
            return mdParser;
        case "csv":
            return csvParser;
        default:
            throw new Error(`Unknown key in getParser: ${key}`);
    }
}

const mdPrettyRenderer = new PrettyMultiMarkdownTableRenderer();
const mdMinifyRenderer = new MinifiedMultiMarkdownTableRenderer();
const htmlRenderer = new HTMLTableRenderer();
const csvRenderer = new CSVTableRenderer();

function getRenderer(key: string): TableRenderer {
    switch (key) {
        case "mmd":
        case "md":
            return mdPrettyRenderer;
        case "mmd-mini":
        case "md-mini":
            return mdMinifyRenderer;
        case "csv":
            return csvRenderer;
        case "html":
        case "html-code":
            return htmlRenderer;
        default:
            throw new Error(`Unknown key in getRenderer: ${key}`);
    }
}

function usePreTags(key: string): boolean {
    switch (key) {
        case "mmd":
        case "md":
        case "mmd-mini":
        case "md-mini":
            return true;
        case "csv":
            return true;
        case "html":
            return false;
        case "html-code":
            return true;
        default:
            return false;
    }
}

function escape(htmlStr: string): string {
    return htmlStr
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function getInputFormat(): string {
    var inputFormat = document.getElementById('input-format') as HTMLSelectElement;
    return inputFormat.options[inputFormat.selectedIndex].value;
}

function getOutputFormat(): string {
    var outputFormat = document.getElementById('output-format') as HTMLSelectElement;
    return outputFormat.options[outputFormat.selectedIndex].value;
}

function render() {
    let textAreaInput = (<HTMLInputElement>document.querySelector("textarea#input"));
    let divResult = document.querySelector("#rendered-result");
    
    let parser = getParser(getInputFormat());
    let renderer = getRenderer(getOutputFormat());

    let table = parser.parse(textAreaInput.value);
    if (usePreTags(getOutputFormat()))
        divResult.innerHTML = `<pre>${escape(renderer.render(table))}</pre>`;
    else
        divResult.innerHTML = renderer.render(table);
}

function formatMarkdown() {
    let textAreaInput = (<HTMLInputElement>document.querySelector("textarea#input"));
    let table = mdParser.parse(textAreaInput.value);
    textAreaInput.value = mdPrettyRenderer.render(table);
}

function minifyMarkdown() {
    let textAreaInput = (<HTMLInputElement>document.querySelector("textarea#input"));
    let table = mdParser.parse(textAreaInput.value);
    textAreaInput.value = mdMinifyRenderer.render(table);
}

window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector("button#render").addEventListener("click", render);
    document.querySelector("textarea#input").addEventListener("change", render);
    document.querySelector("select#output-format").addEventListener("change", render);
    document.querySelector("button#format-md").addEventListener("click", formatMarkdown);
    document.querySelector("button#minify-md").addEventListener("click", minifyMarkdown);
    render();
});
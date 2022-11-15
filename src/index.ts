import { CSVTableParser, CSVTableRenderer } from "./tables/csvTable";
import { HTMLTableParser, HTMLTableParserMode, HTMLTableRenderer } from "./tables/htmlTable";
import { MultiMarkdownTableParser, PrettyMultiMarkdownTableRenderer, MinifiedMultiMarkdownTableRenderer } from "./tables/multiMarkdownTable";
import { TableParser } from "./tables/tableParser";
import { TableRenderer } from "./tables/tableRenderer";

const mdParser = new MultiMarkdownTableParser();
const htmlParser = new HTMLTableParser();
const csvParser = new CSVTableParser();

function getParser(key: string): TableParser {
    switch (key) {
        case "mmd":
        case "md":
            return mdParser;
        case "html":
            return htmlParser;
        case "csv":
            return csvParser;
        default:
            throw new Error(`Unknown key in getParser: ${key}`);
    }
}

const mdPrettyRenderer = new PrettyMultiMarkdownTableRenderer();
const mdMinifyRenderer = new MinifiedMultiMarkdownTableRenderer();
const htmlPrettyRenderer = new HTMLTableRenderer();
const htmlRenderer = new HTMLTableRenderer(false);
const csvRenderer = new CSVTableRenderer();
const csvSemicolonRenderer = new CSVTableRenderer(";");

function getRenderer(key: string): TableRenderer {
    switch (key) {
        case "mmd":
        case "md":
            return mdPrettyRenderer;
        case "mmd-mini":
        case "md-mini":
            return mdMinifyRenderer;
        case "html":
            return htmlRenderer;
        case "html-code":
            return htmlPrettyRenderer;
        case "csv":
            return csvRenderer;
        case "csv-semicolon":
            return csvSemicolonRenderer;
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
        case "html":
            return false;
        case "html-code":
            return true;
        case "csv":
        case "csv-semicolon":
            return true;
        default:
            return true;
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

    console.time("parse");
    let table = parser.parse(textAreaInput.value);
    console.timeEnd("parse");
    console.time("update");
    table.update();
    console.timeEnd("update");
    console.time("render");
    if (usePreTags(getOutputFormat()))
        divResult.innerHTML = `<pre>${escape(renderer.render(table))}</pre>`;
    else
        divResult.innerHTML = renderer.render(table);
    console.timeEnd("render");
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

function test() {
    let textAreaInput = (<HTMLInputElement>document.querySelector("textarea#input"));
    let divResult = document.querySelector("#rendered-result");
    
    let parser = getParser(getInputFormat());
    let renderer = getRenderer(getOutputFormat());

    console.time("parse");
    let table = parser.parse(textAreaInput.value);
    console.timeEnd("parse");

    console.time("manipulate");
    table.removeColumn(table.getColumn(3));
    table.removeRow(table.getRow(3));
    table.addRow(5);
    console.timeEnd("manipulate");

    console.time("update");
    table.update();
    console.timeEnd("update");

    console.time("render");
    if (usePreTags(getOutputFormat()))
        divResult.innerHTML = `<pre>${escape(renderer.render(table))}</pre>`;
    else
        divResult.innerHTML = renderer.render(table);
    console.timeEnd("render");
}

window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector("button#render").addEventListener("click", render);
    document.querySelector("textarea#input").addEventListener("change", render);
    document.querySelector("select#output-format").addEventListener("change", render);
    document.querySelector("button#format-md").addEventListener("click", formatMarkdown);
    document.querySelector("button#minify-md").addEventListener("click", minifyMarkdown);
    document.querySelector("button#test").addEventListener("click", test);
    render();
});
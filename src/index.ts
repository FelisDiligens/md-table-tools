import { CSVTableParser, CSVTableRenderer } from "./tables/csvTable";
import { GitHubFlavoredMarkdownTableParser, GitHubFlavoredMarkdownTableRenderer } from "./tables/gfmTable";
import { HTMLTableParser, HTMLTableParserMode, HTMLTableRenderer } from "./tables/htmlTable";
import { MultiMarkdownTableParser, PrettyMultiMarkdownTableRenderer, MinifiedMultiMarkdownTableRenderer } from "./tables/multiMarkdownTable";
import { TableParser } from "./tables/tableParser";
import { TableRenderer } from "./tables/tableRenderer";

const mmdParser = new MultiMarkdownTableParser();
const gfmParser = new GitHubFlavoredMarkdownTableParser();
const htmlParser = new HTMLTableParser();
const csvParser = new CSVTableParser();

function getParser(key: string): TableParser {
    switch (key) {
        case "gfm":
            return gfmParser;
        case "mmd":
            return mmdParser;
        case "html":
            return htmlParser;
        case "csv":
            return csvParser;
        default:
            throw new Error(`Unknown key in getParser: ${key}`);
    }
}

const mmdPrettyRenderer = new PrettyMultiMarkdownTableRenderer();
const mmdMinifyRenderer = new MinifiedMultiMarkdownTableRenderer();
const gfmPrettyRenderer = new GitHubFlavoredMarkdownTableRenderer(true);
const gfmMinifyRenderer = new GitHubFlavoredMarkdownTableRenderer(false);
const htmlPrettyRenderer = new HTMLTableRenderer();
const htmlRenderer = new HTMLTableRenderer(false);
const csvRenderer = new CSVTableRenderer();
const csvSemicolonRenderer = new CSVTableRenderer(";");

function getRenderer(key: string): TableRenderer {
    switch (key) {
        case "gfm":
            return gfmPrettyRenderer;
        case "gfm-mini":
            return gfmMinifyRenderer;
        case "mmd":
            return mmdPrettyRenderer;
        case "mmd-mini":
            return mmdMinifyRenderer;
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
        case "gfm":
        case "mmd-mini":
        case "md-mini":
        case "gfm-mini":
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
    let table = mmdParser.parse(textAreaInput.value);
    textAreaInput.value = mmdPrettyRenderer.render(table);
}

function minifyMarkdown() {
    let textAreaInput = (<HTMLInputElement>document.querySelector("textarea#input"));
    let table = mmdParser.parse(textAreaInput.value);
    textAreaInput.value = mmdMinifyRenderer.render(table);
}

window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector("button#render").addEventListener("click", render);
    document.querySelector("textarea#input").addEventListener("change", render);
    document.querySelector("select#output-format").addEventListener("change", render);
    document.querySelector("button#format-md").addEventListener("click", formatMarkdown);
    document.querySelector("button#minify-md").addEventListener("click", minifyMarkdown);
    render();
});
const {
    HTMLTableRenderer,
    MultiMarkdownTableParser,
    GitHubFlavoredMarkdownTableParser,
    HTMLTableParser,
    CSVTableParser,
    CSVTableRenderer,
    PrettyMultiMarkdownTableRenderer,
    MinifiedMultiMarkdownTableRenderer,
    GitHubFlavoredMarkdownTableRenderer,
} = require("@felisdiligens/md-table-tools");

const mmdParser = new MultiMarkdownTableParser();
const gfmParser = new GitHubFlavoredMarkdownTableParser();
const htmlParser = new HTMLTableParser();
const csvParser = new CSVTableParser();
const csvSemicolonParser = new CSVTableParser(";");

const mmdPrettyRenderer = new PrettyMultiMarkdownTableRenderer();
const mmdMinifiedRenderer = new MinifiedMultiMarkdownTableRenderer();
const gfmPrettyRenderer = new GitHubFlavoredMarkdownTableRenderer(true);
const gfmMinifiedRenderer = new GitHubFlavoredMarkdownTableRenderer(false);
const htmlPrettyRenderer = new HTMLTableRenderer(true);
const htmlMinifiedRenderer = new HTMLTableRenderer(false);
const csvRenderer = new CSVTableRenderer();
const csvSemicolonRenderer = new CSVTableRenderer(";");

function escapeHTML(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;"); // &#039;
}

function getInputFormat() {
    return document.getElementById("input-format").value;
}

function getInput() {
    return document.getElementById("input").value;
}

function getOutputFormat() {
    return document.getElementById("output-format").value;
}

function setOutputRaw(value) {
    document.getElementById("output").innerHTML = value;
}

function setOutputPre(value) {
    document.getElementById("output").innerHTML = `<pre style="text-align: left;">${escapeHTML(value)}</pre>`;
}

function setErrorOutput(value) {
    const error = document.getElementById("error");
    error.innerHTML = escapeHTML(value);
    error.style.visibility = "visible";
}

function hideError() {
    document.getElementById("error").style.visibility = "hidden";
}

function detectFormat(input) {
    // <table></table> tags found?
    if (input.match(/<\s*[tT][aA][bB][lL][eE].*\s*>/) && input.match(/<\/\s*[tT][aA][bB][lL][eE]\s*>/))
        return "html";
    // Markdown separator row found?
    else if (input.match(/\|?([\s\.]*:?[\-=\.]+[:\+]?[\s\.]*\|?)+\|?/))
        return "mmd";
    // At least one comma found?
    else if (input.match(/(.*,)+.*/))
        return "csv";
    // At least one semicolon found?
    else if (input.match(/(.*;)+.*/))
        return "csv-semi";
    else
        throw new Error("Couldn't guess input format.");
}

function parseInput(input, format) {
    if (format == "auto")
        format = detectFormat(input);
    switch (format) {
        case "mmd":
            return mmdParser.parse(input);
        case "gfm":
            return gfmParser.parse(input);
        case "html":
            return htmlParser.parse(input);
        case "csv":
            return csvParser.parse(input);
        case "csv-semi":
            return csvSemicolonParser.parse(input);
        default:
            throw new Error(`Unknown input format: ${format}`);
    }
}

function renderOutput(table, format) {
    switch (format) {
        case "preview":
        case "html-pretty":
            return htmlPrettyRenderer.render(table);
        case "html-mini":
            return htmlMinifiedRenderer.render(table);
        case "mmd-pretty":
            return mmdPrettyRenderer.render(table);
        case "mmd-mini":
            return mmdMinifiedRenderer.render(table);
        case "gfm-pretty":
            return gfmPrettyRenderer.render(table);
        case "gfm-mini":
            return gfmMinifiedRenderer.render(table);
        case "csv":
            return csvRenderer.render(table);
        case "csv-semi":
            return csvSemicolonRenderer.render(table);
        default:
            throw new Error(`Unknown output format: ${format}`);
    }
}

function onChange() {
    try {
        const inputFormat = getInputFormat();
        const outputFormat = getOutputFormat();
        const input = getInput();
        const table = parseInput(input, inputFormat);
        const output = renderOutput(table, outputFormat);
        if (outputFormat == "preview")
            setOutputRaw(output);
        else
            setOutputPre(output);
        hideError();
    } catch (e) {
        setOutputRaw("");
        setErrorOutput(e.toString());
        //throw e;
    }
}

document.getElementById("input").addEventListener("input", onChange);
document.getElementById("input-format").addEventListener("change", onChange);
document.getElementById("output-format").addEventListener("change", onChange);
onChange();
hideError();
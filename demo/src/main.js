/*
    Import all parsers/renderers from md-table-tools
*/

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


/*
    Instantiate all parsers/renderers
*/

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


/*
    Helpers
*/

function escapeHTML(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;"); // &#039;
}

function detectFormat(input) {
    // <table></table> tags found?
    if (input.match(/<\s*[tT][aA][bB][lL][eE].*\s*>/) && input.match(/<\/\s*[tT][aA][bB][lL][eE]\s*>/))
        return "html";
    // Markdown separator row found?
    else if (input.match(/^\|?([\s\.]*:?[\-=\.]+[:\+]?[\s\.]*\|?)+\|?$/m))
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

/**
 * Determine the cursor position inside of a text.
 * @param {number} index Cursor position as index
 * @param {string} str Text
 * @returns {{line: number, ch: number}} Line number and character/column
 */
function determineCursorPosition(index, str) {
    const substr = str.substring(0, index); // Get a substring from the start of the text to the current cursor position.
    const line = (substr.match(/\n/g)||[]).length + 1; // Count the number of newlines and add 1 as we start from line 1.
    const ch = substr.length - substr.lastIndexOf("\n") - 1; // Determine the number of characters from the start of the line.
    return {
        line,
        ch
    }
}

/**
 * The opposite of determineCursorPosition. Determine the cursor index inside of a text.
 * @param {number} line Line number
 * @param {number} ch Character/column
 * @param {string} str Text
 * @returns {number} index
 */
function determineCursorIndex(line, ch, str) {
    // Very primitive way of determining it... just iterating over the string and counting.
    let currentLine = 1;
    let currentCh = 0;
    let currentIndex = 0;
    for (const c of str) {
        if (currentLine == line && currentCh == ch) {
            return currentIndex;
        }
        if (c == "\n") {
            currentLine++;
            currentCh = 0;
        } else {
            currentCh++;
        }
        currentIndex++;
    }
    return -1;
}


/*
    Table parsing (determine row index, column index, and text range)
*/

const separatorRegex = /^\|?([\s\.]*:?[\-=\.]+[:\+]?[\s\.]*\|?)+\|?$/;
const captionRegex = /^(\[.+\]){1,2}$/;

/**
 * Determine the column index inside of a table.
 * @param {string} lineStr Line/row
 * @param {number} ch Cursor position from the start of the line
 * @returns {number} Column index
 */
function determineColumnIndex(lineStr, ch) {
    let row = lineStr.substring(0, ch).trim();
    if (row.startsWith("|"))
        row = row.substring(1);
    let colIndex = 0;
    let escape = false;
    for (const ch of row) {
        if (ch == "|" && !escape) {
            colIndex++;
        } else if (ch == "\\") {
            escape = !escape;
        }
    }
    return colIndex;
}

/**
 * Returns the range (line numbers and character numbers) of the table and the selected row/column at the cursor. If there is no table at the cursor, it returns null.
 * @returns {{ start: { line: number, ch: number }, end: { line: number, ch: number }, row: number, column: number, line: number, ch: number } | null}
 */
function getTableCursor() {
    const cursor = getCursor();
    let hasSeparator = false;

    // Determine startLine:
    let rowIndex = 0;
    let startLine = cursor.line;
    let rememberEmptyLine = false;
    while (startLine > 0) {
        let line = getLine(startLine).trim();

        // Does line match criteria?
        if (line.includes("|") || line.match(captionRegex)) {
            if (line.match(separatorRegex))
                hasSeparator = true;

            if (!line.match(captionRegex))
                rowIndex++;

            startLine--; // Move up.
            rememberEmptyLine = false;
        // Ignore a single empty line:
        } else if (line.trim() === "" && !rememberEmptyLine) {
            startLine--; // Move up.
            rememberEmptyLine = true;
        // Break once a line doesn't match criteria:
        } else {
            if (rememberEmptyLine)
                startLine++; // Move back...
            break;
        }
    }
    startLine++; // Move back...
    rowIndex--;

    if (hasSeparator)
        rowIndex--;

    // Determine endLine:
    let endLine = cursor.line;
    while (endLine <= lineCount()) {
        let line = getLine(endLine).trim();

        // Does line match criteria?
        if (line.includes("|") || line.match(captionRegex)) {
            if (line.match(separatorRegex))
                hasSeparator = true;

            endLine++; // Move down.
            rememberEmptyLine = false;
        // Ignore a single empty line:
        } else if (line.trim() === "" && !rememberEmptyLine) {
            endLine++; // Move down.
            rememberEmptyLine = true;
        // Break once a line doesn't match criteria:
        } else {
            if (rememberEmptyLine)
                endLine--; // Move back...
            break;
        }
    }
    endLine--; // Move back...

    if (hasSeparator && (endLine != startLine))
        return {
            "start": {
                "line": startLine,
                "ch": 0
            },
            "end": {
                "line": endLine,
                "ch": getLine(endLine).length
            },
            "row": rowIndex,
            "column": determineColumnIndex(getLine(cursor.line), cursor.ch),
            "line": cursor.line,
            "ch": cursor.ch
        };
    else
        return null;
}


/*
    UI Getter and Setter
*/

/**
 * @returns {"mmd"|"gfm"|"html"|"csv"|"csv-semi"}
 */
function getInputFormat() {
    const format = document.getElementById("input-format").value;
    if (format == "auto")
        return detectFormat(getInput());
    return format;
}

function getInput() {
    return document.getElementById("input").value;
}

function setInput(value) {
    document.getElementById("input").value = value;
}

/**
 * Get the line inside of textarea.
 * @param {number} line 
 * @returns {string}
 */
function getLine(line) {
    return document.getElementById("input").value.split('\n')[line - 1];
}

function lineCount() {
    return (document.getElementById("input").value.match(/\n/g)||[]).length + 1;
}

/**
 * Get the cursor position inside of textarea.
 * @param {number} line
 */
function getCursor() {
    const textarea = document.getElementById("input");
    return determineCursorPosition(textarea.selectionEnd, textarea.value);
}

/**
 * Get the selection inside of textarea.
 * @param {number} line
 */
function getSelection() {
    const textarea = document.getElementById("input");
    return {
        start: determineCursorPosition(textarea.selectionStart, textarea.value),
        end: determineCursorPosition(textarea.selectionEnd, textarea.value)
    }
}

/**
 * @returns {"preview"|"mmd-pretty"|"mmd-mini"|"gfm-pretty"|"gfm-mini"|"html-pretty"|"html-mini"|"csv"|"csv-semi"}
 */
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
    document.getElementById("output").innerHTML = "";
}

function hideError() {
    document.getElementById("error").style.visibility = "hidden";
}


/*
    Use md-table-tools lib
*/

function formatInput(input, format) {
    switch (format) {
        case "mmd":
            return mmdPrettyRenderer.render(mmdParser.parse(input));
        case "gfm":
            return gfmPrettyRenderer.render(gfmParser.parse(input));
        case "html":
            return htmlPrettyRenderer.render(htmlParser.parse(input));
        default:
            throw new Error(`Cannot format input of type "${format}"`);
    }
}

function parseInput(input, format) {
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
            table.mergeMultilineRows();
            return htmlPrettyRenderer.render(table);
        case "html-mini":
            table.mergeMultilineRows();
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


/*
    UI Event Handler
*/

function onChange() {
    try {
        const inputFormat = getInputFormat();

        // Hide table tools depending on input format...
        if (inputFormat == "mmd")
            document.getElementById("tools").classList.remove("hide");
        else
            document.getElementById("tools").classList.add("hide");

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
        setErrorOutput(e.toString());
        document.getElementById("tools").classList.add("hide");
        throw e;
    }
}

function onBtnFormat() {
    try {
        setInput(formatInput(getInput(), getInputFormat()));
        onChange();
    } catch (e) {
        setErrorOutput(e.toString());
        throw e;
    }
}

function actionWrapper(callback) {
    try {
        // Get stuff:
        const input = getInput();
        const outputFormat = getOutputFormat();
        const cursor = getTableCursor();
        if (cursor == null) {
            setErrorOutput("Couldn't determine cursor position in table.");
            return;
        }

        // Parse table:
        const table = parseInput(input, "mmd");

        // Manipulate table:
        callback(table, cursor);

        // Write rendered result back into input textarea:
        setInput(mmdPrettyRenderer.render(table));

        // Render output:
        const output = renderOutput(table, outputFormat);
        if (outputFormat == "preview")
            setOutputRaw(output);
        else
            setOutputPre(output);

        // Restore textarea focus and cursor position:
        const textarea = document.getElementById("input");
        const newCursorIndex = determineCursorIndex(cursor.line, cursor.ch, textarea.value);
        textarea.focus();
        textarea.selectionEnd = newCursorIndex;
    } catch (e) {
        setErrorOutput(e.toString());
        throw e;
    }
}

function onBtnRowAddAbove() {
    actionWrapper((table, cursor) => {
        table.addRow(cursor.row);
        table.update();
    });
}

function onBtnRowAddBelow() {
    actionWrapper((table, cursor) => {
        table.addRow(cursor.row + 1);
        table.update();
    });
}

function onBtnRowDelete() {
    actionWrapper((table, cursor) => {
        table.removeRow(cursor.row);
        table.update();
    });
}

function onBtnColAddLeft() {
    actionWrapper((table, cursor) => {
        table.addColumn(cursor.column);
        table.update();
    });
}

function onBtnColAddRight() {
    actionWrapper((table, cursor) => {
        table.addColumn(cursor.column + 1);
        table.update();
    });
}

function onBtnColDelete() {
    actionWrapper((table, cursor) => {
        table.removeColumn(cursor.column);
        table.update();
    });
}

function onBtnAlignLeft() {
    actionWrapper((table, cursor) => {
        const column = table.getColumn(cursor.column);
        column.textAlign = column.textAlign == "left" ? "default" : "left";
    });
}

function onBtnAlignCenter() {
    actionWrapper((table, cursor) => {
        const column = table.getColumn(cursor.column);
        column.textAlign = column.textAlign == "center" ? "default" : "center";
    });
}

function onBtnAlignRight() {
    actionWrapper((table, cursor) => {
        const column = table.getColumn(cursor.column);
        column.textAlign = column.textAlign == "right" ? "default" : "right";
    });
}


/*
    Initialize web page
*/

// Register event handler
document.getElementById("input").addEventListener("input", onChange);
document.getElementById("input-format").addEventListener("change", onChange);
document.getElementById("output-format").addEventListener("change", onChange);

// Register event handler for table tool buttons
document.getElementById("btn-row-add-above").addEventListener("click", onBtnRowAddAbove);
document.getElementById("btn-row-add-below").addEventListener("click", onBtnRowAddBelow);
document.getElementById("btn-row-delete").addEventListener("click", onBtnRowDelete);
document.getElementById("btn-col-add-left").addEventListener("click", onBtnColAddLeft);
document.getElementById("btn-col-add-right").addEventListener("click", onBtnColAddRight);
document.getElementById("btn-col-delete").addEventListener("click", onBtnColDelete);
document.getElementById("btn-align-left").addEventListener("click", onBtnAlignLeft);
document.getElementById("btn-align-center").addEventListener("click", onBtnAlignCenter);
document.getElementById("btn-align-right").addEventListener("click", onBtnAlignRight);
document.getElementById("btn-format").addEventListener("click", onBtnFormat);

// Init UI
onChange();
hideError();

// Enable bootstrap tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
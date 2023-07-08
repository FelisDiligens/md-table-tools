import { expect } from "chai";
import dedent from 'dedent-js'; // https://stackoverflow.com/questions/25924057/multiline-strings-that-dont-break-indentation
import "mocha";
import { HTMLTableRenderer, MinifiedMultiMarkdownTableRenderer, MultiMarkdownTableParser, PrettyMultiMarkdownTableRenderer } from "../../index.js";

describe("Mixed MultiMarkdown test", () => {
    let htmlPrettyRenderer: HTMLTableRenderer;
    let mmdParser: MultiMarkdownTableParser;
    let mmdPrettyRenderer: PrettyMultiMarkdownTableRenderer;
    let mmdMinifiedRenderer: MinifiedMultiMarkdownTableRenderer;

    before(() => {
        htmlPrettyRenderer = new HTMLTableRenderer(true, " ".repeat(4));
        mmdParser = new MultiMarkdownTableParser();
        mmdPrettyRenderer = new PrettyMultiMarkdownTableRenderer();
        mmdMinifiedRenderer = new MinifiedMultiMarkdownTableRenderer();
    });

    describe("converting between Markdown and HTML", () => {
        it("should convert the grades table", () => {
            let table = mmdParser.parse(dedent`
            | Punkte | Note                 |||
            |:------:|:---|----|--------------|
            |   15   | 1+ | 1  | sehr gut     |
            |   14   | 1  | ^^ | ^^           |
            |   13   | 1- | ^^ | ^^           |
            |   12   | 2+ | 2  | gut          |
            |   11   | 2  | ^^ | ^^           |
            |   10   | 2- | ^^ | ^^           |
            |   9    | 3+ | 3  | befriedigend |
            |   8    | 3  | ^^ | ^^           |
            |   7    | 3- | ^^ | ^^           |
            |   6    | 4+ | 4  | ausreichend  |
            |   5    | 4  | ^^ | ^^           |
            |   4    | 4- | ^^ | ^^           |
            |   3    | 5+ | 5  | mangelhaft   |
            |   2    | 5  | ^^ | ^^           |
            |   1    | 5- | ^^ | ^^           |
            |   0    | 6  | 6  | ungenügend   |`);

            let htmlTable = htmlPrettyRenderer.render(table);

            expect(htmlTable).to.equal(dedent`
            <table>
                <thead>
                    <tr>
                        <th style="text-align: center">Punkte</th>
                        <th colspan="3" style="text-align: left">Note</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align: center">15</td>
                        <td style="text-align: left">1+</td>
                        <td rowspan="3">1</td>
                        <td rowspan="3">sehr gut</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">14</td>
                        <td style="text-align: left">1</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">13</td>
                        <td style="text-align: left">1-</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">12</td>
                        <td style="text-align: left">2+</td>
                        <td rowspan="3">2</td>
                        <td rowspan="3">gut</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">11</td>
                        <td style="text-align: left">2</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">10</td>
                        <td style="text-align: left">2-</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">9</td>
                        <td style="text-align: left">3+</td>
                        <td rowspan="3">3</td>
                        <td rowspan="3">befriedigend</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">8</td>
                        <td style="text-align: left">3</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">7</td>
                        <td style="text-align: left">3-</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">6</td>
                        <td style="text-align: left">4+</td>
                        <td rowspan="3">4</td>
                        <td rowspan="3">ausreichend</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">5</td>
                        <td style="text-align: left">4</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">4</td>
                        <td style="text-align: left">4-</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">3</td>
                        <td style="text-align: left">5+</td>
                        <td rowspan="3">5</td>
                        <td rowspan="3">mangelhaft</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">2</td>
                        <td style="text-align: left">5</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">1</td>
                        <td style="text-align: left">5-</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">0</td>
                        <td style="text-align: left">6</td>
                        <td>6</td>
                        <td>ungenügend</td>
                    </tr>
                </tbody>
            </table>`);
        });

        it("should format multiline tables", () => {
            let table = mmdParser.parse(dedent`
            |   Markdown   | Rendered HTML |
            |--------------|---------------|
            |    *Italic*  | *Italic*      | \\
            |              |               |
            |    - Item 1  | - Item 1      | \\
            |    - Item 2  | - Item 2      |
            |    \`\`\`python | \`\`\`python       \\
            |    .1 + .2   | .1 + .2         \\
            |    \`\`\`       | \`\`\`           |
            `);

            let prettyTable = mmdPrettyRenderer.render(table);

            expect(prettyTable).to.equal(dedent`
            | Markdown  | Rendered HTML |
            |-----------|---------------|
            | *Italic*  | *Italic*      | \\
            |           |               |
            | - Item 1  | - Item 1      | \\
            | - Item 2  | - Item 2      |
            | \`\`\`python | \`\`\`python     | \\
            | .1 + .2   | .1 + .2       | \\
            | \`\`\`       | \`\`\`           |`);
        });

        it("should minify multiline tables", () => {
            let table = mmdParser.parse(dedent`
            |   Markdown   | Rendered HTML |
            |--------------|---------------|
            |    *Italic*  | *Italic*      | \\
            |              |               |
            |    - Item 1  | - Item 1      | \\
            |    - Item 2  | - Item 2      |
            |    \`\`\`python | \`\`\`python       \\
            |    .1 + .2   | .1 + .2         \\
            |    \`\`\`       | \`\`\`           |
            `);

            let minifiedTable = mmdMinifiedRenderer.render(table);

            expect(minifiedTable).to.equal(dedent`
            Markdown|Rendered HTML
            -|-
            *Italic*|*Italic* \\
            | | |
            - Item 1|- Item 1 \\
            - Item 2|- Item 2
            \`\`\`python|\`\`\`python \\
            .1 + .2|.1 + .2 \\
            \`\`\`|\`\`\``);
        });

        it("should convert multiline tables into HTML", () => {
            let table = mmdParser.parse(dedent`
            |   Markdown   | Rendered HTML |
            |--------------|---------------|
            |    *Italic*  | *Italic*      | \\
            |              |               |
            |    - Item 1  | - Item 1      | \\
            |    - Item 2  | - Item 2      |
            |    \`\`\`python | \`\`\`python       \\
            |    .1 + .2   | .1 + .2         \\
            |    \`\`\`       | \`\`\`           |
            `);

            table.mergeMultilineRows(); // Without merging them beforehand, the HTML table won't be rendered correctly.

            let htmlTable = htmlPrettyRenderer.render(table);

            expect(htmlTable).to.equal(dedent`
            <table>
                <thead>
                    <tr>
                        <th>Markdown</th>
                        <th>Rendered HTML</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><em>Italic</em></td>
                        <td><em>Italic</em></td>
                    </tr>
                    <tr>
                        <td>- Item 1<br>- Item 2</td>
                        <td>- Item 1<br>- Item 2</td>
                    </tr>
                    <tr>
                        <td><code>.1 + .2</code></td>
                        <td><code>.1 + .2</code></td>
                    </tr>
                </tbody>
            </table>`);
        });
    });
});
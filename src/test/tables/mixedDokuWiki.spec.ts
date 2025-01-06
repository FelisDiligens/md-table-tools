import { expect } from "chai";
import dedent from "dedent-js"; // https://stackoverflow.com/questions/25924057/multiline-strings-that-dont-break-indentation
import "mocha";
import {
    DokuWikiTableParser,
    DokuWikiTableRenderer,
    MultiMarkdownTableParser,
    PrettyMultiMarkdownTableRenderer,
} from "../../index.js";

describe("Mixed DokuWiki test", () => {
    let mmdParser: MultiMarkdownTableParser;
    let mmdPrettyRenderer: PrettyMultiMarkdownTableRenderer;
    let dokuWikiParser: DokuWikiTableParser;
    let dokuWikiRenderer: DokuWikiTableRenderer;

    before(() => {
        mmdParser = new MultiMarkdownTableParser();
        mmdPrettyRenderer = new PrettyMultiMarkdownTableRenderer();
        dokuWikiParser = new DokuWikiTableParser();
        dokuWikiRenderer = new DokuWikiTableRenderer();
    });

    describe("converting between Markdown and DokuWiki", () => {
        it("should convert the grades table: mmd -> dk", () => {
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

            let dokuWikiTable = dokuWikiRenderer.render(table);

            expect(dokuWikiTable).to.equal(dedent`
                ^  Punkte  ^ Note                   ^^^
                |    15    | 1+  | 1   | sehr gut     |
                |    14    | 1   | ::: | :::          |
                |    13    | 1-  | ::: | :::          |
                |    12    | 2+  | 2   | gut          |
                |    11    | 2   | ::: | :::          |
                |    10    | 2-  | ::: | :::          |
                |    9     | 3+  | 3   | befriedigend |
                |    8     | 3   | ::: | :::          |
                |    7     | 3-  | ::: | :::          |
                |    6     | 4+  | 4   | ausreichend  |
                |    5     | 4   | ::: | :::          |
                |    4     | 4-  | ::: | :::          |
                |    3     | 5+  | 5   | mangelhaft   |
                |    2     | 5   | ::: | :::          |
                |    1     | 5-  | ::: | :::          |
                |    0     | 6   | 6   | ungenügend   |`);
        });

        it("should convert the grades table: dk -> mmd", () => {
            let table = dokuWikiParser.parse(dedent`
                ^  Punkte  ^ Note                   ^^^
                |    15    | 1+  | 1   | sehr gut     |
                |    14    | 1   | ::: | :::          |
                |    13    | 1-  | ::: | :::          |
                |    12    | 2+  | 2   | gut          |
                |    11    | 2   | ::: | :::          |
                |    10    | 2-  | ::: | :::          |
                |    9     | 3+  | 3   | befriedigend |
                |    8     | 3   | ::: | :::          |
                |    7     | 3-  | ::: | :::          |
                |    6     | 4+  | 4   | ausreichend  |
                |    5     | 4   | ::: | :::          |
                |    4     | 4-  | ::: | :::          |
                |    3     | 5+  | 5   | mangelhaft   |
                |    2     | 5   | ::: | :::          |
                |    1     | 5-  | ::: | :::          |
                |    0     | 6   | 6   | ungenügend   |`);

            let mmdTable = mmdPrettyRenderer.render(table);

            expect(mmdTable).to.equal(dedent`
                | Punkte | Note                 |||
                |:------:|:---|:---|:-------------|
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
        });
    });
});

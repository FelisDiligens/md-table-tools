import "mocha";
import { expect } from "chai";
import dedent from 'dedent-js'; // https://stackoverflow.com/questions/25924057/multiline-strings-that-dont-break-indentation
import { MinifiedMultiMarkdownTableRenderer, MultiMarkdownTableParser, PrettyMultiMarkdownTableRenderer } from "../../tables/multiMarkdownTable.js";


describe("MultiMarkdownTableParser", () => {
    let mmdParser: MultiMarkdownTableParser;

    before(() => {
        mmdParser = new MultiMarkdownTableParser();
    });

    describe(".parse()", () => {
        context("when parsing valid tables", () => {
            it("should parse the example table just fine", () =>{
                expect(() => {
                    mmdParser.parse(dedent`
                    |             |          Grouping           ||
                    First Header  | Second Header | Third Header |
                     ------------ | :-----------: | -----------: |
                    Content       |          *Long Cell*        ||
                    Content       |   **Cell**    |         Cell |
                    
                    New section   |     More      |         Data |
                    And more      | With an escaped '\\|'         ||
                    [Prototype table]
                    `);
                }).to.not.throw();
            });

            it("should parse a table without header", () =>{
                expect(() => {
                    mmdParser.parse(dedent`
                    |-----|-----|-----|
                    | jkl | mno | pqr |
                    `);
                }).to.not.throw();
            });

            it("should parse a header-only table", () =>{
                expect(() => {
                    mmdParser.parse(dedent`
                    | abc | def | ghi |
                    |-----|-----|-----|
                    `);
                }).to.not.throw();
            });
        });

        context("when parsing invalid tables", () => {
            it("should throw an error on missing cells", () =>{
                expect(() => {
                    mmdParser.parse(dedent`
                    | abc     | def  | ghi |
                    |---------|------|-----|
                    | missing | cell |
                    `);
                }).to.throw();
            });

            it("should throw an error on excess cells", () =>{
                expect(() => {
                    mmdParser.parse(dedent`
                    | abc    | def  | ghi   |
                    |--------|------|-------|
                    | excess | cell | right | here! |
                    `);
                }).to.throw();
            });

            it("should throw an error on missing delimiter row", () =>{
                expect(() => {
                    mmdParser.parse(dedent`
                    | abc | def | ghi |
                    | jkl | mno | pqr |
                    `);
                }).to.throw();
            });
        });
    });
});

describe("PrettyMultiMarkdownTableRenderer", () => {
    let mmdRenderer: PrettyMultiMarkdownTableRenderer;

    before(() => {
        mmdRenderer = new PrettyMultiMarkdownTableRenderer();
    });
});

describe("MinifiedMultiMarkdownTableRenderer", () => {
    let mmdRenderer: MinifiedMultiMarkdownTableRenderer;

    before(() => {
        mmdRenderer = new MinifiedMultiMarkdownTableRenderer();
    });
});
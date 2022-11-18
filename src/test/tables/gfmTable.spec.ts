import "mocha";
import { expect } from "chai";
import dedent from 'dedent-js'; // https://stackoverflow.com/questions/25924057/multiline-strings-that-dont-break-indentation
import { GitHubFlavoredMarkdownTableParser } from "../../tables/gfmTable.js";


describe("GitHubFlavoredMarkdownTableParser", () => {
    let gfmParser: GitHubFlavoredMarkdownTableParser;

    before(() => {
        gfmParser = new GitHubFlavoredMarkdownTableParser();
    });

    describe(".parse()", () => {
        context("when parsing invalid tables", () => {
            it("should ignore missing and excess cells", () =>{
                expect(() => {
                    gfmParser.parse(dedent`
                    | abc | def |
                    | --- | --- |
                    | bar |
                    | bar | baz | boo |
                    `);
                }).to.not.throw();
            });

            it("should throw an error if header row doesn't match the delimiter row in the number of cells", () =>{
                expect(() => {
                    gfmParser.parse(dedent`
                    | abc | def |
                    | --- |
                    | bar |
                    `);
                }).to.throw();
            });
        });
    });
});
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
        context("when parsing valid tables", () => {
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
        });

        context("when parsing invalid tables", () => {
            it("should throw an error if header row doesn't match the delimiter row in the number of cells", () =>{
                expect(() => {
                    gfmParser.parse(dedent`
                    | abc | def |
                    | --- |
                    | bar |
                    `);
                }).to.throw();
            });

            it("should throw an error on missing delimiter row", () =>{
                expect(() => {
                    gfmParser.parse(dedent`
                    | abc | def | ghi |
                    | jkl | mno | pqr |
                    `);
                }).to.throw();
            });

            it("should throw an error on a table without header", () =>{
                expect(() => {
                    gfmParser.parse(dedent`
                    |-----|-----|-----|
                    | jkl | mno | pqr |
                    `);
                }).to.throw();
            });
        });
    });
});
import "mocha";
import { expect } from "chai";
import dedent from 'dedent-js'; // https://stackoverflow.com/questions/25924057/multiline-strings-that-dont-break-indentation
import { HTMLTableParser } from "../../tables/htmlTable.js";


describe("HTMLTableParser", () => {
    let htmlParser: HTMLTableParser;

    before(() => {
        htmlParser = new HTMLTableParser();
    });

    describe(".parse()", () => {
        context("when parsing invalid tables", () => {
            it("should throw an error on missing <table> tag", () =>{
                expect(() => {
                    htmlParser.parse(dedent`
                    <thead>
                        <tr>
                            <td>Header</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Body</td>
                        </tr>
                    </tbody>
                    `);
                }).to.throw();
            });
        });
    });
});
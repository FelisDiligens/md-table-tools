import "mocha";
import { expect } from "chai";
import { getTurndownService, removeInvisibleCharacters } from "../../tables/common.js";

const testString = `
0123456789 ,.-_#'*+~<>|@^°!"§$%&/()=?\`\`²³{[]}\\´

Use pangrams in different languages to check if any important characters get removed:

Hello world! The quick brown fox jumps over the lazy dog.
Hallo Welt! Typisch fiese Kater würden Vögel bloß zum Jux quälen.
Bonjour le monde! Voyez le brick géant que j’examine près du wharf.
Hola mundo! Whisky bueno: ¡excitad mi frágil pequeña vejez!
Здравствуй, мир! Съешь ещё этих мягких французских булок, да выпей чаю.
ハロー・ワールド。
你好，世界！
`;

describe("Common functions" , () => {
    describe("removeInvisibleCharacters()", () => {
        it("should not remove latin/cyrillic/japanese/etc. characters, numbers or special characters", () =>{
            expect(removeInvisibleCharacters(testString)).to.equal(testString);
        });
    });
    
    describe("getTurndownService()", () => {
        context(".turndown()", () => {
            it("should remove table tags", () =>{
                expect(getTurndownService().turndown(`
                    <table>
                        <thead>
                            <tr>
                                <th>Hello</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>world!</td>
                            </tr>
                        </tbody>
                    </table>`)
                ).to.not.include("<table>").and
                 .to.not.include("<thead>").and
                 .to.not.include("<tbody>").and
                 .to.not.include("<tr>").and
                 .to.not.include("<th>").and
                 .to.not.include("<td>");
            });
        });
    });
});
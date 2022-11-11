var md = require('markdown-it')()
            .use(require('markdown-it-multimd-table'), {
                multiline:  true,
                rowspan:    true,
                headerless: true,
                multibody:  true,
                aotolabel:  true,
            });

function updateHTMLTable() {
    let textAreaInput = (<HTMLInputElement>document.querySelector("#markdown-input"));
    let divResult = document.querySelector("#html-result");
    divResult.innerHTML = md.render(textAreaInput.value);
}

window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector("#markdown-input").addEventListener("change", updateHTMLTable);
    updateHTMLTable();
});
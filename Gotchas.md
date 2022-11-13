## Gotchas that need fixing:

- [x] ~~Can't parse single column md tables~~
- [x] ~~Can't parse md table, if row doesn't start with | and end with |~~
- [x] ~~Can't parse captions above md table~~
- [x] ~~Can't parse table section label~~: `[Table caption, works as a reference][section-mmd-tables-table1]`
    - Outputs: `<caption id="section-mmd-tables-table1">Table caption, works as a reference</caption>`
    - See:
        - https://bywordapp.com/markdown/guide.html#section-mmd
        - https://bywordapp.com/markdown/guide.html#section-mmd-tables-table1
- [x] ~~Can't parse and render mmd table sections (multiple `<tbody>` tags)~~
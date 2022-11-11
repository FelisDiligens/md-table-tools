## Gotchas that need fixing:

- [ ] Can't parse single column md tables
- [ ] Can't parse md table, if row doesn't start with | and end with |
- [ ] Can't parse captions above md table
- [ ] Can't parse table section label: [Table caption, works as a reference][section-mmd-tables-table1]
    - Outputs: `<caption id="section-mmd-tables-table1">Table caption, works as a reference</caption>`
    - See:
        - https://bywordapp.com/markdown/guide.html#section-mmd
        - https://bywordapp.com/markdown/guide.html#section-mmd-tables-table1
- [ ] Can't parse and render mmd table sections (multiple `<tbody>` tags)
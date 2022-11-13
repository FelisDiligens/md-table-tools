# MultiMarkdown table tools

> ⚠️ Work-In-Progress

This module currently allows parsing MultiMarkdown tables, formatting or minifying them, and rendering them into HTML.  
You can also manipulate parsed tables before rendering them, e.g. by adding or removing rows.

More to come.

## Syntax

This module mostly follows the MultiMarkdown specs: https://fletcher.github.io/MultiMarkdown-6/syntax/tables.html

With one exception: You can merge cells vertically by writing `^^` into a cell;

## Building

```
$ git clone https://github.com/FelisDiligens/md-table-tools.git
$ cd md-table-tools
$ npm install
$ npm run build
```

## Usage

Build the project and open `./dist/index.html` for a demo.
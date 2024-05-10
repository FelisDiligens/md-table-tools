// https://gist.github.com/aleclarson/9900ed2a9a3119d865286b218e14d226

import typescript from '@rollup/plugin-typescript';
import dts from "rollup-plugin-dts";

const input = "src/index.ts";
const bundleBasename = "bundle";
const external = ["cheerio", "htmlparser2", "turndown", "string-width"];

export default [
    {
        plugins: [typescript()],
        input: input,
        output: [
            {
                file: `dist/cjs/${bundleBasename}.js`,
                format: "cjs",
                sourcemap: true,
                interop: "auto",
            },
            {
                file: `dist/mjs/${bundleBasename}.js`,
                format: "es",
                sourcemap: true,
            },
        ],
        external: external,
    },
    {
        plugins: [dts()],
        input: input,
        output: {
            file: `dist/types/${bundleBasename}.d.ts`,
            format: "es",
        },
        external: external,
    },
];

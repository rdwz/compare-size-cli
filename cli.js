#!/usr/bin/env node
import compareSize from "compare-size"
import meow from "meow"
import prettyBytes from "pretty-bytes"

const cli = meow(
	`
	Usage
	  $ compare-size <file> <file>

	Example
	  $ compare-size foo.zip bar.tar.gz
	  foo.zip: 1.34 kB
	  bar.tar.gz: 1 kB
	  Difference: 0.34 kB
`,
	{
		importMeta: import.meta,
		flags: {},
	},
)

if (cli.input.length < 2) {
	console.error("Provide two files to compare ⚠️")
	process.exit(1)
}

compareSize(cli.input[0], cli.input[1]).then((data) => {
	console.log(
		[
			`${cli.input[0].padEnd(Math.max(5, cli.input[0].length, cli.input[1].length))}: ${prettyBytes(
				data[cli.input[0]],
			)}`,
			`${cli.input[1].padEnd(Math.max(5, cli.input[0].length, cli.input[1].length))}: ${prettyBytes(
				data[cli.input[1]],
			)}`,
			`${"Delta".padEnd(Math.max(5, cli.input[0].length, cli.input[1].length))}: ${prettyBytes(
				data.difference,
			)}`,
		].join("\n"),
	)
})

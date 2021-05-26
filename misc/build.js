#!/usr/bin/env node

const fs = require('fs')
const ejs = require('ejs')
const pako = require('pako')

const data = {
  deflate: (str) =>
    Buffer.from(pako.deflateRaw(Buffer.from(encodeURIComponent(str)))).toString('base64'),
  jsonToStyle: (json) =>
    Object.entries(JSON.parse(json))
      .map(([k, v]) => k + '=' + encodeURIComponent(v))
      .join(';'),
};

const options = {}

ejs.renderFile('./src/library.xml', data, options, function (err, str) {
  if (err) {
    console.log(err.stack)
    process.exit(1)
  }

  fs.mkdirSync("dist", { recursive: true })
  fs.writeFileSync("dist/library.xml", str)
});

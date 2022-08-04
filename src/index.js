const parser = require('toml/lib/parser')
const {
  doc: {
    builders: { concat }
  }
} = require('prettier')

const languages = [
  {
    extensions: ['.toml'],
    name: 'TOML',
    parsers: ['toml-parse']
  }
]

const parsers = {
  'toml-parse': {
    parse: text => parserr(text),
    astFormat: 'toml-ast'
  }
}

function printToml(path, options, print) {
  console.log(JSON.stringify(path, null, 2))
  const node = path.getValue()

  if (Array.isArray(node)) {
    return concat(path.map(print))
  }

  switch (node.type) {
    default:
      return ''
  }
}

const printers = {
  'toml-ast': {
    print: printToml
  }
}

module.exports = {
  languages,
  parsers,
  printers
}


function parserr(text) {
  const parsed = [];
  let sqlTagIndex = text.indexOf("sql`");
  while (sqlTagIndex !== -1) {
    // console.log(text);
    if (sqlTagIndex === 0) {
      const closeTag = text.substring(4).indexOf("`");
      const content = text.substring(0, closeTag + 5);
      text = text.substring(closeTag + 1);
      parsed.push({
        type: "query",
        content: content,
      });
    } else {
      const content = text.substring(0, sqlTagIndex);
      text = text.substring(sqlTagIndex);
      parsed.push({
        type: "nothing",
        content: content,
      });
    }
    sqlTagIndex = text.indexOf("sql`");
  }

  return parsed;
}

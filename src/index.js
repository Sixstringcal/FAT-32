const {parser} = require('./parser')
const {
  doc: {
    builders: { concat }
  }
} = require('prettier')

const languages = [
  {
    extensions: ['.ts'],
    name: 'typescript',
    parsers: ['fat-32']
  }
]


const parsers = {
  'fat-32': {
    parse: text => parser(text),
    astFormat: 'ts-ast'
  }
}

function printTs(path, options, print) {
  const node = path.getValue()
  if (Array.isArray(node)) {
    return concat(path.map(print))
  }
  console.log(node.type)
  switch (node.type) {
    case undefined:
      return ''
    case "query":
      return node.content.toLowerCase();
    default:
      return node.content
  }
}

const printers = {
  'ts-ast': {
    print: printTs
  }
}

module.exports = {
  languages,
  parsers,
  printers
}



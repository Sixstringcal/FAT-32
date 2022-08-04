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
  'ts-ast': {
    print: printTs
  }
}

module.exports = {
  languages,
  parsers,
  printers
}



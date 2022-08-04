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
  if(node === undefined){
    return ''
  }
  console.log('asdf')
  let printed = '';
  switch(node.type){
    case "Program":
      printed = printRecurisve(node.body, options, print);
      break;
    case "FunctionDeclaration":
      printed = `function ${node.id.name} ()`
      break;
    default:
      printed = '';
      break;
  }
  return printed;
}

function printRecurisve(node, options, print) {
  if (Array.isArray(node)) {
    return concat(node.map(print))
  }
  let printed = '';
  switch(node.type){
    case "Program":
      printed = printRecursive(node.body, options, print);
      break;
    case "FunctionDeclaration":
      printed = `function ${node.id.name} ()`
  }
  return printed;
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



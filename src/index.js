const {parser} = require('./parser')
const prettier = require('prettier')

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
  let text = path.stack[0];
  let printed = '';
  let sqlTagIndex = text.indexOf('sql`');
  while(sqlTagIndex > -1){
    if(sqlTagIndex === 0){
      const sqlTagEndIndex = text.substring(4).indexOf("`");
      let content = text.substring(0, sqlTagEndIndex + 5);
      text = text.substring(sqlTagEndIndex + 5);
      const formattedQuery = 'sql`' + formatSQL(content.substring(4, content.length - 1)) + '`';
      printed += formattedQuery;
    }
    else {
      let content = text.substring(0, sqlTagIndex);
      text = text.substring(sqlTagIndex);
      printed += content.toLowerCase();
    }
    sqlTagIndex = text.indexOf('sql`');
  }
  if(text.length > 0){
    printed += text;
  }



  return prettier.format(printed, {parser: "babel-ts"});
}

function formatSQL(text){
  console.log(text);
  let tokens = text.split(' ').map(t => {
    if(t[0] !== "'" && t[0] !== '"'){
      return t.toLowerCase();
    }
    else {
      return t
    }
  })
  let printed = tokens.join(' ')
  if(printed.length < 50){
    return printed;
  }
  printed = '';
  for(let i = 0; i < tokens.length; i++){
    if(tokens[i] === 'select' ||
    tokens[i] === 'from' ||
    tokens[i] === 'where' ||
    tokens[i] === 'insert' ||
    tokens[i] === 'values' ||
    tokens[i] === 'set'
    ){
      printed += ('\n' + tokens[i] + ' ')
    }
  
    else {
      printed += `${tokens[i]}${i === tokens.length - 1 ? '' : ' '}`
    }
  }

  tokens = printed.split('\n');

  if(tokens.every(t => {
    t.length < 50
  })){
    return printed;
  }


  tokens = tokens.map(t => {
    if(t.length >= 50){
      let split = t.split(' ');
      let displayed = '';
      let commas = false;
      for(let i = 0; i < split.length; i++){
        if(split[i][split[i].length -1] === ','){
          displayed += '\n  ' + split[i];
          commas = true;
        }
        else if (commas){
          displayed += '\n  ' + split[i];
          commas = false;
        }
        else {
          displayed += `${split[i]}${i < split.length - 1 ? ' ' : ''}`;
        }
      }
      return displayed;
    }


    
    return t;
  });


  if(tokens.every(t => {
    t.length < 50
  })){
    return tokens.join('\n');
  }


  tokens = tokens.map(t => {
    if(t.length >= 50){
      let split = t.split(' ');
      let displayed = '';
      for(let i = 0; i < split.length; i++){
        if(split[i] === 'and'){
          displayed += '\n  ' + split[i] + ' ';
        }
    
        else {
          displayed += `${split[i]}${i < split.length - 1 ? ' ' : ''}`;
        }
      }
      return displayed;
    }


    
    return t;
  });


  if(tokens.every(t => {
    t.length < 50
  })){
    return tokens.join('\n');
  }


  tokens = tokens.map(t => {
    if(t.length >= 50){
      let split = t.split(' ');
      let displayed = '';
      for(let i = 0; i < split.length; i++){
        if(split[i] === 'on'){
          displayed += '\n  ' + split[i] + ' ';
        }
    
        else {
          displayed += `${split[i]}${i < split.length - 1 ? ' ' : ''}`;
        }
      }
      return displayed;
    }


    
    return t;
  });



  
  return tokens.join('\n');
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



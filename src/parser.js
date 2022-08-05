const parsers = require('@typescript-eslint/parser');
const prettier = require('prettier')


function parser(text) {
    let a = prettier.format(text, {parser: "babel-ts"})
   return  a;
}
  module.exports =  {parser}
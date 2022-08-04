const parsers = require('@typescript-eslint/parser');
const prettier = require('prettier')


function parser(text) {
   return  parsers.parse(prettier.format(text, {parser: "babel-ts"}));
}
  module.exports =  {parser}
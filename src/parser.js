function parser(text) {
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
  
  module.exports =  {parser}
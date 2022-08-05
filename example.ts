
function foos(input){
  //@ts-ignore
             this.db.query(sql`SELECT * FROM table t WHERE t.id IS NOT NULL`)



  //@ts-ignore
  this.db.query(sql`SELECT * FROM table as "T" WHERE t.id IS NOT NULL`)



  //@ts-ignore
  this.db.query(sql`SELECT thing1, thing2, thing3, thing4 FROM table as "T" WHERE t.id IS NOT NULL`)



  //@ts-ignore
  this.db.query(sql`SELECT thing1, thing2, thing3, thing4, thing5, thing6, thing7, thing8, thing9 FROM table as "T" WHERE t.id IS NOT NULL`)



  //@ts-ignore
  this.db.query(sql`SELECT thing1, thing2, thing3 FROM table as t JOIN second_table st ON st.id = t.st_id AND st.val = t.val AND st.nother_val = t.another_val WHERE t.id IS NOT NULL`)
}
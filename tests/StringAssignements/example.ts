
function foo(input){
  //@ts-ignore
  this.db.query(sql`SELECT * FROM table as "T" WHERE t.id IS NOT NULL`)
}

function foos(input){
  //@ts-ignore
  this.db.query(sql`SELECT * FROM table t WHERE t.id IS NOT NULL`)
}
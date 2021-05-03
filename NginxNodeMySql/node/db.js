async function connect(){

    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
 
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:root@db:3306/db_people");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

async function selectPeoples(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM people;');
    return rows;
}
	
async function insertPeople(people){
    const conn = await connect();
    const sql = 'INSERT INTO people(nome) VALUES (?);';
    const values = [people];
    return await conn.query(sql, values);
}
 
module.exports = {selectPeoples, insertPeople}

import { sql } from "./db.js";

//Criação da tabela para armazenamento dos registros
sql`
CREATE TABLE videos (
    id TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    duration INTEGER
`.then(() => 
    console.log("Tabela Criada!")
)

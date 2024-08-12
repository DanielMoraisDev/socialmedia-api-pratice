import conn from "../config/conn.js"

export const table_mysql = 'usuarios'

const tableUsuarios = /*sql*/ `
    CREATE TABLE IF NOT EXISTS ${table_mysql} (
        usuario_id VARCHAR(50) PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        bio VARCHAR(255),
        profile_picture VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`

conn.query(tableUsuarios, (err) => {
    if (err) {
        console.error(err)
        return
    }

    console.log(`[usuarios] Tabela criada`)
})
import bcrypt from "bcrypt"
import { v4 } from "uuid";

import conn from "../config/conn.js";
import createUserToken from "../helpers/create-user-token.js";

export const signup = (req, res) => {
    const { nome, senha, email } = req.body

    const checkEmailSql = /*sql*/ `
        SELECT * FROM usuarios
        WHERE email = '${email}'
    `

    conn.query(checkEmailSql, async (err, data) => {
        if (err) {
            res.status(500).json({
                message: "Não foi possivel buscar o usuário, error: " + err
            })
            return
        }

        if (data > 0) {
            res.status(500).json({
                message: "Email já está em uso" + err
            })
            return
        }

        const salt = await bcrypt.genSalt(12)
        const senhaHash = await bcrypt.hash(senha, salt)

        const id = v4()

        const insertSql = /*sql*/ `
            INSERT INTO usuarios 
            (usuario_id, username, email, password_hash)
            VALUES
            (?, ?, ?, ?)
        `

        conn.query(insertSql, [id, nome, email, senhaHash], (err, data) => {
            if (err) {
                res.status(500).json({
                    message: "Erro ao cadastrar o usuario, error: " + err
                })
                return
            }

            const usuarioSql = /*sql*/ `
                SELECT * FROM usuarios
                WHERE usuario_id = ?
            `

            conn.query(usuarioSql, [id], async (err, data) => {
                if (err) {
                    res.status(500).json({
                        message: "Erro ao selecionar usuário, error" + err
                    })
                    return
                }

                const usuario = data[0]

                try {
                    await createUserToken(usuario, req, res)
                } catch (error) {
                    console.log(error)
                }
            })
        })
    })
}

export const login = (req, res) => {
    const { email, senha } = req.body

    if (!email) {
        res.status(400).json({ message: "O email é obrigatorio!" });
    }

    if (!senha) {
        res.status(400).json({ message: "A senha é obrigatoria!" });
    }

    const checkSql = /*sql*/ `
        SELECT * FROM usuarios 
        WHERE email = ?
    `

    conn.query(checkSql, [email], async (err, data) => {
        if (err) {
            res.status(500).json({
                message: "Não foi possivel buscar usuário, error: " + err
            })
        }

        if (data.length == 0) {
            res.status(500).json({
                message: "Usuário não encontrado"
            })
        }

        const usuario = data[0]        

        const compararSenha = await bcrypt.compare(senha, usuario.password_hash)

        if (!compararSenha) {
            return res.status(401).json({ message: "Senha inválida" })
          }
      
          try {
            await createUserToken(usuario, req, res)
          } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Erro ao comparar informação" })
          }
    })
}
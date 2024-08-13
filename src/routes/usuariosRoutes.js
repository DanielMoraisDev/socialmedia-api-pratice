import { Router } from "express";

import { signup, login, verifyTokenJWT } from "../controllers/usuariosControllers.js";
import { validarUsuario } from "../helpers/validar-user.js";
import { authenticateToken } from "../helpers/authentication-token.js";

const router = Router()

router.post("/signup", validarUsuario, signup)
router.post("/login", login)
router.get("/testando", authenticateToken, verifyTokenJWT)

export default router
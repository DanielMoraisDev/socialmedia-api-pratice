import "dotenv/config"

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.send(err);
    req.user = decoded;
    next();
  });
};

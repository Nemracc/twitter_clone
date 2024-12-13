// Middleware 1
const { pool } = require("../database/conexion");
const jwt = require("jsonwebtoken");

const validarToken = async (req, res, next) => {
  // console.log("validarToken", req.headers.authorization);
  const claveSecreta = "IS3"; // Clave secreta para firmar el token
  const token = req.headers.authorization;

  if (await validateJWT(token, claveSecreta)) {
    // Token válido, pasa al siguiente middleware o controlador
    next();
  } else {
    // Token inválido o no proporcionado
    res.status(401).json({ mensaje: "Token inválido o no proporcionado" });
    // res.redirect("/");
  }
};

async function validateJWT(token, secretKey) {
  try {
    // Verificar y decodificar el token
    const decodedToken = jwt.verify(token, secretKey);
    // console.log("tokeen decodificado ", decodedToken);
    // // Validar la caducidad del token
    // if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
    //   throw new Error("El token ha expirado");
    // }
    // console.log("Existe  token en db?", await existeTokenDB(token));
    const resToken = await existeTokenDB(token);
    // console.log("Res token", resToken);
    if (resToken == false) {
      return false;
    } else {
      // console.log("El token por algun motivo gua'u existe");
    }

    // Si llegamos hasta aquí, el token es válido
    return true;
  } catch (error) {
    console.error("Error de validación del token:", error.message);
    return false;
  }
}

const existeTokenDB = async (user_token) => {
  const query = `
  select *
  from  users a
  WHERE user_token =  $1;`;
  const values = [user_token]; // Valores de actualización y condición WHERE
  const result = await pool.query(query, values);
  if (result.rowCount > 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  validarToken,
};

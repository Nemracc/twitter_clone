const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../database/conexion");

const loginController = async (req, res) => {
  // console.log("Req", req.body);
  const usuario = await recuperarUsuario(req.body.user_account);
  if (usuario.length > 0) {
    const storedHash = usuario[0].user_password;
    const password = req.body.user_password;

    bcrypt.compare(password, storedHash, async function (err, result) {
      if (err) {
        console.log("errors", err);
      } else if (result) {
        // La contraseña coincide
        //generar token y enviar al front para guardar al local storge
        const token = await generarToken(usuario[0]);
        if (token) {
          res.header("authorization", token).json({
            message: "Usuario autenticado",
            token: token,
          });
        } else {
          res.status(404).send({ message: "No se pudo generar  el token" });
        }
      } else {
        // La contraseña no coincide
        console.log("La contraseña es incorrecta");
        res.status(404).send({ message: "La contraseña es incorrecta" });
      }
    });

    // res.send({ mensaje: "guardado con exito" });
  } else {
    res.status(404).send({ message: "el usuario  ingresado no existe" });
  }

  //   res.send({ mensaje: "guardado con exito" });
};

const logoutController = async (req, res) => {
  const claveSecreta = "IS3"; // Clave secreta para firmar el token
  const token = req.headers.authorization;
  const usuario = {
    user_id: "",
    user_name: "",
    user_account: "",
    user_avatar: "",
    user_verified: "",
  };

  jwt.verify(token, claveSecreta, (error, decoded) => {
    if (error) {
      // El token no es válido
      console.log("Error al decodificar el token:", error.message);
      res.status(404).json({ mensaje: "Error, el token no se pudo verificar" });
    } else {
      // El token es válido
      // console.log("Token decodificado:", decoded);
      usuario.user_id = decoded.user_id;
      usuario.user_name = decoded.user_name;
      usuario.user_account = decoded.user_account;
      usuario.user_avatar = decoded.user_avatar;
      usuario.user_verified = decoded.user_verified;

      // res.status(200).json(usuario);usuario
    }
  });
  try {
    const query = `
  UPDATE public.users
  SET user_token = null
  WHERE user_account = $1;`;
    const values = [usuario.user_account]; // Valores de actualización y condición WHERE
    const result = await pool.query(query, values);

    res.status(200).json({ message: "exito al cerrar la sesion", result });
  } catch (error) {
    console.log("error:", error);
    return null;
  }
};

async function encriptarPassword() {
  const users = await pool.query(`
          select *
          from  users a
          order by a.user_id asc`);

  users.rows.forEach(async (user) => {
    const password = "123456";
    const user_id = user.user_id;
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        // Manejar el error
        console.log("Error al crear la encriptacion");
      } else {
        const query = `
          UPDATE public.users
          SET user_password = $1
          where user_id = $2;`;
        const values = [hash, user_id];
        const result = await pool.query(query, values);

        console.log("Resultado de la encriptacion", hash);
      }
    });
  });
}

const recuperarUsuario = async (user_account) => {
  const query = `
    select user_id, user_name, user_account, user_avatar, user_verified, user_password
    from  users a
    WHERE user_account =  $1;`;
  const values = [user_account]; // Valores de actualización y condición WHERE
  const result = await pool.query(query, values);

  return result.rows;
};

async function generarToken(usuario) {
  const claveSecreta = "IS3"; // Clave secreta para firmar el token
  const token = jwt.sign(usuario, claveSecreta);
  try {
    const query = `
  UPDATE public.users
  SET user_token = $1
  WHERE user_account = $2;`;
    const values = [token, usuario.user_account]; // Valores de actualización y condición WHERE
    const result = await pool.query(query, values);

    return token;
  } catch (error) {
    console.log("error:", error);
    return null;
  }
}

async function eliminarToken(usuario) {
  const claveSecreta = "IS3"; // Clave secreta para firmar el token
  const token = jwt.sign(usuario, claveSecreta);
  try {
    const query = `
  UPDATE public.users
  SET user_token = null
  WHERE user_account = $1;`;
    const values = [usuario.user_account]; // Valores de actualización y condición WHERE
    const result = await pool.query(query, values);

    return token;
  } catch (error) {
    console.log("error:", error);
    return null;
  }
}

const decodeToken = async (req, res) => {
  const claveSecreta = "IS3"; // Clave secreta para firmar el token
  const token = req.headers.authorization;
  // console.log("header", token);

  //
  jwt.verify(token, claveSecreta, (error, decoded) => {
    if (error) {
      // El token no es válido
      console.log("Error al decodificar el token:", error.message);
      res.status(404).json({ mensaje: "Error, el token no se pudo verificar" });
    } else {
      // El token es válido
      // console.log("Token decodificado:", decoded);
      const usuario = {
        user_id: decoded.user_id,
        user_name: decoded.user_name,
        user_account: decoded.user_account,
        user_avatar: decoded.user_avatar,
        user_verified: decoded.user_verified,
      };
      res.status(200).json(usuario);
    }
  });
};

module.exports = {
  loginController,
  logoutController,
  decodeToken,
};

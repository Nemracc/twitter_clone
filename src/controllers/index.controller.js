const { pool } = require("../database/conexion");
const jwt = require("jsonwebtoken");

const gettweets = async (req, res) => {
  const token = req.headers.authorization;
  const usuario = await decodeToken(token);

  // console.log("Usuario  enget tweets", usuario);
  //Este user id seria el del usuario  logueado
  //para recuperar la interaccion de ese  usuario con los tweets
  //en el caso de que le haya  dado like o retweet para pintar en rojo
  // const user_id = req.params.user_id;
  const tweets = await pool.query(
    `SELECT a.user_id, a.user_name, a.user_account, a.user_verified,
      b.tweet_id, b.tweet_text, b.tweet_img_url, ('/images/' || a.user_avatar)  as user_avatar,
      SUM(CASE WHEN c.ut_liked = true THEN 1 ELSE 0 END) AS count_liked,
      SUM(CASE WHEN c.ut_retweeted = true THEN 1 ELSE 0 END) AS count_retweeted,
	    coalesce(d.ut_liked, false) as ut_liked,
	    coalesce(d.ut_retweeted, false) as ut_retweeted
    FROM users a
    INNER JOIN tweets b ON a.user_id = b.user_id
    LEFT JOIN user_tweets c ON b.tweet_id = c.tweet_id
    left  join user_tweets d on d.tweet_id = c.tweet_id and d.user_id  = $1
    GROUP BY a.user_id, a.user_name, a.user_account, a.user_verified,
    b.tweet_id, b.tweet_text, b.tweet_img_url, a.user_avatar
    ,d.ut_liked, d.ut_retweeted
    ORDER BY b.tweet_id desc LIMIT 10;`,
    [usuario.user_id]
  );
  // console.log("Tweets", tweets.rows);
  // Enviar los tweets como respuesta en formato JSON
  res.json(tweets.rows);
};

const getUsers = async (req, res) => {
  const users = await pool.query(`
		select *
		from  users a
		order by a.user_id asc`);

  // Enviar los tweets como respuesta en formato JSON
  res.status(200).json(users.rows);
};

const getUsersById = async (req, res) => {
  const user_id = req.params.user_id;

  if (user_id && user_id != undefined) {
    // console.log("Id  del usuario getuserbyid:", user_id);
    const query = `
    select *
    from  users a
    WHERE user_id =  $1;`;
    const values = [user_id]; // Valores de actualización y condición WHERE
    const result = await pool.query(query, values);
    // Enviar los tweets como respuesta en formato JSON
    res.status(200).json(result.rows);
  } else {
    console.log("user id no es numerico");
    res.status(404).json({ mensaje: "Error parametro enviado undefined" });
  }
};

const postTweet = async (req, res) => {
  //user = decodif
  const token = req.headers.authorization;
  const newTweet = req.body;
  //entidad tweet
  const tweet = {
    tweet_text: newTweet.tweet_text,
    tweet_img_url: newTweet.tweet_img_url,
  };
  //entidad user_tweet
  // console.log("debug", decodeToken(token));
  const user_tweet = await decodeToken(token);
  // console.log("token codigfificasdadsfds", token);
  // console.log("Usuario decodificado dec", user_tweet);

  if (tieneError(tweet, user_tweet)) {
    return res.status(400).json({ error: "Bad Request" });
  }

  //TO DO: Crear varaible para el await y controlar
  const respuesta = await addTweet(tweet, user_tweet);
  if (respuesta.rowCount > 0) {
    res.status(201).json({ message: "Nuevo tweet creado!" });
  } else {
    return res.status(400).json({ error: "Bad Request" });
  }
};

const updateLiked = async (req, res) => {
  const token = req.headers.authorization;
  const user_tweet = await decodeToken(token);
  const tweet_id = req.params.tweet_id;
  const user_id_actual = user_tweet.user_id;

  //Si existe  user_tweet (Realcion tweet - usuarui)
  //Actualzar  campo liked =  !liked
  //Si no existe todavia relacion, craeamos un  registro usert_tweet
  //con la relacion el usuario que pulso click  y el id del tweet
  //e inicializamos el liked en true
  try {
    //TO DO: Crear varaible para el await y controlar
    //TO DO: controlar los valores devueltos por el front que no vuelvan null o 0
    if (await ExisteUserTweet(tweet_id, user_id_actual)) {
      const query = `
      UPDATE public.user_tweets
      SET ut_liked = not ut_liked
      WHERE tweet_id =  $1 and user_id = $2 RETURNING tweet_id;`;
      const values = [tweet_id, user_id_actual]; // Valores de actualización y condición WHERE
      const result = await pool.query(query, values);

      // console.log("Registro actualizado exitosamente", result);
      return res.status(201).json(result);
    } else {
      const query = `
      INSERT INTO public.user_tweets(
        tweet_id, user_id, ut_liked)
        VALUES ($1, $2, $3) RETURNING tweet_id;`;
      const values = [tweet_id, user_id_actual, true]; // Valores de actualización y condición WHERE
      const result = await pool.query(query, values);

      // console.log("Registro actualizado exitosamente", result);
      return res.status(201).json(result);
    }
  } catch (error) {
    return res.status(400).json({ mensaje: "Bad Request", error });
  }
};

const updateRetweet = async (req, res) => {
  const token = req.headers.authorization;
  const user_tweet = await decodeToken(token);
  const tweet_id = req.params.tweet_id;
  const user_id_actual = user_tweet.user_id;

  //Si existe  user_tweet (Realcion tweet - usuarui)
  //Actualzar  campo ut_retweeted =  !ut_retweeted
  //Si no existe todavia relacion, craeamos un  registro usert_tweet
  //con la relacion el usuario que pulso click  y el id del tweet
  //e inicializamos el ut_retweeted en true
  try {
    //TO DO: Crear varaible para el await y controlar
    //TO DO: controlar los valores devueltos por el front que no vuelvan null o 0
    if (await ExisteUserTweet(tweet_id, user_id_actual)) {
      const query = `
      UPDATE public.user_tweets
      SET ut_retweeted = not ut_retweeted
      WHERE tweet_id =  $1 and user_id = $2;`;
      const values = [tweet_id, user_id_actual]; // Valores de actualización y condición WHERE
      const result = await pool.query(query, values);

      // console.log("Registro actualizado exitosamente", result);
      return res.status(201).json(result);
    } else {
      const query = `
      INSERT INTO public.user_tweets(
        tweet_id, user_id, ut_retweeted)
        VALUES ($1, $2, $3);`;
      const values = [tweet_id, user_id_actual, true]; // Valores de actualización y condición WHERE
      const result = await pool.query(query, values);
      // console.log("Registro actualizado exitosamente", result);
      return res.status(201).json(result);
    }
  } catch (error) {
    return res.status(400).json({ mensaje: "Bad Request", error });
  }
};

function tieneError(tweet) {
  if (!tweet.tweet_text) {
    return true;
  }
}

async function ExisteUserTweet(tweet_id, user_id) {
  const query = `select EXISTS(select * from user_tweets where tweet_id = $1 and user_id = $2);`;
  const values = [tweet_id, user_id]; // Valores de actualización y condición WHERE
  const result = await pool.query(query, values);
  // console.log(result);
  return result.rows[0].exists;
}

async function addTweet(tweet, user_tweet) {
  // Conecta a la base de datos para manejar por transaccion
  const client = await pool.connect();
  try {
    await client.query("BEGIN"); // Inicia la transacción

    // Inserta los datos del tweet
    const strQueryTweet = `
    INSERT INTO public.tweets(
      tweet_text, tweet_img_url, user_id)
      VALUES ($1, $2, $3) RETURNING tweet_id;`;
    const values = [tweet.tweet_text, tweet.tweet_img_url, user_tweet.user_id];
    const respuesta = await client.query(strQueryTweet, values);
    //Recuperamos el id del tweeter guardado para  pasarle
    //al insert de usertweet
    const tweet_id = respuesta.rows[0].tweet_id;

    await client.query("COMMIT"); // Confirma la transacción
    return respuesta;
  } catch (error) {
    await client.query("ROLLBACK"); // Revierte la transacción en caso de error
    console.log("Rollback", error);
    throw new Error("Transacción fallida");
  } finally {
    client.release();
  }
}

// async function decodeToken(token) {
//   const claveSecreta = "IS3"; // Clave secreta para firmar el token
//   jwt.verify(token, claveSecreta, (error, decoded) => {
//     if (error) {
//       // El token no es válido
//       console.log("Error al decodificar el token:", error.message);
//       return false;
//     } else {
//       // El token es válido
//       // console.log("Token decodificado:", decoded);
//       const usuario = {
//         user_id: decoded.user_id,
//         user_name: decoded.user_name,
//         user_account: decoded.user_account,
//         user_avatar: decoded.user_avatar,
//         user_verified: decoded.user_verified,
//       };
//       console.log("usuario decodificado else:", usuario);
//       return usuario;
//     }
//   });
// }

async function decodeToken(token) {
  return new Promise((resolve, reject) => {
    const claveSecreta = "IS3"; // Clave secreta para firmar el token
    jwt.verify(token, claveSecreta, (error, decoded) => {
      if (error) {
        // El token no es válido
        console.log("Error al decodificar el token:", error.message);
        reject(error);
      } else {
        // El token es válido
        const usuario = {
          user_id: decoded.user_id,
          user_name: decoded.user_name,
          user_account: decoded.user_account,
          user_avatar: decoded.user_avatar,
          user_verified: decoded.user_verified,
        };
        // console.log("usuario decodificado else:", usuario);
        resolve(usuario);
      }
    });
  });
}

module.exports = {
  gettweets,
  postTweet,
  updateLiked,
  updateRetweet,
  getUsers,
  getUsersById,
};

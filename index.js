const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//Importar controlador de consultas BD
const {
  gettweets,
  postTweet,
  updateLiked,
  updateRetweet,
  getUsers,
  getUsersById,
} = require("./src/controllers/index.controller");
// importar controlador de login
const {
  loginController,
  logoutController,
  decodeToken,
} = require("./src/controllers/login.controller");

//Middelwares
const { validarToken } = require("./src/controllers/Middlewares");
// Configura Express para la carpeta "public"
app.use(express.static("public"));
app.use(express.json());

// Petición GET para los tweets
app.get("/tweets", validarToken, gettweets);
// app.get("/tweets/:user_id", gettweets);

// Petición GET para los usuarios
app.get("/users", validarToken, getUsers);

// Petición GET users  by id
app.get(`/users/:user_id`, validarToken, getUsersById);

// Petición POST tweet
app.post("/addTweet", validarToken, postTweet);

//peticion login
//La funcion (metodo http) entonces puede recibir
//varias funciones como parametros y en todas las funciones
// app.post("/login", validarToken, loginController);
app.post("/login", loginController);

//peticion LogOut
app.post("/logout", validarToken, logoutController);

//peticion decode token
app.post("/decode_token", validarToken, decodeToken);

// Petición PUT para liked
app.put(`/tweets/liked/:tweet_id`, validarToken, updateLiked);

// Petición PUT para retweetear
app.put(`/tweets/retweeted/:tweet_id`, validarToken, updateRetweet);

//Socket io
io.on("connection", (socket) => {
  console.log("Un usuario conectado");

  socket.on("tweet_created", (data, callback) => {
    // Envía una confirmación al cliente
    callback({ success: true, message: "Tweet creado exitosamente" });
    io.emit("tweet_created", data);
  });
});

// Inicia el servidor nuevo comentario
// app.listen(3000, () => {
//   console.log("Servidor puerto 3000");
// });
server.listen(3000, () => {
  console.log("Servidor puerto 3000");
});

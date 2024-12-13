// import { mensajeOk, mensajeWarning, mensajeError } from "./msg";

var socket = io();
console.log(socket);

socket.on("tweet_created", (_data) => {
  console.log("Emit recibido  desde el back");
  mensajeOk("Nuevo tweet creado");

  setTimeout(function () {
    const mensaje = document.querySelector("#mensaje");
    if (mensaje != null) {
      document.querySelector("#mensaje").remove();
    }
  }, 2000);
  return;
});

document.addEventListener("DOMContentLoaded", (event) => {
  // document.getElementById("id01").style.display = "block";
  let spinner = document.querySelector(".spinner_contenedor");
  spinner.style.display = "flex"; // Mostrar el spinner al iniciar la carga de la página

  window.addEventListener("load", function () {
    setTimeout(function () {
      spinner.style.display = "none"; // Ocultar el spinner
    }, 1000); // Medio segundo (500 milisegundos)
    // generarEventosBotones();
  });
});

function listar(tw) {
  const twit = tw.reverse();
  // console.log("Al reves: ", twit);
  //Eliminar todos los post del feed
  let b = document.querySelectorAll(".post");
  for (let i = 0; i < b.length; i++) {
    b[i].remove();
  }

  twit.forEach(async (tweet, index) => {
    //recupera el listado de usuario
    await createPost(tweet);

    if (index === twit.length - 1) {
      generarEventosBotones();
    }
  });
}

//Aca no esta funcionando el await cuando se recupera los usuarios
//y no respeta el orden de los tweets
async function createPost(twit) {
  // console.log("Create: ", twit);
  const id = twit.user_id;
  // const usuario = await fetch(`/users/${id}`);
  // const usu = await usuario.json();
  // console.log("User: ", usu);

  try {
    const post__avatar = document.createElement("div");
    post__avatar.innerHTML = `<img src="./images/${twit.user_avatar}" alt="" />`;
    post__avatar.className = "post__avatar";

    const post__headerText = document.createElement("div");
    post__headerText.innerHTML = `<h3>${twit.user_name}<span class="post__headerSpecial"><span class="material-icons post__badge"> verified </span>${twit.user_account}</span></h3>`;
    post__headerText.className = "post__headerText";
    const headerDescri = document.createElement("div");
    headerDescri.innerHTML = `<p>${twit.tweet_text}</p>`;
    headerDescri.className = "post__headerDescription";
    const post__header = document.createElement("div");
    post__header.className = "post__header";
    post__header.appendChild(post__headerText);
    post__header.appendChild(headerDescri);

    const im = document.createElement("img");
    if (twit.tweet_img_url) {
      im.src = twit.tweet_img_url;
      im.alt = "Imagen del tweet nro:" + twit.tweet_id;
    }

    // const info = document.createElement("div");
    // info.className = "info";
    // info.innerHTML = `<span>${twit.ut_retweeted}</span><span>${twit.ut_retweeted}</span>`;

    const post__footer = document.createElement("div");
    post__footer.className = "post__footer";
    post__footer.innerHTML = `<span class="material-icons" ${
      twit.ut_retweeted ? 'style="color:red"' : ""
    } name="retweet"> repeat </span>
    <span class="material-icons" name="liked" ${
      twit.ut_liked ? 'style="color:red"' : ""
    }> favorite_border </span>
    <span class="material-icons"> publish </span>`;

    const conta = document.createElement("div");
    conta.className = "conta";
    conta.innerHTML = `<span>${twit.count_retweeted}</span><span>${twit.count_liked}</span><span>  </span>`;

    const post__body = document.createElement("div");
    post__body.className = "post__body";
    post__body.appendChild(post__header);
    if (twit.tweet_img_url) {
      post__body.appendChild(im);
    }
    // post__body.appendChild(info); //hora fecha
    post__body.appendChild(post__footer);
    post__body.appendChild(conta);

    const post = document.createElement("div");
    post.className = "post";
    post.id = twit.tweet_id;
    post.appendChild(post__avatar);
    post.appendChild(post__body);

    const padre = document.querySelector(".feed");
    padre.appendChild(post);

    return 1;
  } catch (error) {
    console.log("Error:", error);
  }
}

function loginn(event) {
  event.preventDefault();
  let log = document.querySelector("#login");
  if (log.innerText === "Login") {
    document.getElementById("id01").style.display = "block";
  } else {
    log.innerHTML = "Login";
    log.style.backgroundColor = "#50b7f5";
    let varia = document.querySelector("#imag");
    varia.src =
      "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png";
    varia.alt = "";
    document.getElementById("id01").style.display = "block";
  }
}

function ingreurl(event) {
  const ele = document.querySelector("#urlinput");
  // console.log(ele);
  ele.classList.toggle("urlinput");
}

function capturar() {
  const alt = document.querySelector("#imag").alt;
  const id_usuario = Number(alt);
  const texto = document.querySelector("#text").value;
  const tiempo = new Date();
  const hora = tiempo.toLocaleTimeString();
  const fecha = tiempo.toLocaleDateString("en-ZA");
  const imagen = document.querySelector("#url").value;
  const fav = 0;
  const retwets = 0;
  return {
    user_id: id_usuario,
    tweet_text: texto,
    hora: hora,
    fecha: fecha,
    tweet_img_url: imagen,
    fav: fav,
    retwets: retwets,
  };
}

function start() {
  return {
    nombre: "",
    usuario: "",
    urlImagen: "",
    conta: "0/280",
    resultados: new Array(),
    resultado: false,
    usuarios: [],
    listaTweets: [],
    async init() {
      this.perfil();
      this.contador();
      await this.recuperarTweets();
      this.generarEventosBotones();
    },
    perfil() {
      const token = localStorage.getItem("token");
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", token);
      // Configurar opciones para la solicitud fetch
      const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(tweet),
      };

      fetch(`/decode_token`, options)
        .then((res) => {
          if (!res.ok) {
            mensajeError("Error en la solicitud: " + res.status);
            // throw new Error("Error en la solicitud: " + resp.status);
            setTimeout(function () {
              window.location.href = "/";
            }, 2000);
          }
          return res.json();
        })
        .then((data) => {
          // console.log("Inicio Usuarios", data);
          this.urlImagen = "/images/" + data.user_avatar;
          this.nombre = data.user_name;
          this.usuario = data.user_account;
        });
    },
    contador() {
      const elemento = document.querySelector("#text").value.length;
      // console.log(elemento);
      this.conta = `${elemento}/280`;
    },
    twit() {
      // e.preventDefault();
      //Eliminar mensaje de error si existe
      const mensaje = document.querySelector("#mensaje");
      if (mensaje != null) {
        document.querySelector("#mensaje").remove();
      }
      // let ima = document.querySelector("#imag");
      // if (ima.alt != "") {
      const elementos = capturar();
      const elementosJson = JSON.stringify(elementos);
      // console.log("Elementos", elementosJson);
      document.querySelector("#text").value = "";
      document.querySelector("#url").value = "";
      const token = localStorage.getItem("token");
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", token);

      fetch("/addTweet", {
        method: "POST",
        headers: headers,
        body: elementosJson,
      })
        .then((resp) => {
          if (!resp.ok) {
            mensajeError("Error en la solicitud: " + resp.status);
            throw new Error("Error en la solicitud: " + resp.status);
            //redireccionar
          }
          return resp.json();
        })
        .then((data) => {
          // socket.emit("tweet_created", data);
          socket.emit("tweet_created", data, (response) => {
            if (response.success) {
              console.log(response.message); // Confirmación exitosa del servidor
              // Realiza cualquier acción adicional en respuesta a la confirmación
            } else {
              console.error(response.message); // Error en la confirmación del servidor
              // Realiza cualquier acción adicional en respuesta al error
            }
          });

          this.actualizar();
        });
      // }
    },
    async recuperarTweets() {
      const token = localStorage.getItem("token");
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", token);
      // Configurar opciones para la solicitud fetch
      const options = {
        method: "GET",
        headers: headers,
      };

      try {
        const response = await fetch(`/tweets`, options);
        if (!response.ok) {
          mensajeError("Error en la solicitud: " + response.status);
          // throw new Error("Error en la solicitud: " + resp.status);
          setTimeout(function () {
            window.location.href = "/";
          }, 2000);
        }
        const data = await response.json();
        // console.log("Inicio Tweets", data);
        this.listaTweets = data;
        // Procesar los datos recuperados aquí
      } catch (error) {
        // Manejar errores en la recuperación de los tweets
      }
    },
    async actualizar() {
      let ele = document.querySelectorAll(".post");
      let spinner = document.querySelector(".spinner_contenedor");
      for (let i = 0; i < ele.length; i++) {
        ele[i].remove();
      }
      this.listaTweets = [];
      spinner.style.display = "flex";
      await this.recuperarTweets();
      setTimeout(function () {
        spinner.style.display = "none"; // Ocultar el spinner
      }, 1000);
      // this.buscar();
      this.generarEventosBotones();
    },
    buscar() {
      fetch(`/tweets`)
        .then((r) => r.json())
        .then((res) => {
          let b = document.querySelector("#buscar").value;
          if (b != "") {
            let borr = document.querySelectorAll(".result");
            for (let i = 0; i < borr.length; i++) {
              borr[i].remove();
            }
            for (let i = 0; i < res.length; i++) {
              let a = res[i].texto.search(b);
              if (a >= 0) {
                this.resultado = true;
                let s = document.createElement("div");
                s.setAttribute("x-text", `resultados[${i}]`);
                s.className = "result";
                let padre = document.querySelector("#res");
                padre.appendChild(s);
                this.resultados[i] = res[i].tweet_text;
              }
            }
          }
        });
    },
    logout() {
      const token = localStorage.getItem("token");
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", token);
      // Configurar opciones para la solicitud fetch
      const options = {
        method: "POST",
        headers: headers,
      };
      fetch(`/logout`, options)
        .then((res) => {
          if (!res.ok) {
            mensajeError("Error en la solicitud: " + res.status);
            // throw new Error("Error en la solicitud: " + resp.status);
            setTimeout(function () {
              localStorage.setItem("token", "");
              window.location.href = "/";
            }, 2000);
          }
          return res.json();
        })
        .then((data) => {
          localStorage.setItem("token", "");
          window.location.href = "/";
        });
    },
    generarEventosBotones() {
      console.log("generar evento");
      // Obtener todos los elementos con name="liked"
      const elementosLiked = document.querySelectorAll('[name="liked"]');
      // Obtener todos los elementos con name="liked"
      const elementosretweet = document.querySelectorAll('[name="retweet"]');
      // console.log("elementos", elementosLiked, elementosretweet);
      // Agregar evento a cada elemento liked
      elementosLiked.forEach((elemento) => {
        elemento.addEventListener("click", () => {
          // Buscar el elemento con la clase post en los elementos padre
          const postElemento = elemento.closest(".post");
          // Verificar si se encontró el elemento post
          if (postElemento) {
            const postId = postElemento.getAttribute("id");
            //actualziar liked
            this.updateLiked(postId);
            // console.log("liked:", postId);
            // elemento.classList.toggle("red-color");
          } else {
            console.log("No se encontró el elemento post");
          }
        });
      });

      // Agregar evento a cada elemento
      elementosretweet.forEach((elementoRT) => {
        elementoRT.addEventListener("click", () => {
          // Buscar el elemento con la clase post en los elementos padre
          const postElemento = elementoRT.closest(".post");

          // Verificar si se encontró el elemento post
          if (postElemento) {
            const postId = postElemento.getAttribute("id");
            const usuario_id = document.querySelector("#imag").alt;
            //actualziar retweet
            this.updateRetweet(postId, usuario_id);
            // console.log("Retweet:", postId, usuario_id);
            // elementoRT.classList.toggle("red-color");
          } else {
            console.log("No se encontró el elemento post");
          }
        });
      });
    },
    updateLiked(tweet_id) {
      // console.log(tweet_id);
      // console.log("Elemento likeado Uno", this.listaTweets[0].tweet_id);
      let indice = 0;
      this.listaTweets.forEach((elemento, i) => {
        if (elemento.tweet_id == tweet_id) {
          indice = i;
        }
      });
      if (this.listaTweets[indice].ut_liked) {
        this.listaTweets[indice].count_liked--;
        this.listaTweets[indice].ut_liked = false;
      } else {
        this.listaTweets[indice].count_liked++;
        this.listaTweets[indice].ut_liked = true;
      }

      // console.log("Elelemtno likeado", this.listaTweets[indice]);
      // const post = this.listaTweets.find(
      //   (elemento, index) => elemento.tweet_id == tweet_id
      // );
      // console.log("Elemento likeado", post);
      // console.log("Evento click liked", this.listaTweets);
      //Recuperar el listado de tweets find por tweet_id
      //recuperar el valor count de liked y a ese le sumo 1
      // Configurar opciones para la solicitud fetch
      const token = localStorage.getItem("token");
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", token);
      // Configurar opciones para la solicitud fetch
      const options = {
        method: "PUT",
        headers: headers,
      };
      //Guardar
      fetch(`/tweets/liked/${tweet_id}`, options)
        .then((response) => {
          if (!response.ok) {
            mensajeError("Error en la solicitud: " + response.status);
            // throw new Error("Error en la solicitud: " + resp.status);
            setTimeout(function () {
              window.location.href = "/";
            }, 2000);
          }

          // console.log("No hay error", tweet_id);
          response.json();
          // console.log("respuesta: ", response);
        })
        .then((result) => {})
        .catch((error) => {
          console.log("Error:", error);
        });
    },
    updateRetweet(tweet_id, user_id_actual) {
      // console.log(tweet_id);

      let indice = 0;
      this.listaTweets.forEach((elemento, i) => {
        if (elemento.tweet_id == tweet_id) {
          indice = i;
        }
      });
      if (this.listaTweets[indice].ut_retweeted) {
        this.listaTweets[indice].count_retweeted--;
        this.listaTweets[indice].ut_retweeted = false;
      } else {
        this.listaTweets[indice].count_retweeted++;
        this.listaTweets[indice].ut_retweeted = true;
      }
      // Configurar opciones para la solicitud fetch
      const token = localStorage.getItem("token");
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", token);
      // Configurar opciones para la solicitud fetch
      const options = {
        method: "PUT",
        headers: headers,
      };
      //Guardar
      fetch(`/tweets/retweeted/${tweet_id}`, options)
        .then((response) => {
          if (!response.ok) {
            mensajeError("Error en la solicitud: " + response.status);
            // throw new Error("Error en la solicitud: " + resp.status);
            setTimeout(function () {
              window.location.href = "/";
            }, 2000);
          }

          // console.log("No hay error", tweet_id);
          response.json();
          // console.log("respuesta: ", response);
        })
        .then((result) => {})
        .catch((error) => {
          console.log("Error:", error);
        });
    },
  };
}

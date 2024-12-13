function loginComponent() {
  return {
    usuario: {},
    async init() {
      // this.validarToken();
    },
    login(event) {
      validarUsuario();
    },
  };
}

const validarUsuario = async () => {
  //Eliminar mensaje de error si existe
  const mensaje = document.querySelector("#mensaje");
  if (mensaje != null) {
    document.querySelector("#mensaje").remove();
  }
  // Configurar opciones para la solicitud fetch
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(CargaEntidadUsuario()),
  };

  //Guardar
  fetch("/login", options)
    .then(async (response) => {
      if (!response.ok) {
        // mensajeError
        const data = await response.json();
        mensajeError(data.message);
        throw new Error(
          "Error en la solicitud: " + response.status + " - " + data.message
        );
      }
      const authorizationHeader = response.headers.get("authorization");
      // Guardar el valor de 'authorizationHeader' en el localStorage
      localStorage.setItem("token", authorizationHeader);
      // Verificar si el token se ha guardado correctamente
      if (localStorage.getItem("token") === authorizationHeader) {
        console.log(
          "El token se ha guardado correctamente en el localStorage",
          authorizationHeader
        );
        window.location.href = "/pages/main.html";
      } else {
        console.log("Hubo un problema al guardar el token en el localStorage");
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

function CargaEntidadUsuario() {
  user_account = document.getElementById("user_account").value;
  user_password = document.getElementById("user_password").value;
  usuario = {
    user_account,
    user_password,
  };
  console.log("usuario", usuario);
  return usuario;
}

const mensajeError = (msg) => {
  console.log(msg);
  const destino = document.querySelector("body");
  // const nuevoElemento = document.createElement("div");
  const mensaje = document.createElement("span");
  mensaje.innerHTML = `Error: ${msg}`;
  mensaje.style.background = "#EEE8F7";
  mensaje.style.border = "1px red solid";
  mensaje.style.color = "red";
  mensaje.style.position = "absolute";
  mensaje.style.top = "10px";
  mensaje.style.right = "20px";
  mensaje.style.zIndex = "1000";
  mensaje.id = "mensaje";
  destino.appendChild(mensaje);
};

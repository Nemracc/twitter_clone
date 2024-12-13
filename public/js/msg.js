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

const mensajeOk = (msg) => {
  console.log(msg);
  const destino = document.querySelector("body");
  // const nuevoElemento = document.createElement("div");
  const mensaje = document.createElement("span");
  mensaje.innerHTML = `${msg}`;
  mensaje.style.background = "#EEE8F7";
  mensaje.style.padding = "10px";
  mensaje.style.border = "1px green solid";
  mensaje.style.color = "green";
  mensaje.style.position = "absolute";
  mensaje.style.top = "10px";
  mensaje.style.right = "20px";
  mensaje.style.zIndex = "1000";
  mensaje.id = "mensaje";
  destino.appendChild(mensaje);
};

const mensajeWarning = (msg) => {
  console.log(msg);
  const destino = document.querySelector("body");
  // const nuevoElemento = document.createElement("div");
  const mensaje = document.createElement("span");
  mensaje.innerHTML = `Advertencia: ${msg}`;
  mensaje.style.background = "#EEE8F7";
  mensaje.style.border = "1px red solid";
  mensaje.style.color = "yellow";
  mensaje.style.position = "absolute";
  mensaje.style.top = "10px";
  mensaje.style.right = "20px";
  mensaje.style.zIndex = "1000";
  mensaje.id = "mensaje";
  destino.appendChild(mensaje);
};

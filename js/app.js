// Selectores
const criptomonedasSelect = document.querySelector("#criptomonedas");
const formulario = document.querySelector("#formulario");
const monedaSelect = document.querySelector("#moneda");
const resultado = document.querySelector("#resultado");

const objBusqueda = {
  moneda: "",
  criptomoneda: "",
};

window.onload = () => {
  consultarCriptoMoneda();
  formulario.addEventListener("submit", submitFormulario);
  criptomonedasSelect.addEventListener("change", handleSelect);
  monedaSelect.addEventListener("change", handleSelect);
};

function handleSelect(e) {
  e.preventDefault();
  objBusqueda[e.target.name] = e.target.value;
}

function submitFormulario(e) {
  e.preventDefault();
  const { moneda, criptomoneda } = objBusqueda;
  if (moneda === "" || criptomoneda === "") {
    imprimirAlerta("Ambos campos deben ser obligatorios");
    return;
  }
  // Consultar API
  consultarAP();
}
async function consultarAP() {
  const { moneda, criptomoneda } = objBusqueda;
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
  mostrarSpinner();
  //with fetch
  // fetch(url)
  //   .then((res) => res.json())
  //   .then((res) => imprimirConsulta(res.DISPLAY[criptomoneda][moneda]));

  //with try and catch
  try {
    const consulta = await fetch(url);
    const respuesta = await consulta.json();
    imprimirConsulta(respuesta.DISPLAY[criptomoneda][moneda]);
  } catch (err) {
    console.log(err);
  }
}

function imprimirConsulta(datos) {
  limpiarHTML();
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOURS, LASTUPDATE } = datos;
  const price = document.createElement("p");
  price.classList.add("precio");
  price.innerHTML = `El precio es: <span>${PRICE}`;

  const precioAlto = document.createElement("p");
  precioAlto.innerHTML = `<p> Precio más alto del día <span>${HIGHDAY}</span>`;
  const precioBajo = document.createElement("p");
  precioBajo.innerHTML = `<p> Precio más bajo del día <span>${LOWDAY}</span>`;
  const ultimasHoras = document.createElement("p");
  ultimasHoras.innerHTML = `<p>Variación en las últimas 24 horas: <span>${CHANGEPCT24HOURS}</span>`;
  const ultimaActualizacion = document.createElement("p");
  ultimaActualizacion.innerHTML = `<p> Última actualización: <span>${
    LASTUPDATE === "Just Now" ? "Justo ahora" : LASTUPDATE
  }</span>`;

  resultado.appendChild(price);
  resultado.appendChild(precioAlto);
  resultado.appendChild(precioBajo);
  resultado.appendChild(ultimaActualizacion);
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}
function imprimirAlerta(mensaje) {
  const alerta = document.querySelector(".error");
  if (!alerta) {
    const alertMsj = document.createElement("div");
    alertMsj.classList.add("error");
    alertMsj.textContent = mensaje;
    formulario.appendChild(alertMsj);

    setTimeout(function () {
      alertMsj.remove();
    }, 3000);
  }
}

const obtenerCriptoMonedas = (criptomonedas) =>
  new Promise((resolve) => {
    resolve(criptomonedas);
  });

async function consultarCriptoMoneda() {
  const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD`;
  // whith fetch
  // fetch(url)
  //   .then((response) => response.json())
  //   .then((response) => {
  //     return obtenerCriptoMonedas(response.Data);
  //   })
  //   .then((criptomonedas) => selectCriptomonedas(criptomonedas));

  //try and catch
  try {
    const consulta = await fetch(url);
    const respuesta = await consulta.json();
    const criptomonedas = await obtenerCriptoMonedas(respuesta.Data);
    selectCriptomonedas(criptomonedas);
  } catch (error) {
    console.log(error);
  }
}

function selectCriptomonedas(criptomonedas) {
  criptomonedas.forEach((cripto) => {
    const {
      CoinInfo: { FullName, Name },
    } = cripto;

    const option = document.createElement("option");
    option.value = Name;
    option.textContent = FullName;

    criptomonedasSelect.appendChild(option);
  });
}

function mostrarSpinner() {
  limpiarHTML();

  const spinner = document.createElement("div");
  spinner.classList.add("spinner");

  spinner.innerHTML = `
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  `;

  resultado.appendChild(spinner);
}

// Selectores
const criptomonedasSelect = document.querySelector("#criptomonedas");
const formulario = document.querySelector("#formulario");
const monedaSelect = document.querySelector("#moneda");

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

function consultarCriptoMoneda() {
  const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD`;
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      return obtenerCriptoMonedas(response.Data);
    })
    .then((criptomonedas) => selectCriptomonedas(criptomonedas));
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

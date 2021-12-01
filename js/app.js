// Selectores
const criptomonedasSelect = document.querySelector("#criptomonedas");

window.onload = () => {
  consultarCriptoMoneda();
};

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

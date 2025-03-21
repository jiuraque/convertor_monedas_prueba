const api = "https://mindicador.cl/api/";

const amountInput = document.getElementById("amount");
const currencySelect = document.getElementById("currency");
const convertButton = document.getElementById("convert");
const resultSpan = document.getElementById("result");

const chartCanvas = document.getElementById("chart");
let myChart = null;

// Capturar el valor del input

function handleInput() {
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        resultSpan.textContent = "Ingrese un monto válido"; 
        return;
    }
}

// Evento Boton
convertButton.addEventListener("click", handleInput);

// Funcion de obtencion de valores de la api miindicador.cl

const withFetch = () => {
    fetch(api)
    .then(res => res.json())
    .then(data => console.log(data))
}

withFetch();

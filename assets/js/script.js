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
        console.log("Ingrese un monto válido."); 
    } else {
        console.log("Monto ingresado en CLP:", amount); 
    }
}

// Evento Boton
convertButton.addEventListener("click", handleInput);



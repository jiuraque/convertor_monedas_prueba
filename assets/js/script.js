const api = "https://mindicador.cl/api/";

const amountInput = document.getElementById("amount");
const currencySelect = document.getElementById("currency");
const convertButton = document.getElementById("convert");
const resultSpan = document.getElementById("result");

const chartCanvas = document.getElementById("chart");
let myChart = null;

async function getExchangeRate(currency) {
    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error("Error al obtener los datos de la API");
        }
        const data = await response.json();


        if (currency === "dolar") return data.dolar.valor;
        if (currency === "euros") return data.euro.valor;
        if (currency === "pesos") return data["dolar"].valor * data["dolar_intercambio"].valor / data["euro"].valor;

        return null;
    } catch (error) {
        console.error("Error al obtener las tasas de cambio:", error);
        resultSpan.textContent = "Error al obtener datos.";
        return null;
    }
    
    console.log(getExchangeRate);
}






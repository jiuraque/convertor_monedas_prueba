const api = "https://mindicador.cl/api/";

// Variables
const amountInput = document.getElementById("amount");
const currencySelect = document.getElementById("currency");
const convertButton = document.getElementById("convert");
const resultSpan = document.getElementById("Resultado");

const chartCanvas = document.getElementById("Chart");
let myChart = null;

// Funcion para obtener tasas de cambio
async function getExchangeRate(currency) {
  try {
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error("Error al obtener los datos de la API");
    }
    const data = await response.json();

    if (currency === "dolar") return data.dolar.valor;
    if (currency === "euro") return data.euro.valor;

    return null;
  } catch (error) {
    console.error("Error al obtener las tasas de cambio:", error);
    resultSpan.textContent = "Error al obtener datos.";
    return null;
  }
}

// Funcion para realizar la conversión
async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const selectedCurrency = currencySelect.value;

  if (isNaN(amount) || amount <= 0) {
    resultSpan.textContent = "Ingrese un monto válido.";
    return;
  }

  const exchangeRate = await getExchangeRate(selectedCurrency);
  if (exchangeRate) {
    const convertedAmount = (amount / exchangeRate).toFixed(2);
    resultSpan.textContent = convertedAmount;
    updateChart(selectedCurrency);
  }
}

// Funcion para obtener datos históricos para el gráfico
async function getHistoricalData(currency) {
  try {
    const response = await fetch(`https://mindicador.cl/api/${currency}`);
    if (!response.ok) throw new Error("Error al obtener datos de la API");

    const data = await response.json();

    const last10Days = data.serie.slice(0, 10).reverse(); 

    const labels = last10Days.map((item) =>
      new Date(item.fecha).toLocaleDateString("es-CL")
    );
    const values = last10Days.map((item) => item.valor);

    return { labels, values };
  } catch (error) {
    console.error("Error obteniendo datos históricos:", error);
    return { labels: [], values: [] };
  }
}

// Funcion para actualizar el grafico
async function updateChart(currency) {
  const { labels, values } = await getHistoricalData(currency);
  const chartCanvas = document.getElementById("Chart");

  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(chartCanvas, {
    type: "line",
    data: {
        labels: labels, 
        datasets: [{
            label: `Historial últimos 10 días (${currency.toUpperCase()})`,
            data: values, 
            borderColor: "blue",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderWidth: 2
        }]
    },
    options: {
        responsive: true, 
        maintainAspectRatio: false, 
        plugins: {
            legend: {
                labels: {
                    color: "#000000"
                }
            }
        },
        scales: {
            x: {
                ticks: { color: "#000000" },
                grid: { color: "#d3d3d3" }
            },
            y: {
                ticks: { color: "#000000" },
                grid: { color: "#d3d3d3" }
            }
        }
    }
});
}

document.getElementById("currency").addEventListener("change", function () {
  const selectedCurrency = this.value === "dolar" ? "dolar" : "euro";
  updateChart(selectedCurrency);
});

updateChart("dolar");

// Evento Boton
convertButton.addEventListener("click", convertCurrency);

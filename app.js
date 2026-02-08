const priceElement = document.getElementById("price");

// API pública (simples e confiável)
const API_URL = "https://api.coindesk.com/v1/bpi/currentprice/BTC.json";

// Buscar preço do BTC
async function fetchBTCPrice() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const priceUSD = data.bpi.USD.rate_float;

    updatePrice(priceUSD);
  } catch (error) {
    priceElement.textContent = "Erro ao carregar preço";
    console.error("Erro ao buscar preço:", error);
  }
}

// Atualiza o preço na tela
function updatePrice(price) {
  priceElement.textContent = `BTC: $${price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

// Atualiza a cada 30 segundos
fetchBTCPrice();
setInterval(fetchBTCPrice, 30000);

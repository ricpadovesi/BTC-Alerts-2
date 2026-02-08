https priceElement = document.getElementById("price");

// API pública (simples e confiável)
const API_URL = "fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,brl")";

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

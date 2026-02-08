const STATUS = document.getElementById("status");

async function buscarBTC() {
  try {
    STATUS.textContent = "Atualizando preços...";

    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,brl"
    );

    if (!res.ok) throw new Error("Falha na API");

    const data = await res.json();

    document.getElementById("btc-usd").textContent =
      "$ " + data.bitcoin.usd.toLocaleString("en-US");

    document.getElementById("btc-brl").textContent =
      "R$ " + data.bitcoin.brl.toLocaleString("pt-BR");

    STATUS.textContent = "Última atualização: " + new Date().toLocaleTimeString();

  } catch (err) {
    console.error(err);
    STATUS.textContent = "Erro ao buscar preço do BTC";
  }
}

// primeira execução
buscarBTC();

// atualização automática a cada 30s
setInterval(buscarBTC, 30000);

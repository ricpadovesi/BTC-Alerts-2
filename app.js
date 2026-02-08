const STATUS = document.getElementById("status");
const ALERT_STATUS = document.getElementById("alert-status");

let alertaUSD = localStorage.getItem("alertaUSD");

if (alertaUSD) {
  ALERT_STATUS.textContent = "Alerta salvo: USD " + alertaUSD;
}

async function pedirPermissaoNotificacao() {
  if ("Notification" in window && Notification.permission !== "granted") {
    await Notification.requestPermission();
  }
}

function salvarAlerta() {
  const valor = document.getElementById("alert-price").value;

  if (!valor) return;

  alertaUSD = Number(valor);
  localStorage.setItem("alertaUSD", alertaUSD);

  ALERT_STATUS.textContent = "Alerta salvo: USD " + alertaUSD;

  pedirPermissaoNotificacao();
}

async function buscarBTC() {
  try {
    STATUS.textContent = "Atualizando preços...";

    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,brl"
    );

    if (!res.ok) throw new Error("Erro API");

    const data = await res.json();

    const usd = data.bitcoin.usd;
    const brl = data.bitcoin.brl;

    document.getElementById("btc-usd").textContent =
      "$ " + usd.toLocaleString("en-US");

    document.getElementById("btc-brl").textContent =
      "R$ " + brl.toLocaleString("pt-BR");

    STATUS.textContent = "Atualizado às " + new Date().toLocaleTimeString();

    // 🔔 ALERTA
    if (alertaUSD && usd >= alertaUSD) {
      dispararNotificacao(usd);
      localStorage.removeItem("alertaUSD");
      alertaUSD = null;
      ALERT_STATUS.textContent = "Alerta disparado ✅";
    }

  } catch (e) {
    console.error(e);
    STATUS.textContent = "Erro ao buscar preço";
  }
}

function dispararNotificacao(preco) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("🚨 BTC Alert", {
      body: "Bitcoin atingiu USD " + preco.toLocaleString(),
    });
  }
}

// primeira execução
buscarBTC();

// loop automático
setInterval(buscarBTC, 30000);

import '../styles/main.css';
import '../styles/crypto.css';

let isCryptoToCurrency = true;

const amountInput = document.getElementById("amount");
const resultInput = document.getElementById("result");
const cryptoSelect = document.getElementById("cryptoSelect");
const currencySelect = document.getElementById("currencySelect");
const swapBtn = document.getElementById("swapBtn");
const form = document.getElementById("cryptoForm");

const cryptoOptions = [
  { value: "bitcoin", text: "BTC" },
  { value: "ethereum", text: "ETH" },
  { value: "tether", text: "USDT" },
  { value: "solana", text: "SOL" },
  { value: "dogecoin", text: "DOGE" },
  { value: "the-open-network", text: "TON" }
];

const currencyOptions = [
  { value: "usd", text: "USD" },
  { value: "eur", text: "EUR" },
  { value: "rub", text: "RUB" }
];

function initSelects() {
  fillSelect(cryptoSelect, cryptoOptions);
  fillSelect(currencySelect, currencyOptions);
  resultInput.value = "";
  resultInput.placeholder = "Результат";
}
initSelects();

function fillSelect(selectElement, options) {
  selectElement.innerHTML = "";
  options.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt.value;
    option.text = opt.text;
    selectElement.appendChild(option);
  });
}

async function convert() {
  const amount = parseFloat(amountInput.value);

  if (!amount || amount <= 0) {
    resultInput.value = "";
    resultInput.placeholder = "Сумма некорректна";
    return;
  }


  let coinId;
  let fiatCode;

  if (isCryptoToCurrency) {
    coinId = cryptoSelect.value;
    fiatCode = currencySelect.value;
  } else {
    coinId = currencySelect.value;
    fiatCode = cryptoSelect.value;
  }

  resultInput.value = "";
  resultInput.placeholder = "Загрузка...";

  try {
    const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(coinId)}&vs_currencies=${encodeURIComponent(fiatCode)}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      resultInput.value = "";
      resultInput.placeholder = "Ошибка сети";
      return;
    }

    const data = await response.json();
    const price = Number(data[coinId][fiatCode]);
      
    let resultValue;
    if (isCryptoToCurrency) {
    resultValue = (amount * price).toFixed(1);
    } else {
    resultValue = (amount / price).toFixed(6);
    }
    resultInput.value = resultValue;
    resultInput.placeholder = "Результат";

  } catch (err) {
    console.error(err);
    resultInput.value = "";
    resultInput.placeholder = "Попробуйте позже";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  convert();
});

swapBtn.addEventListener("click", () => {
  isCryptoToCurrency = !isCryptoToCurrency;

  if (isCryptoToCurrency) {
    fillSelect(cryptoSelect, cryptoOptions);
    fillSelect(currencySelect, currencyOptions);
  } else {
    fillSelect(cryptoSelect, currencyOptions);
    fillSelect(currencySelect, cryptoOptions);
  }

  const tempVal = amountInput.value;
  amountInput.value = resultInput.value;
  resultInput.value = tempVal;

  if (amountInput.value) {
    convert();
  } else {
    resultInput.value = "";
    resultInput.placeholder = "Результат";
  }
});

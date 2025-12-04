import { useState } from "react";
import "../styles/crypto.css";
import "../styles/style.css";

interface Option {
  value: string;
  text: string;
}

const cryptoOptions: Option[] = [
  { value: "bitcoin", text: "BTC" },
  { value: "ethereum", text: "ETH" },
  { value: "tether", text: "USDT" },
  { value: "solana", text: "SOL" },
  { value: "dogecoin", text: "DOGE" },
  { value: "the-open-network", text: "TON" }
];

const currencyOptions: Option[] = [
  { value: "usd", text: "USD" },
  { value: "eur", text: "EUR" },
  { value: "rub", text: "RUB" }
];

export default function Crypto() {
  const [isCryptoToCurrency, setIsCryptoToCurrency] = useState(true);
  const [amount, setAmount] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [placeholder, setPlaceholder] = useState("Результат");

  const [leftSelect, setLeftSelect] = useState<Option[]>(cryptoOptions);
  const [rightSelect, setRightSelect] = useState<Option[]>(currencyOptions);

  const [leftValue, setLeftValue] = useState(cryptoOptions[0].value);
  const [rightValue, setRightValue] = useState(currencyOptions[0].value);

  async function convert() {
    const amountNum = parseFloat(amount);

    if (!amountNum || amountNum <= 0) {
      setResult("");
      setPlaceholder("Сумма некорректна");
      return;
    }

    const coinId = isCryptoToCurrency ? leftValue : rightValue;
    const fiatCode = isCryptoToCurrency ? rightValue : leftValue;

    setPlaceholder("Загрузка...");
    setResult("");

    try {
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(
        coinId
      )}&vs_currencies=${encodeURIComponent(fiatCode)}`;

      const response = await fetch(url);

      if (!response.ok) {
        setResult("");
        setPlaceholder("Ошибка сети");
        return;
      }

      const data = await response.json();
      const price = Number(data[coinId][fiatCode]);

      let converted: string;

      if (isCryptoToCurrency) {
        converted = (amountNum * price).toFixed(1);
      } else {
        converted = (amountNum / price).toFixed(6);
      }

      setResult(converted);
      setPlaceholder("Результат");
    } catch (err) {
      console.error(err);
      setResult("");
      setPlaceholder("Попробуйте позже");
    }
  }

  function swap() {
    setIsCryptoToCurrency((prev) => !prev);

    // Переключение наборов селектов
    if (isCryptoToCurrency) {
      setLeftSelect(currencyOptions);
      setRightSelect(cryptoOptions);

      setLeftValue(currencyOptions[0].value);
      setRightValue(cryptoOptions[0].value);
    } else {
      setLeftSelect(cryptoOptions);
      setRightSelect(currencyOptions);

      setLeftValue(cryptoOptions[0].value);
      setRightValue(currencyOptions[0].value);
    }

    // Подмена значений amount и result
    const temp = amount;
    setAmount(result);
    setResult(temp);

    // Пересчёт при необходимости
    if (result) {
      setTimeout(() => convert(), 0);
    } else {
      setResult("");
      setPlaceholder("Результат");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    convert();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Конвертация криптовалют</h1>

      <form onSubmit={handleSubmit}>

        {/* Блок выбора направлений и значений */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          
          <select
            value={leftValue}
            onChange={(e) => setLeftValue(e.target.value)}
          >
            {leftSelect.map((o) => (
              <option key={o.value} value={o.value}>{o.text}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={swap}
            style={{ padding: "4px 10px" }}
          >
            ⇄
          </button>

          <select
            value={rightValue}
            onChange={(e) => setRightValue(e.target.value)}
          >
            {rightSelect.map((o) => (
              <option key={o.value} value={o.value}>{o.text}</option>
            ))}
          </select>
        </div>

        {/* Поле ввода суммы */}
        <input
          type="number"
          placeholder="Введите сумму"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            padding: 8,
            width: 200,
            marginRight: 10
          }}
        />

        {/* Поле результата */}
        <input
          type="text"
          readOnly
          placeholder={placeholder}
          value={result}
          style={{
            padding: 8,
            width: 200,
            marginLeft: 10
          }}
        />

        <div style={{ marginTop: 20 }}>
          <button type="submit">Конвертировать</button>
        </div>

      </form>
    </div>
  );
}

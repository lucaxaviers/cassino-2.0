// Só aqui tem emojis, no resto só texto normal
const symbols = ["🍒", "🍋", "🍉", "⭐", "7️⃣"];

const reels = [
  document.getElementById("reel1"),
  document.getElementById("reel2"),
  document.getElementById("reel3")
];

const spinBtn = document.getElementById("spinBtn");
const resultDiv = document.getElementById("result");
const balanceSpan = document.getElementById("balance");

let balance = 100;
const costPerPlay = 10;
const bonusWin = 50;

spinBtn.addEventListener("click", () => {
  if(balance < costPerPlay) {
    resultDiv.textContent = "Saldo baixo. Faça uma doação para continuar jogando!";
    resultDiv.style.color = "#f55";
    return;
  }

  balance -= costPerPlay;
  balanceSpan.textContent = balance;
  spinBtn.disabled = true;
  resultDiv.textContent = "";

  let spins = [0, 0, 0];
  const maxSpins = 20;
  const spinInterval = 80;
  let count = 0;

  let interval = setInterval(() => {
    for (let i = 0; i < reels.length; i++) {
      reels[i].textContent = symbols[Math.floor(Math.random() * symbols.length)];
    }
    count++;

    if (count >= maxSpins) {
      clearInterval(interval);

      for (let i = 0; i < reels.length; i++) {
        let finalSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        reels[i].textContent = finalSymbol;
        spins[i] = finalSymbol;
      }

      if (spins[0] === spins[1] && spins[1] === spins[2]) {
        balance += bonusWin;
        resultDiv.textContent = `Parabéns! Você ganhou ${bonusWin} créditos!`;
        resultDiv.style.color = "#4CAF50";
      } else {
        resultDiv.textContent = "Obrigado por jogar! Divirta-se.";
        resultDiv.style.color = "#ffb800";
      }

      balanceSpan.textContent = balance;
      spinBtn.disabled = false;
    }
  }, spinInterval);
});

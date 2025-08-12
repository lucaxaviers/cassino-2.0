// Esses são os símbolos do caça-níquel (os emojis)
const symbols = ["🍒", "🍋", "🍉", "⭐", "7️⃣"];

// Pega os três espaços onde vai mostrar os símbolos
const reels = [
  document.getElementById("reel1"),
  document.getElementById("reel2"),
  document.getElementById("reel3")
];

// Pega o botão de jogar, a área da mensagem e o saldo
const spinBtn = document.getElementById("spinBtn");
const resultDiv = document.getElementById("result");
const balanceSpan = document.getElementById("balance");

// Começa com 100 créditos
let balance = 100;

// Cada jogada custa 10 créditos
const costPerPlay = 10;

// Se acertar os 3 símbolos iguais, ganha 50 créditos
const bonusWin = 50;

// Quando clicar no botão de jogar
spinBtn.addEventListener("click", () => {
  // Se não tiver créditos suficientes, avisa e para
  if(balance < costPerPlay) {
    resultDiv.textContent = "F5 pra recarregar o saldo";
    resultDiv.style.color = "#f55"; // vermelho pra avisar
    return;
  }

  // Paga os 10 créditos da jogada
  balance -= costPerPlay;
  balanceSpan.textContent = balance;

  // Desliga o botão pra não apertar várias vezes
  spinBtn.disabled = true;

  // Limpa a mensagem de resultado
  resultDiv.textContent = "";

  // Vai guardar os símbolos que vão sair no fim
  let spins = [0, 0, 0];

  // Quantas vezes as roletas vão girar pra animar
  const maxSpins = 20;

  // Quanto tempo entre cada troca de símbolo (em milissegundos)
  const spinInterval = 80;

  let count = 0;

  // Aqui é o intervalo que vai fazer as roletas girarem
  let interval = setInterval(() => {
    // Muda o símbolo de cada roleta de forma aleatória
    for (let i = 0; i < reels.length; i++) {
      reels[i].textContent = symbols[Math.floor(Math.random() * symbols.length)];
    }

    count++;

    // Quando girar o tanto que queria, para a animação
    if (count >= maxSpins) {
      clearInterval(interval);

      // Sorteia os símbolos finais e mostra na tela
      for (let i = 0; i < reels.length; i++) {
        let finalSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        reels[i].textContent = finalSymbol;
        spins[i] = finalSymbol;
      }

      // Se os 3 símbolos forem iguais, ganha créditos extras
      if (spins[0] === spins[1] && spins[1] === spins[2]) {
        balance += bonusWin;
        resultDiv.textContent = `Parabéns! Você ganhou ${bonusWin} créditos!`;
        resultDiv.style.color = "#4CAF50"; // verde pra vitória
      } else {
        // Se não
        resultDiv.textContent = "Tigrinho não pagou!";
        resultDiv.style.color = "#ffb800"; // amarelo
      }

      // Atualiza o saldo na tela
      balanceSpan.textContent = balance;

      // Liga o botão pra poder jogar de novo
      spinBtn.disabled = false;
    }
  }, spinInterval);
});

// Enums and Classes
const CabecaPeca = {
  BRANCO: 0,
  PIO: 1,
  DUQUE: 2,
  TERNO: 3,
  QUADRA: 4,
  QUINA: 5,
  SENA: 6,
};

const CabecaNomes = {
  0: "BRANCO",
  1: "PIO",
  2: "DUQUE",
  3: "TERNO",
  4: "QUADRA",
  5: "QUINA",
  6: "SENA",
};

class Peca {
  constructor(esquerda, direita) {
    this.esquerda = esquerda;
    this.direita = direita;
  }

  toString() {
    return `[${CabecaNomes[this.esquerda]}|${CabecaNomes[this.direita]}]`;
  }

  // Checking if a piece can connect to another piece
  canConnectTo(outraPeca) {
    return (
      this.esquerda === outraPeca.esquerda ||
      this.esquerda === outraPeca.direita ||
      this.direita === outraPeca.esquerda ||
      this.direita === outraPeca.direita
    );
  }

  // Geting the head of this piece
  getHeads() {
    return [this.esquerda, this.direita];
  }
}

class CasaTabuleiro {
  constructor(peca) {
    this.peca = peca;
    this.proximo = null;
    this.anterior = null;
  }
}

class Tabuleiro {
  constructor() {
    this.inicio = null;
    this.fim = null;
    this.tamanho = 0;
  }

  // Insert from beginning
  incluirDoInicio(peca) {
    // Empty board - automatically include first piece, return 0
    if (this.tamanho === 0) {
      const novaCasa = new CasaTabuleiro(peca);
      this.inicio = novaCasa;
      this.fim = novaCasa;
      this.tamanho = 1;
      return 0;
    }

    // Single house - check if piece can connect, add as next house, return 1
    if (this.tamanho === 1) {
      if (peca.canConnectTo(this.inicio.peca)) {
        const novaCasa = new CasaTabuleiro(peca);
        novaCasa.anterior = this.inicio;
        this.inicio.proximo = novaCasa;
        this.fim = novaCasa;
        this.tamanho++;
        return 1;
      }
      return -1; // Cannot connect
    }

    // Multiple houses - search from start for fit
    // Checking first house (left head match) - insert before first, return 2
    const primeiraHeadEsquerda = this.inicio.peca.esquerda;
    const pecaHeads = peca.getHeads();

    if (pecaHeads.includes(primeiraHeadEsquerda)) {
      const novaCasa = new CasaTabuleiro(peca);
      novaCasa.proximo = this.inicio;
      this.inicio.anterior = novaCasa;
      this.inicio = novaCasa;
      this.tamanho++;
      return 2;
    }

    // Checking last house (right head match) - Inserting after last, return 1
    const ultimaHeadDireita = this.fim.peca.direita;
    if (pecaHeads.includes(ultimaHeadDireita)) {
      const novaCasa = new CasaTabuleiro(peca);
      novaCasa.anterior = this.fim;
      this.fim.proximo = novaCasa;
      this.fim = novaCasa;
      this.tamanho++;
      return 1;
    }

    // Checking intermediate houses - Search from start
    let casaAtual = this.inicio;
    let casasAndadas = 0;

    while (casaAtual && casaAtual.proximo) {
      const headDireita = casaAtual.peca.direita;
      const headEsquerdaProxima = casaAtual.proximo.peca.esquerda;

      if (
        pecaHeads.includes(headDireita) &&
        pecaHeads.includes(headEsquerdaProxima)
      ) {
        // Inserting between casaAtual and casaAtual.proximo
        const novaCasa = new CasaTabuleiro(peca);
        novaCasa.anterior = casaAtual;
        novaCasa.proximo = casaAtual.proximo;
        casaAtual.proximo.anterior = novaCasa;
        casaAtual.proximo = novaCasa;
        this.tamanho++;
        return this.tamanho - casasAndadas - 1;
      }

      casaAtual = casaAtual.proximo;
      casasAndadas++;
    }

    return -1; // Cannot connect anywhere :(
  }

  // incluirDoFim - Insert from end following exact specification rules
  incluirDoFim(peca) {
    // Empty board - automatically include first piece, return 0
    if (this.tamanho === 0) {
      const novaCasa = new CasaTabuleiro(peca);
      this.inicio = novaCasa;
      this.fim = novaCasa;
      this.tamanho = 1;
      return 0;
    }

    // Single house - check if piece can connect, add as first house, return 1
    if (this.tamanho === 1) {
      if (peca.canConnectTo(this.inicio.peca)) {
        const novaCasa = new CasaTabuleiro(peca);
        novaCasa.proximo = this.inicio;
        this.inicio.anterior = novaCasa;
        this.inicio = novaCasa;
        this.tamanho++;
        return 1;
      }
      return -1; // Cannot connect
    }

    // Multiple houses - search from end for fit
    // Checking first house (left head match) - Insert before first, return 2
    const primeiraHeadEsquerda = this.inicio.peca.esquerda;
    const pecaHeads = peca.getHeads();

    if (pecaHeads.includes(primeiraHeadEsquerda)) {
      const novaCasa = new CasaTabuleiro(peca);
      novaCasa.proximo = this.inicio;
      this.inicio.anterior = novaCasa;
      this.inicio = novaCasa;
      this.tamanho++;
      return 2;
    }

    // Checking last house (right head match) - Insert after last, return 1
    const ultimaHeadDireita = this.fim.peca.direita;
    if (pecaHeads.includes(ultimaHeadDireita)) {
      const novaCasa = new CasaTabuleiro(peca);
      novaCasa.anterior = this.fim;
      this.fim.proximo = novaCasa;
      this.fim = novaCasa;
      this.tamanho++;
      return 1;
    }

    // Check intermediate houses - Search from END
    let casaAtual = this.fim;
    let casasAndadas = 0;

    while (casaAtual && casaAtual.anterior) {
      const headEsquerda = casaAtual.peca.esquerda;
      const headDireitaAnterior = casaAtual.anterior.peca.direita;

      if (
        pecaHeads.includes(headEsquerda) &&
        pecaHeads.includes(headDireitaAnterior)
      ) {
        // Insert between casaAtual.anterior and casaAtual
        const novaCasa = new CasaTabuleiro(peca);
        novaCasa.anterior = casaAtual.anterior;
        novaCasa.proximo = casaAtual;
        casaAtual.anterior.proximo = novaCasa;
        casaAtual.anterior = novaCasa;
        this.tamanho++;
        return this.tamanho - casasAndadas - 1;
      }

      casaAtual = casaAtual.anterior;
      casasAndadas++;
    }

    return -1; // Cannot connect anywhere :(
  }

  // Getting all pieces as array for display
  getPecas() {
    const pecas = [];
    let casa = this.inicio;
    while (casa) {
      pecas.push(casa.peca);
      casa = casa.proximo;
    }
    return pecas;
  }

  // Clearing board
  clear() {
    this.inicio = null;
    this.fim = null;
    this.tamanho = 0;
  }
}

class BurrinhoInteligente {
  constructor() {
    this.tabuleiro = new Tabuleiro();
    this.conjuntoPecas = this.generateDominoSet();
    this.jogadorAtual = 1;
    this.modoSimulacao = false;
    this.jogoAtivo = false;
    this.intervalId = null;
  }

  // Generating complete domino set (28 pieces, right?)
  generateDominoSet() {
    const pecas = [];
    for (let i = 0; i <= 6; i++) {
      for (let j = i; j <= 6; j++) {
        pecas.push(new Peca(i, j));
      }
    }
    return pecas;
  }

  // Drawing random piece from set
  tirarPecaAleatoria() {
    if (this.conjuntoPecas.length === 0) return null;
    const index = Math.floor(Math.random() * this.conjuntoPecas.length);
    return this.conjuntoPecas.splice(index, 1)[0];
  }

  // Returning piece to set
  devolverPeca(peca) {
    this.conjuntoPecas.push(peca);
  }

  // Trying to place piece from start
  tentarDoInicio(peca) {
    const resultado = this.tabuleiro.incluirDoInicio(peca);
    return resultado;
  }

  // Trying to place piece from end
  tentarDoFim(peca) {
    const resultado = this.tabuleiro.incluirDoFim(peca);
    return resultado;
  }

  // Checking if is game over
  jogoTerminou() {
    return this.conjuntoPecas.length === 0;
  }

  // Resetting game
  resetar() {
    this.tabuleiro.clear();
    this.conjuntoPecas = this.generateDominoSet();
    this.jogadorAtual = 1;
    this.jogoAtivo = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  // Start player mode - PvP
  iniciarModoJogador() {
    this.modoSimulacao = false;
    this.jogoAtivo = true;
  }

  // Start simulation mode - EvE
  iniciarModoSimulacao() {
    this.modoSimulacao = true;
    this.jogoAtivo = true;
  }

  // Executing one step of simulation
  executarPassoSimulacao() {
    if (!this.jogoAtivo || this.jogoTerminou()) return false;

    const peca = this.tirarPecaAleatoria();
    if (!peca) return false;

    // Random choice: Start or End
    const tentarDoInicio = Math.random() < 0.5;
    const resultado = tentarDoInicio
      ? this.tentarDoInicio(peca)
      : this.tentarDoFim(peca);

    const sucesso = resultado >= 0;
    if (!sucesso) {
      this.devolverPeca(peca);
    }

    // Logging the move
    this.logMove(peca, tentarDoInicio ? "início" : "fim", resultado, sucesso);

    this.jogadorAtual = this.jogadorAtual === 1 ? 2 : 1;
    return true;
  }

  // Logging a move
  logMove(peca, posicao, resultado, sucesso) {
    const logEntry = {
      jogador: this.jogadorAtual,
      peca: peca.toString(),
      posicao: posicao,
      resultado: resultado,
      sucesso: sucesso,
      tamanhoTabuleiro: this.tabuleiro.tamanho,
    };

    // This will be handled by the UI
    if (window.logGameMove) {
      window.logGameMove(logEntry);
    }
  }
}

// Global game instance
let game = new BurrinhoInteligente();
let currentPiece = null;

// UI Functions
function startPlayerMode() {
  game.resetar();
  game.iniciarModoJogador();

  document.getElementById("playerControls").classList.remove("hidden");
  document.getElementById("simulationControls").classList.add("hidden");

  updateGameStatus("Jogador 1 - Sua vez.");
  drawNewPiece();
  updateDisplay();
  logMessage("Modo Jogador iniciado", "info");
}

function startSimulationMode() {
  game.resetar();
  game.iniciarModoSimulacao();

  document.getElementById("playerControls").classList.add("hidden");
  document.getElementById("simulationControls").classList.remove("hidden");

  updateGameStatus("Modo Simulação ativo - Pressione Play ou Passo");
  updateDisplay();
  logMessage("Modo Simulação iniciado", "info");
}

function resetGame() {
  game.resetar();
  currentPiece = null;

  document.getElementById("playerControls").classList.add("hidden");
  document.getElementById("simulationControls").classList.add("hidden");

  updateGameStatus("Jogo resetado - Selecione um modo");
  updateDisplay();
  clearLog();
  logMessage("🔄 Jogo reiniciado", "info");
}

function drawNewPiece() {
  if (game.jogoTerminou()) {
    updateGameStatus("Jogo terminado! Todas as peças foram usadas.");
    logMessage("Jogo terminado - pool vazio", "info");
    return false;
  }

  currentPiece = game.tirarPecaAleatoria();
  if (currentPiece) {
    displayCurrentPiece(currentPiece);
    return true;
  }
  return false;
}

function tryInsertFromStart() {
  if (!currentPiece) return;

  const resultado = game.tentarDoInicio(currentPiece);
  const sucesso = resultado >= 0;

  game.logMove(currentPiece, "início", resultado, sucesso);

  if (!sucesso) {
    game.devolverPeca(currentPiece);
    logMessage(
      `❌ Peça ${currentPiece.toString()} não encaixou do início (código: ${resultado})`,
      "error"
    );
  } else {
    logMessage(
      `✅ Peça ${currentPiece.toString()} inserida do início (código: ${resultado})`,
      "success"
    );
  }

  game.jogadorAtual = game.jogadorAtual === 1 ? 2 : 1;
  updateDisplay();

  if (!game.jogoTerminou()) {
    drawNewPiece();
    updateGameStatus(`Jogador ${game.jogadorAtual} - Sua vez`);
  } else {
    updateGameStatus("Jogo terminado!");
  }
}

function tryInsertFromEnd() {
  if (!currentPiece) return;

  const resultado = game.tentarDoFim(currentPiece);
  const sucesso = resultado >= 0;

  game.logMove(currentPiece, "fim", resultado, sucesso);

  if (!sucesso) {
    game.devolverPeca(currentPiece);
    logMessage(
      `❌ Peça ${currentPiece.toString()} não encaixou do fim (código: ${resultado})`,
      "error"
    );
  } else {
    logMessage(
      `✅ Peça ${currentPiece.toString()} inserida do fim (código: ${resultado})`,
      "success"
    );
  }

  game.jogadorAtual = game.jogadorAtual === 1 ? 2 : 1;
  updateDisplay();

  if (!game.jogoTerminou()) {
    drawNewPiece();
    updateGameStatus(`Jogador ${game.jogadorAtual} - Sua vez`);
  } else {
    updateGameStatus("Jogo terminado!");
  }
}

function stepSimulation() {
  if (!game.jogoAtivo) return;

  const sucesso = game.executarPassoSimulacao();
  updateDisplay();

  if (game.jogoTerminou()) {
    updateGameStatus("Simulação terminada!");
    logMessage("Simulação completa - pool vazio", "info");
  } else if (sucesso) {
    updateGameStatus(`Simulação - Jogador ${game.jogadorAtual}`);
  }
}

function toggleSimulation() {
  const btn = document.getElementById("playPauseBtn");

  if (game.intervalId) {
    // Pause
    clearInterval(game.intervalId);
    game.intervalId = null;
    btn.textContent = "▶️ Play";
    btn.classList.remove("secondary");
  } else {
    // Play
    const speed = parseInt(document.getElementById("speedControl").value);
    game.intervalId = setInterval(() => {
      if (!stepSimulation() || game.jogoTerminou()) {
        clearInterval(game.intervalId);
        game.intervalId = null;
        btn.textContent = "▶️ Play";
        btn.classList.remove("secondary");
      }
    }, speed);
    btn.textContent = "⏸️ Pause";
    btn.classList.add("secondary");
  }
}

function runFullSimulation() {
  clearInterval(game.intervalId);
  game.intervalId = null;
  document.getElementById("playPauseBtn").textContent = "▶️ Play";

  let steps = 0;
  while (game.jogoAtivo && !game.jogoTerminou() && steps < 1000) {
    game.executarPassoSimulacao();
    steps++;
  }

  updateDisplay();
  updateGameStatus("Simulação Completa, terminada!");
  logMessage(`Simulação completa - ${steps} passos executados`, "info");
}

function displayCurrentPiece(piece) {
  const display = document.getElementById("currentPieceDisplay");
  display.innerHTML = createPieceHTML(piece);
}

function createPieceHTML(piece) {
  return `
                <div class="piece">
                    <div class="piece-head">${CabecaNomes[piece.esquerda]}</div>
                    <div class="piece-head">${CabecaNomes[piece.direita]}</div>
                </div>
            `;
}

function updateDisplay() {
  updateBoard();
  updateStats();
}

function updateBoard() {
  const board = document.getElementById("board");
  const pieces = game.tabuleiro.getPecas();

  if (pieces.length === 0) {
    board.innerHTML =
      '<p style="color: #888; font-style: italic;">Tabuleiro vazio</p>';
  } else {
    board.innerHTML = pieces.map((piece) => createPieceHTML(piece)).join("");
  }
}

function updateStats() {
  document.getElementById("piecesRemaining").textContent =
    game.conjuntoPecas.length;
  document.getElementById("boardSize").textContent = game.tabuleiro.tamanho;
}

function updateGameStatus(status) {
  document.getElementById(
    "gameStatus"
  ).innerHTML = `<strong>Status:</strong> ${status}`;
}

function logMessage(message, type = "info") {
  const log = document.getElementById("gameLog");
  const entry = document.createElement("div");
  entry.className = `log-entry ${type}`;
  entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  log.appendChild(entry);
  log.scrollTop = log.scrollHeight;
}

function clearLog() {
  document.getElementById("gameLog").innerHTML =
    '<div class="log-entry info">Logs do jogo...</div>';
}

// Global function for game logging
window.logGameMove = function (logEntry) {
  const message = `Jogador ${logEntry.jogador}: ${logEntry.peca} (${logEntry.posicao}) → Código: ${logEntry.resultado} | Tabuleiro: ${logEntry.tamanhoTabuleiro}`;
  logMessage(message, logEntry.sucesso ? "success" : "error");
};

// Speed control
document.getElementById("speedControl").addEventListener("input", function (e) {
  const speed = parseInt(e.target.value);
  document.getElementById("speedDisplay").textContent = `${speed / 1000}s`;
});

// Dark mode detection
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  document.documentElement.classList.add("dark");
}
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    if (event.matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

// Simple test harness for insertion methods
function runTests() {
  console.log("Running Domino But Web Tests...");

  const testTabuleiro = new Tabuleiro();

  // Test 1 - Empty board insertion - Should return 0
  const peca1 = new Peca(CabecaPeca.BRANCO, CabecaPeca.PIO);
  const resultado1 = testTabuleiro.incluirDoInicio(peca1);
  console.assert(
    resultado1 === 0,
    `Test 1 failed: expected 0, got ${resultado1}`
  );
  console.log("✅ Test 1 passed: Empty board insertion returns 0");

  // Test 2 - Second piece insertion - Should return 1 (append)
  const peca2 = new Peca(CabecaPeca.PIO, CabecaPeca.DUQUE);
  const resultado2 = testTabuleiro.incluirDoInicio(peca2);
  console.assert(
    resultado2 === 1,
    `Test 2 failed: expected 1, got ${resultado2}`
  );
  console.log("✅ Test 2 passed: Single house append returns 1");

  // Test 3 - Insert at beginning - Should return 2
  const peca3 = new Peca(CabecaPeca.TERNO, CabecaPeca.BRANCO);
  const resultado3 = testTabuleiro.incluirDoInicio(peca3);
  console.assert(
    resultado3 === 2,
    `Test 3 failed: expected 2, got ${resultado3}`
  );
  console.log("✅ Test 3 passed: Beginning insertion returns 2");

  // Test 4 - Insert at end - Should return 1
  const peca4 = new Peca(CabecaPeca.DUQUE, CabecaPeca.QUADRA);
  const resultado4 = testTabuleiro.incluirDoInicio(peca4);
  console.assert(
    resultado4 === 1,
    `Test 4 failed: expected 1, got ${resultado4}`
  );
  console.log("✅ Test 4 passed: End insertion returns 1");

  // Test 5 - Cannot connect piece - Should return -1
  const peca5 = new Peca(CabecaPeca.QUINA, CabecaPeca.SENA);
  const resultado5 = testTabuleiro.incluirDoInicio(peca5);
  console.assert(
    resultado5 === -1,
    `Test 5 failed: expected -1, got ${resultado5}`
  );
  console.log("✅ Test 5 passed: Non-connecting piece returns -1");

  console.log("🎉 All tests passed!");

  // Display test board
  console.log(
    "Final test board:",
    testTabuleiro
      .getPecas()
      .map((p) => p.toString())
      .join(" → ")
  );
}

// Run tests on load
document.addEventListener("DOMContentLoaded", function () {
  updateDisplay();
  runTests();
});

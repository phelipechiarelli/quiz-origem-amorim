let questions = [];
let currentQuestion = 0;
let score = 0;
let playerName = '';
let timer = null;
let timeLeft = 20;
let correctAnswers = 0;
let wrongAnswers = 0;
let unansweredQuestions = 0;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const playerNameInput = document.getElementById('player-name');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const scoreDiv = document.getElementById('score');
const questionDiv = document.getElementById('question');
const optionsDiv = document.getElementById('options');
const timerDiv = document.getElementById('timer');

function startTimer() {
    clearTimer();
    timeLeft = 20;
    timerDiv.textContent = `Tempo: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerDiv.textContent = `Tempo: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearTimer();
            handleTimeout();
        }
    }, 1000);
}

function clearTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

function handleTimeout() {
    const allBtns = optionsDiv.querySelectorAll('button');
    allBtns.forEach(b => b.disabled = true);
    const q = questions[currentQuestion];
    allBtns[q.correta].classList.add('correct');
    unansweredQuestions++;
    nextBtn.style.display = 'inline-block';
}

startBtn.onclick = async (e) => {
    e.preventDefault();
    playerName = playerNameInput.value.trim();
    if (!playerName) {
        alert('Por favor, digite seu nome!');
        return;
    }
    await startGame();
};

async function startGame() {
    startScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    score = 0;
    currentQuestion = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    unansweredQuestions = 0;
    scoreDiv.textContent = `Placar: ${score}`;
    questions = await fetchQuestions();
    showQuestion();
}

async function fetchQuestions() {
    try {
        const res = await fetch('http://localhost:3000/perguntas');
        const data = await res.json();
        if (Array.isArray(data)) {
            return shuffleArray(data).slice(0, 10);
        } else {
            alert('Erro na estrutura dos dados.');
            return [];
        }
    } catch (e) {
        alert('Erro ao carregar perguntas. Verifique se o servidor JSON está rodando.');
        return [];
    }
}

function showQuestion() {
    const q = questions[currentQuestion];
    questionDiv.textContent = `Pergunta ${currentQuestion + 1}: ${q.pergunta}`;
    optionsDiv.innerHTML = '';
    q.opcoes.forEach((op, idx) => {
        const btn = document.createElement('button');
        btn.textContent = op;
        btn.onclick = () => selectOption(btn, idx);
        optionsDiv.appendChild(btn);
    });
    nextBtn.style.display = 'none';
    startTimer();
}

function selectOption(btn, idx) {
    clearTimer();
    const q = questions[currentQuestion];
    const allBtns = optionsDiv.querySelectorAll('button');
    allBtns.forEach(b => b.disabled = true);
    if (idx === q.correta) {
        btn.classList.add('correct');
        score += 10;
        correctAnswers++;
        scoreDiv.textContent = `Placar: ${score}`;
    } else {
        btn.classList.add('incorrect');
        wrongAnswers++;
        allBtns[q.correta].classList.add('correct');
    }
    nextBtn.style.display = 'inline-block';
}

async function showResult() {
    const playerRecord = {
        nome: playerName,
        pontuacao: score,
        acertos: correctAnswers,
        erros: wrongAnswers,
        semResposta: unansweredQuestions,
        data: new Date().toISOString()
    };

    // Salva no localStorage
    localStorage.setItem('quizResultado', JSON.stringify(playerRecord));

    // Envia para o servidor
    try {
        await fetch('http://localhost:3001/registros', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(playerRecord)
        });
    } catch (error) {
        console.error('Erro ao salvar o registro:', error);
    }

    // Redireciona para resultado.html
    window.location.href = 'resultado.html';
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
};

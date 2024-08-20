const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const symbols = [];
const numSymbols = 100;

// Função para gerar uma cor HSL aleatória
function randomColor() {
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
}

// Função para criar um símbolo com posições e direção iniciais aleatórias
function createSymbol() {
    const symbolsArray = ['$', '+', '-', '=', '÷', '×', '√'];
    const symbol = symbolsArray[Math.floor(Math.random() * symbolsArray.length)];
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 6,
        dy: (Math.random() - 0.5) * 6,
        color: randomColor(),
        fontSize: Math.random() * 40 + 10, // Tamanhos variados
        symbol: symbol
    };
}

// Criar vários símbolos iniciais
for (let i = 0; i < numSymbols; i++) {
    symbols.push(createSymbol());
}

// Função para atualizar a posição dos símbolos
function updateSymbols() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

    for (let i = 0; i < symbols.length; i++) {
        const s = symbols[i];

        // Atualiza a posição do símbolo
        s.x += s.dx;
        s.y += s.dy;

        // Inverte a direção se o símbolo atingir as bordas do canvas
        if (s.x <= 0 || s.x >= canvas.width) s.dx *= -1;
        if (s.y <= 0 || s.y >= canvas.height) s.dy *= -1;

        // Atualiza o tamanho dos símbolos para criar um efeito dinâmico
        s.fontSize += (Math.random() - 0.5) * 6; // Mudança rápida no tamanho

        // Desenha o símbolo no canvas
        ctx.font = `${Math.max(s.fontSize, 10)}px Arial`; // Garante que o tamanho mínimo seja 10px
        ctx.fillStyle = s.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(s.symbol, s.x, s.y);
    }
}

// Função para desenhar o texto fixo e centralizado
function drawText() {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2); // Translada o canvas para o centro

    // Configuração do texto "MICRO"
    ctx.font = 'bold 100px Arial'; // Tamanho reduzido para "MICRO"
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Muda a cor do texto automaticamente
    const hue = (Date.now() % 360); // Cor que muda com o tempo
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;

    ctx.fillText('MICRO', 0, -30); // Ajusta a posição

    // Configuração do texto "FINANCE"
    ctx.font = 'bold 80px Arial'; // Tamanho reduzido para "FINANCE"
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText('FINANCE', 0, 50); // Ajusta a posição

    ctx.restore();
}

// Função para animar os símbolos e atualizar o texto
function animate() {
    updateSymbols();
    drawText();

    requestAnimationFrame(animate); // Chama a função animate em loop
}

animate(); // Inicia a animação

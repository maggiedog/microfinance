const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const symbols = [];
const numSymbols = 100;
let hue = 0; // Cor inicial

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
    ctx.font = 'bold 156px Arial'; // Tamanho do texto "MICRO"
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Cria um efeito de sombra para simular 3D
    for (let i = 0; i < 10; i++) {
        ctx.fillStyle = `hsl(${(hue + i * 10) % 360}, 100%, 50%)`;
        ctx.fillText('MICRO', i, i - 50);
    }

    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.fillText('MICRO', 0, -50);

    // Configuração do texto "FINANCE"
    ctx.font = 'bold 120px Arial'; // Tamanho do texto "FINANCE"
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Cria um efeito de sombra para simular 3D
    for (let i = 0; i < 10; i++) {
        ctx.fillStyle = `hsl(${(hue + i * 10) % 360}, 100%, 50%)`;
        ctx.fillText('FINANCE', i, i + 60);
    }

    ctx.fillStyle = `hsl(${(hue + 180) % 360}, 100%, 50%)`;
    ctx.fillText('FINANCE', 0, 60);

    ctx.restore();

    // Incrementa o hue para mudar a cor gradualmente
    hue = (hue + 1) % 360;
}

// Função para animar os símbolos e atualizar o texto
function animate() {
    updateSymbols();
    drawText();

    requestAnimationFrame(animate); // Chama a função animate em loop
}

animate(); // Inicia a animação

let canvas = document.getElementById("snake-id");//buscando o canvas através da ID
let context = canvas.getContext("2d");//declarando o formato 2d para o canvas

//variáveis do jogo
let box = 32;//tamanho de cada bloco da cobrinha que equivale a 16 veses o tamanho do canvas
let snake = [];//variavel tipo array para ser preenhido por background
let direction = " ";//declaração da variável direction
var pontuacao = 0;


//definindo onde o jogo vai criar a cobrinha onde X e Y e quivalem as colunas e linhas
//o array 0 é por que precisamos dizer para o JS onde o primeiro array vai ser desenhado
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let food = {
    x: Math.floor(Math.random() * 15 +1) * box,
    y: Math.floor(Math.random() * 15 +1) * box
}

//função para criar o fundo do jogo
function criarBG() {
    context.fillStyle = "#EEE9E9";//definindo a cor de fundo do jogo
    context.fillRect(0, 0, 16 * box, 16 * box);//definindo o tamanho do desenho 16*32=512->tamanho definido do canvas.
;}

//função para criar a cobrinha
function criarCobrinha() {
    for(i=0; i<snake.length; i++){//a cobrinha vai ser criado em um ciclo infinito de vezes, lenght representa a posição do array
        context.fillStyle = "green";//definindo a cor da cobrinha
       // context.fillRect(snake[i].x, snake[i].y, box, box);// (.x , .y)->define o local onde vai ser criado, (box, box)->define o tamnho da cobrinha
       context.beginPath(); 
       context.ellipse(snake[i].x, snake[i].y, 16, 16, Math.PI * .25, -2 , Math.PI * 1.5);
       context.fill();
    }
}

function drawFood() {
    context.fillStyle = "purple";
    //context.fillRect(food.x, food.y, box, box); //comida quadrada   
    context.beginPath();
    context.ellipse(food.x, food.y, 16, 16, Math.PI * .25, -2, Math.PI * 1.5);
    context.fill();
}

document.addEventListener('keydown', update);

function update(event) {

    if(event.keyCode == 37 && direction != "right") setInterval(direction = "left", 110)
    if(event.keyCode == 38 && direction != "down") setInterval(direction = "up", 110)
    if(event.keyCode == 39 && direction != "left") setInterval(direction = "right", 110)
    if(event.keyCode == 40 && direction != "up") setInterval(direction = "down", 110)
}





function iniciarJogo() {

    
    criarBG(); //chamando as função que cria o Background
    criarCobrinha();//criando a cobrinha
    drawFood();


    if (snake[0].x > 16 * box) {clearInterval(jogo); alert("Game Over :)");} 
    if (snake[0].x < 0 ) {clearInterval(jogo); alert("Game Over :)");}
    if (snake[0].y > 16 * box) {clearInterval(jogo); alert("Game Over :)");}
    if (snake[0].y < 0 ){clearInterval(jogo); alert("Game Over :)");}

    for(i=1; i < snake.length; i++ ){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Game Over :)");
        }

    }

    

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "down") snakeY +=box;
    if(direction == "up") snakeY -=box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
        
        pontuacao++;
        
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    
    snake.unshift(newHead);
    var resultado = `<h2>SCORE: <span style="color: red">${pontuacao}</span></h2>`;
    document.getElementById("pontuacao").innerHTML = resultado;

   
}
var level = 80;
let jogo = setInterval(iniciarJogo, level);


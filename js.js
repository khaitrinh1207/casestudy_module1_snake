const cvs = document.getElementById('myCanvas');
const ctx = cvs.getContext('2d');


// create the unit
const box = 25;

// load img
const bground = new Image();
bground.src = "img/bg.png";
const foodImg = new Image();
foodImg.src = "img/food2.png";
//load audio files
const sMove = new Audio();
const sEat = new Audio();
const sDead = new Audio();

sMove.src = "audio/snakemove.mp3"
sEat.src = "audio/snakeeat.wav"
sDead.src = "audio/gameover.wav"

// create snake
let snake = [];
snake[0] = {x: 10 * box, y: 10 * box};

// create food
let food = {

    x: Math.floor(Math.random()*15)*box,
    y: Math.floor(Math.random()*15)*box
}

// create score

let score = 0;




// move snake
let d;
document.addEventListener("keydown",move);
function move(e) {
    if (e.keyCode == 37 && d != 'right'){
        d = 'left';
        sMove.play();
    }else if (e.keyCode == 38 && d != 'down'){
        d = 'up';
        sMove.play();
    }else if (e.keyCode == 39 && d != 'left'){
        d = 'right';
        sMove.play();
    }else if (e.keyCode == 40 && d != 'up'){
        d = 'down';
        sMove.play();
    }

}
// check collision function
function collision(head,array) {
    for(let i=0;i<array.length;i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw canvas

function draw() {
    ctx.drawImage(bground,0,0,500,500)

    for (let i=0; i < snake.length;i++){
        ctx.fillStyle = ( i==0 )? "#CCFF99" : "#666666";
        ctx.fillRect(snake[i].x, snake[i].y,box,box);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);

    }

    ctx.fillStyle = 'white';
    ctx.font = ' 25px Changa one';
    ctx.fillText('Score :'+ score, box,box);

    ctx.drawImage(foodImg,food.x,food.y,25,25);
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    //remote the tail
    //which direction
    if(d == 'left') snakeX -= box;
    if(d == 'up') snakeY -= box;
    if(d == 'right') snakeX += box;
    if(d == 'down') snakeY += box;
    //if snake eat food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        sEat.play();
        food = {
            x: Math.floor(Math.random()*15)*box,
            y: Math.floor(Math.random()*15)*box
        } // we dont remove the tail

    }else{
        // remmove the tail
        snake.pop();
    }
    //add tail

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    // gameover
    if( snakeX >= 20*box || snakeY >= 20*box ||snakeX < 0
        ||snakeY < 0 || collision(newHead,snake)){
        clearInterval(game);
        sDead.play();
        alert('gameover');
    }
    snake.unshift(newHead);
}
//call draw

let game = setInterval(draw, 200);
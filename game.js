let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext('2d');
let ball = {
    x: Math.floor(Math.random() * 200) + 100,
    y: Math.floor(Math.random() * 200) + 350,
    dx: 5,
    dy: 4,
    radius: 8
}               //khai báo kích thước tọa độ bóng


let paddle = {
    width: 100,
    height: 15,
    x: 215,
    y: canvas.height - 17,
    speed: 40
}           //khai báo kích thước tọa độ của paddle.


let bricks = {
    offsetX: 25,
    offsetY: 20,
    margin: 25,
    width: 55,
    height: 15,
    totalRow: 5,
    totalCol: 6
}               //gạch
let audio = new Audio('audio/funny.mp3')
let bom = new Audio('audio/hihi.mp3')
let over = new Audio('audio/over.mp3')
let winner = new Audio('audio/winner.mp3')

let gameOver = true;
let GameWin = true;
let Point = 0;
let MaxPoint = bricks.totalCol * bricks.totalRow
let begin = true;
let bricksArray = [];     //Array gạch

for (let i = 0; i < bricks.totalRow; i++) {
    for (let j = 0; j < bricks.totalCol; j++) {
        bricksArray.push({
            x: bricks.offsetX + j * (bricks.width + bricks.margin),
            y: bricks.offsetY + i * (bricks.height + bricks.margin),
            isBreak: true
        })
    }
}        // vẽ mảng gạch


function drawPaddle() {
    ctx.beginPath()
    ctx.fillStyle = '#fd001e';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
    ctx.fill()


}

function drawBall() {
    ctx.beginPath();
    ctx.fillStyle = '#ffffff'
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.fill()
    ctx.closePath()
}


function drawBricks() {
    bricksArray.forEach(function (a) {
        if (a.isBreak) {
            ctx.beginPath()
            ctx.fillStyle = '#ff0202'
            ctx.fillRect(a.x, a.y, bricks.width, bricks.height)
            ctx.fill();
            ctx.closePath();
        }
    })
}

function updateBall() {
    ball.x -= ball.dx;
    // console.log('dx', dx)
    ball.y -= ball.dy;
    // console.log('dy',dy)
}

function move(evt) {
    if (evt.keyCode === 39) {
        paddle.x += paddle.speed;
        console.log('x+', paddle.x)//Cộng trừ tọa độ vẽ của paddle
    }
    if (evt.keyCode === 37) {
        paddle.x -= paddle.speed;
        console.log('x-', paddle.x)
    }
    if (paddle.x < 0) {          // Chặn 2 cạnh di chuyển của thanh ngang
        paddle.x = 0
        console.log('tọa độ Left x', paddle.x)
    }
    if (paddle.x > canvas.width - paddle.width) {
        paddle.x = canvas.width - paddle.width
        console.log('tọa độ Right', paddle.x)
    }
}
window.addEventListener('keydown', move);


function vaChamKhungCanvas() {
    if (ball.x < ball.radius || ball.x + ball.radius > canvas.width) {
        ball.dx = -ball.dx;
    }
    if (ball.y < ball.radius) {
        ball.dy = -ball.dy
    }
    if (ball.y + ball.radius > canvas.height) {
        gameOver = false;
    }

}

function vaChamThanhNgang() {
    if (ball.x + ball.radius >= paddle.x && ball.x + ball.radius <= paddle.x + paddle.width && ball.y + ball.radius >= canvas.height - paddle.height) {
        ball.dy = -ball.dy
    }
}

function vaChamGach() {
    bricksArray.forEach(function (a) {
        if (a.isBreak) {
            if (ball.x >= a.x && ball.x <= a.x + bricks.width && ball.y + ball.radius >= a.y &&
                ball.y - ball.radius <= a.y + bricks.height) {
                ball.dy = -ball.dy;
                bom.play()
                a.isBreak = false;
                Point += 1;
                console.log('diem======>', Point)
                document.getElementById('point').innerHTML = Point
                if (Point === MaxPoint) {
                    document.getElementById('point').innerHTML = 'You Win!!'
                    gameOver = false;
                    GameWin = false;
                }
            }
        }
    })
}


// // Gọi lại hàm vẽ bóng sau 200 mini giây và dịch chuyển tọa độ
// setInterval(function () {
//     ctx.clearRect(0,0,canvas.width, canvas.height); // xóa hình sau mỗi lần lặp
//     //canvas.with, height: tọa độ của bóng sau mỗi lần di chuyển
//     drawBall();
//     vaCham();
//     updateBall();
// },50)
function start() {
    ctx.beginPath()
    ctx.font = "50px Arial";
    ctx.fillStyle = 'white';
    ctx.fillText("Click here to start!", canvas.width / 10, canvas.height / 4);
    ctx.closePath();
}

function gameOver1() {
    audio.pause();
    over.play()
    let img = document.getElementById('loser');
    ctx.drawImage(img,0,0)
    // ctx.beginPath();
    // ctx.fillStyle = 'black'
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    // ctx.fillStyle = 'white'
    // ctx.font = "50px Blazed";
    // ctx.fillText('Game Over!', canvas.width / 15, canvas.height / 4);
    // ctx.closePath();

}

function youWin() {
    winner.play()
    audio.pause();
    let img1 = document.getElementById('winner');
    ctx.drawImage(img1,0,0)
    // ctx.beginPath()
    // ctx.fillStyle = 'Green'
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    // ctx.fillStyle = 'white'
    // ctx.font = "80px Arial";
    // ctx.fillText("YOU WIN!!", canvas.width / 15, canvas.height / 4);
}

function draw() {
    if (gameOver) {
        audio.play()
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle();
        drawBricks()
        vaChamKhungCanvas();
        updateBall();
        vaChamThanhNgang();
        vaChamGach();
        requestAnimationFrame(draw);

    } else {
        if (GameWin) {
            gameOver1();
        } else {
            youWin();
        }
    }

}

if (begin) {
    start();
    begin = !begin;
} else {
    draw();
}
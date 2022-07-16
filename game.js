let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext('2d');
let ball = {
    x: Math.floor(Math.random() * 200) + 100,
    y: Math.floor(Math.random() * 100) + 200,
    dx: 5,
    dy: 4,
    radius: 8
}               //khai báo kích thước tọa độ bóng


let paddle = {
    width: 100,
    height: 15,
    x: Math.floor(Math.random() * 500),
    y: Math.floor(Math.random()*385)+300,
    speed: 60
}           //khai báo kích thước tọa độ của paddle.


let bricks = {
    offsetX: 25,
    offsetY: 40,
    margin: 25,
    width: 55,
    height: 7,
    totalRow: 5,
    totalCol: 6
}               //gạch
let audio = new Audio('audio/BlackPink.mp3')
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
    ctx.fillStyle = '#faf7fa'
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.fill()
    ctx.closePath()
}


function drawBricks() {
    bricksArray.forEach(function (a) {
        if (a.isBreak) {
            ctx.beginPath()
            ctx.fillStyle = '#ff6b02'
            ctx.fillRect(a.x, a.y, bricks.width, bricks.height)
            ctx.fill();
            ctx.closePath();
        }
    })
}

function updateBall() {
    ball.x = ball.x - ball.dx
    // console.log('dx', dx)
    ball.y += ball.dy;
    // console.log('dy',dy)
}

// function move(evt) {
//     if (evt.keyCode === 39) {
//         paddle.x += paddle.speed;
//         console.log('x+', paddle.x)//Cộng trừ tọa độ vẽ của paddle
//     }
//     if (evt.keyCode === 37) {
//         paddle.x -= paddle.speed;
//         console.log('x-', paddle.x)
//     }
//     if (paddle.x < 0) {          // Chặn 2 cạnh di chuyển của thanh ngang
//         paddle.x = 0
//         console.log('tọa độ Left x', paddle.x)
//     }
//     if (paddle.x > canvas.width - paddle.width) {
//         paddle.x = canvas.width - paddle.width
//         console.log('tọa độ Right', paddle.x)
//     }
// }
// window.addEventListener('keydown', move);

function moveLeft() {
    paddle.x = parseInt(paddle.x) - paddle.speed
}
function moveRight() {
    paddle.x = parseInt(paddle.x) + paddle.speed
}
function moveUp() {
    paddle.y = parseInt(paddle.y) - paddle.speed
}
function moveDown() {
    paddle.y = parseInt(paddle.y) + paddle.speed

}

function move1(abc) {
  switch (abc.keyCode) {
      case 37:
          moveLeft();
          break;
      case 39:
          moveRight();
          break;
      case 38:
          moveUp();
          break;
      case 40:
          moveDown();
          break;
  }
    if (paddle.x < 0) {          // Chặn 2 cạnh di chuyển của thanh ngang
        paddle.x = 0
        console.log('tọa độ Left x', paddle.x)
    }
    if (paddle.x > canvas.width - paddle.width) {
        paddle.x = canvas.width - paddle.width
        console.log('tọa độ Right', paddle.x)
    }
    if (paddle.y > canvas.height - paddle.height){
        paddle.y = canvas.height - paddle.height
    }
    if (paddle.y <= 300){
        paddle.y = 300
    }
}
window.addEventListener('keydown', move1)

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
    if (ball.x + ball.radius >= paddle.x && ball.x + ball.radius <= paddle.x + paddle.width && ball.y + ball.radius >= canvas.height - (canvas.height- paddle.y)
        && ball.y+ ball.radius <= paddle.y + paddle.height) {
        ball.dy = -ball.dy
    }
}

function vaChamGach() {
    bricksArray.forEach(function (a) {
        if (a.isBreak) {
            if (ball.x >= a.x && ball.x <= a.x + bricks.width && ball.y + ball.radius >= a.y &&
                ball.y - ball.radius <= a.y + bricks.height) {
                ball.dy = -ball.dy;
                a.isBreak = false;
                Point += 1;
                bom.play()
                console.log('diem======>', Point)
                // document.getElementById('point').innerHTML = Point
                if (Point === MaxPoint) {
                    // document.getElementById('point').innerHTML = 'You Win!!'
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
    ctx.fillText("Click here to start!", canvas.width / 10, 150);
    ctx.closePath();
}

function gameOver1() {
    audio.pause();
    over.play();
    let img = document.getElementById('loser');
    ctx.drawImage(img, 0, 0)
}

function youWin() {
    winner.play()
    audio.pause();
    let img1 = document.getElementById('winner');
    ctx.drawImage(img1, 0, 0)
}

function point() {
    if (Point === MaxPoint) {
        ctx.fillStyle = 'white'
        ctx.font = '25px Arial'
        ctx.fillText('YOU WIN ', canvas.width - 120, 50)
    } else {
        ctx.fillStyle = 'white'
        ctx.font = '15px Arial'
        ctx.fillText('Point: ', canvas.width - 80, 20)
        ctx.beginPath()
        ctx.fillStyle = 'orange'
        ctx.font = '20px Arial'
        ctx.fillText(Point, canvas.width - 30, 22)
    }

}

function reLoad() {
    window.location.reload();
}

function linePaddle() {
    ctx.strokeStyle = 'white'
    ctx.moveTo(0,300);
    ctx.lineTo(canvas.width,300);
    ctx.lineWidth = 3;
    ctx.stroke();
}

// function tatNhac() {
//     audio.stop();
// }

function main() {
    audio.play()
    if (gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        linePaddle()
        drawBall();
        drawPaddle();
        drawBricks()
        vaChamKhungCanvas();
        updateBall();
        vaChamThanhNgang();
        vaChamGach();
        point();
        requestAnimationFrame(main);

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
    main();
}
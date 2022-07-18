let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext('2d');
let count = 0;
let ball = {
    x: Math.floor(Math.random() * 200) + 100,
    y: Math.floor(Math.random() * 100) + 200,
    dx:2,
    dy:3,
    radius: 8
}               //khai báo kích thước tọa độ bóng


let paddle = {
    width: 100,
    height: 20,
    x: Math.floor(Math.random() * (canvas.width - 100)),
    y: Math.floor(Math.random()*200)+500,
    speed: 70,
    speedy: 50
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
let audio = new Audio('audio/funny.mp3')
let bom = new Audio('audio/hihi.mp3')
let over = new Audio('audio/over.mp3')
let winner = new Audio('audio/winner.mp3')
let audio2 = new Audio('audio/vacham.mp3')
let img = document.getElementById('loser');
let img1 = document.getElementById('winner');
let img2 = document.getElementById('point')
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

function drawPaddle() {
    ctx.beginPath()
    ctx.fillStyle = '#fd001e';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
    ctx.strokeStyle = 'white'
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height)

}

function drawBall() {
    ctx.beginPath();
    ctx.fillStyle = '#faf7fa'
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = 'red';
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath()
}

function linePaddle() {
    ctx.strokeStyle = 'white'
    ctx.moveTo(0,300);
    ctx.lineTo(canvas.width,300);
    ctx.lineWidth = 3;
    ctx.stroke();
}


function moveBall() {
    ball.x -=ball.dx;
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
    paddle.y = parseInt(paddle.y) - paddle.speedy
}
function moveDown() {
    paddle.y = parseInt(paddle.y) + paddle.speedy

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
      case 13:
          reLoad()
          break;
      case 32:
          main()
  }
    if (paddle.x < 0) {          // Chặn di chuyển của thanh đỡ
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
} // Di chuyển thanh đỡ

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
    if (ball.x + ball.radius > paddle.x && ball.x + ball.radius < paddle.x + paddle.width && ball.y + ball.radius > paddle.y
        && ball.y+ ball.radius < paddle.y + paddle.height) {
        ball.dy = - ball.dy
        bom.play();
        console.log('count:   ',count)

    }
}

function vaChamGach() {
    bricksArray.forEach(function (a) {
        if (a.isBreak) {
            if (ball.x + ball.radius >= a.x && ball.x + ball.radius <= a.x + bricks.width && ball.y + ball.radius >= a.y &&
                ball.y - ball.radius <= a.y + bricks.height) {
                ball.dy = -ball.dy;
                a.isBreak = false;
                Point += 1;
                count = count + 0.1
                audio2.play()
                console.log('diem======>', Point)
                console.log('count ===========>',count)
                // ball.dx = ball.dx + count;
                ball.dy = ball.dy + count *1.5;
                ball.radius = ball.radius + count;
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
    ctx.drawImage(img, 0, 0)
}

function youWin() {
    winner.play()
    audio.pause();
    ctx.drawImage(img1, 0, 0)
}

function point() {
    if (Point === MaxPoint) {
        ctx.fillStyle = 'white'
        ctx.font = '25px Arial'
        ctx.fillText('YOU WIN ', canvas.width - 120, 30)
    } else {
        ctx.drawImage(img2,30,0)
        ctx.beginPath()
        ctx.fillStyle = 'orange'
        ctx.font = '25px Arial'
        ctx.fillText(Point, canvas.width - 68, 27)
    }

}

function reLoad() {
    window.location.reload();
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
        moveBall();
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
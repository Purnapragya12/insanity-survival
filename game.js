let canvas=document.getElementById("game")

let ctx=canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=window.innerHeight

let player
let enemies=[]
let score=0
let best=localStorage.getItem("best") || 0
let difficulty=1
let running=false

function startGame(){

document.getElementById("menu").style.display="none"

init()

running=true

update()

}

function restart(){

location.reload()

}

function init(){

player={

x:canvas.width/2,

y:canvas.height/2,

size:18,

speed:7

}

}

let keys={}

document.addEventListener("keydown",e=>{

keys[e.key]=true

})

document.addEventListener("keyup",e=>{

keys[e.key]=false

})

canvas.addEventListener("touchmove",e=>{

player.x=e.touches[0].clientX
player.y=e.touches[0].clientY

})

function spawnEnemy(){

let side=Math.floor(Math.random()*4)

let e={

size:20,

speed:3+difficulty

}

if(side==0){

e.x=Math.random()*canvas.width
e.y=0

}

if(side==1){

e.x=canvas.width
e.y=Math.random()*canvas.height

}

if(side==2){

e.x=Math.random()*canvas.width
e.y=canvas.height

}

if(side==3){

e.x=0
e.y=Math.random()*canvas.height

}

enemies.push(e)

}

setInterval(()=>{

if(running){

spawnEnemy()

difficulty+=0.03

}

},800)

function movePlayer(){

if(keys["ArrowLeft"]) player.x-=player.speed

if(keys["ArrowRight"]) player.x+=player.speed

if(keys["ArrowUp"]) player.y-=player.speed

if(keys["ArrowDown"]) player.y+=player.speed

}

function drawPlayer(){

ctx.fillStyle="lime"

ctx.beginPath()

ctx.arc(player.x,player.y,player.size,0,6.28)

ctx.fill()

}

function drawEnemies(){

ctx.fillStyle="red"

enemies.forEach((e,i)=>{

let dx=player.x-e.x
let dy=player.y-e.y

let dist=Math.sqrt(dx*dx+dy*dy)

e.x+=dx/dist*e.speed
e.y+=dy/dist*e.speed

ctx.fillRect(e.x,e.y,e.size,e.size)

if(dist<player.size+e.size){

gameOver()

}

if(dist<60){

score+=2

}

})

}

function gameOver(){

running=false

if(score>best){

localStorage.setItem("best",score)

}

document.getElementById("finalScore").innerHTML=

"Score : "+score+"<br>Best : "+best

document.getElementById("gameOver").style.display="block"

}

function update(){

if(!running) return

ctx.clearRect(0,0,canvas.width,canvas.height)

movePlayer()

drawPlayer()

drawEnemies()

score++

document.getElementById("score").innerText=

"Score: "+score

requestAnimationFrame(update)

}
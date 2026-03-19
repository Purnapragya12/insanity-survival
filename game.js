let canvas=document.getElementById("game")

let ctx=canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=window.innerHeight

let player
let enemies=[]

let running=false

let startTime=0
let survivalTime=0

let bestTime=localStorage.getItem("bestTime") || 0

let difficulty=1

let keys={}

function startGame(){

document.getElementById("menu").style.display="none"

init()

startTime=Date.now()

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

size:16,

speed:7

}

}

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

size:18,

speed:2.5+difficulty

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

difficulty+=0.04

}

},700)

function movePlayer(){

if(keys["ArrowLeft"]) player.x-=player.speed

if(keys["ArrowRight"]) player.x+=player.speed

if(keys["ArrowUp"]) player.y-=player.speed

if(keys["ArrowDown"]) player.y+=player.speed

}

function drawPlayer(){

ctx.fillStyle="#22c55e"

ctx.beginPath()

ctx.arc(player.x,player.y,player.size,0,6.28)

ctx.fill()

}

function drawEnemies(){

ctx.fillStyle="#ef4444"

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

if(dist<55){

survivalTime+=0.02

}

})

}

function difficultyVisuals(){

if(survivalTime>20){

document.body.style.background="#100000"

}

if(survivalTime>40){

document.body.style.background="#1a0000"

}

if(survivalTime>60){

document.body.style.background="#2b0000"

}

if(survivalTime>80){

document.body.style.background="#3d0000"

}

}

function gameOver(){

running=false

if(survivalTime>bestTime){

bestTime=survivalTime.toFixed(1)

localStorage.setItem("bestTime",bestTime)

}

document.getElementById("finalScore").innerHTML=

"Time : "+survivalTime.toFixed(1)+"s<br>Best : "+bestTime+"s"

document.getElementById("gameOver").style.display="block"

}

function update(){

if(!running) return

ctx.clearRect(0,0,canvas.width,canvas.height)

movePlayer()

drawPlayer()

drawEnemies()

survivalTime=(Date.now()-startTime)/1000

difficultyVisuals()

document.getElementById("score").innerText=

"Time: "+survivalTime.toFixed(1)+"s"

requestAnimationFrame(update)

}

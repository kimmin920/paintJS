const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors =document.getElementsByClassName("controls__color");
const range = document.getElementById("jsRange");
const fillBtn = document.getElementById("jsMode");
const jsSave = document.getElementById("jsSave");

const INITIAL_COLOR = "black";
const CANVAS_SIZE = 500;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function changeBtnColor(){
    console.log(btns);
}

function stopPainting(){
    painting=false;
}
function startPainting(){
    painting=true;
}
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;    
 if(!painting){
     ctx.beginPath();
     ctx.moveTo(x, y);
     //위에 beginpath 와 moveto는 하나만 있어도 정상작동함 - 두개가 같지않은가?//
 } else{
     ctx.lineTo(x, y);
     ctx.stroke();
 }
}

function colorChange(event){
    let color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle= color;
    console.log(color);
}

function handleRange(event){
    let brush = event.target.value;
    ctx.lineWidth = brush;
}

function handleFill(event){
    
    if(!filling){
        filling = true;
        fillBtn.innerText = "paint!";
    }else{
        filling = false;
        fillBtn.innerText = "Fill";
    }
}
function HandleCanvasClick(){
    if(filling){
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}
function handleCM(event){
    event.preventDefault();
}
function handleSave(){
    const image = canvas.toDataURL("image/jpeg"); 
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS[export]";
    link.click();
}
if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",HandleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM)
}

Array.from(colors).forEach(color => color.addEventListener("click",colorChange));
                        //color 은 그저 array안에있는 각각하나의 element를 나타냄)

if(range){
range.addEventListener("input",handleRange);
}

if(fillBtn){
    fillBtn.addEventListener("click",handleFill);
}
if(jsSave){
    jsSave.addEventListener("click",handleSave);
}
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const canvasDim = {
    w: 1600,
    h: 800
}
const rodDim = {
    w: 4,
    h: canvasDim.h - 0.5 * canvasDim.h
}

const baseDim = {
    w: canvasDim.w - 0.2*canvasDim.w,
    h: 6
}

const DISK_COLORS = ['red','green','yellow','purple','orange','indigo','lightseagreen','olivedrab']

//every area for disks on the rod is devided by ten since 
const diskDimCell = canvasDim.w * 0.3 * 0.1
 
let nDisks = 4

let rods = [[],[],[]]

let diskData = {}

let firstClick = true

let select1 = null

let turn = 0

//Timer, pulled from codePen, belonging to Nate Nienaber
const minutesLabel = document.getElementById("minutes")
const secondsLabel = document.getElementById("seconds")
let totalSeconds = 0
setInterval(setTime, 1000);

function setTime(){
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds%60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
}

function pad(val){
    var valString = val + "";
    if(valString.length < 2){
        return "0" + valString;
    } else {
        return valString;
    }
}

// Setting canvas
function stageCanvas(){
    canvas.width = canvasDim.w
    canvas.height = canvasDim.h
    drawAll()
    // updateLoc(canvas.width,canvas.height)
}
stageCanvas()

// Window size function for detection WORK IN PROGRESS
// function windowSize(){
//     const w = document.documentElement.clientWidth
//     const h = document.documentElement.clientHeight
//     console.log(w, h)
//     canvasDim.w = w * 0.75
//     canvasDim.h = h * 0.75
//     stageCanvas()
//     spawnDisks()
// }
// window.addEventListener('resize',windowSize)
// function updateLoc(w,h) {
// }


// Level selection
function levels(n){
    nDisks = n
    // rods = [[],[],[]]
    // diskData = {}
    firstClick = true
    spawnDisks()
}

// Turn Counter
function turnCounter(){
    turn += 1
    const trn = document.querySelector(".turn")
    trn.innerText = `${turn} turn`

}

function spawnDisks(){
    rods = [[],[],[]]
    diskData = {}
    for (let i = nDisks - 1; i >= 0 ; i--) {
        rods[0].push(i)
        
        diskData[i] = {}
                
        const centerX = (0.25 * canvasDim.w)
        diskData[i].x = centerX - (((i+1) * diskDimCell)/2)
        diskData[i].y = canvasDim.h - baseDim.h - ((nDisks - i) * diskDimCell)
        diskData[i].color = DISK_COLORS[i]
    }
    // console.log(rods)
    // console.log(diskData)
    turn = -1
    turnCounter()
    totalSeconds = 0
    drawAll()
}

canvas.addEventListener('click',(event) => {
    // console.log(event)
    if (firstClick === true) {
        firstClick = false
        if ((event.clientX >= canvasDim.w / 8) && (event.clientX < canvasDim.w * 3 / 8)) {
            select1 = 0
        } else if((event.clientX  >= canvasDim.w * 3 / 8) && (event.clientX < canvasDim.w * 5 / 8)) {
            select1 = 1
        } else if((event.clientX  >= canvasDim.w * 5 / 8) && (event.clientX < canvasDim.w * 7 / 8)){
            select1 = 2
        } else{
            console.log('pepega');
        }

        if(rods[select1].length == 0){
            firstClick = true
        }
        
    } else {
        firstClick = true
        if ((event.clientX >= canvasDim.w / 8) && (event.clientX < canvasDim.w * 3 / 8)) {
            move(select1, 0)

        } else if((event.clientX  >= canvasDim.w * 3 / 8) && (event.clientX < canvasDim.w * 5 / 8)) {
            move(select1, 1)

        } else if((event.clientX  >= canvasDim.w * 5 / 8) && (event.clientX < canvasDim.w * 7 / 8)) {
            move(select1, 2)

        } else{
            console.log('pepega');
        }
    }
    drawAll()
})


function move (rodid1 = null, rodid2 = null){
    if (rodid1 !== null) {
        if (rodid2 !== null) {         
            if ((rods[rodid1][(rods[rodid1].length - 1)]) < (rods[rodid2][rods[rodid2].length-1]) || (rods[rodid2].length == 0 && rods[rodid1].length !==0)) {
                const lastElement = rods[rodid1].pop()
                rods[rodid2].push(lastElement)
                // console.log(lastElement)
                // console.log(rods)
                // console.log('reSpawn')
                turnCounter()
                return  reSpawn(lastElement,rodid2)
            } else{
                console.log(`rules`)
            }
        } else{
            console.log(`wait for 2nd click`)
        }
    } else{
        console.log(`nothing clicked`)
    }
    
}

function reSpawn(rectId,rodI){
    const centerX = (0.25 * (rodI + 1) * canvasDim.w)
    diskData[rectId].x =  centerX - (((rectId + 1) * diskDimCell)/2)
    diskData[rectId].y = canvasDim.h - baseDim.h - ((rods[rodI].length) * diskDimCell)
    drawAll()
}




function drawAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBackground()
    for (const [key, value] of Object.entries(diskData)) {
        const startX = value.x
        const startY = value.y
        ctx.fillStyle = value.color
        ctx.fillRect(startX, startY, diskDimCell*(parseInt(key)+1), diskDimCell)
        // console.log(key)
        
        // if (select1 !== null) {
        //     console.log(rods[select1]);
        //     // console.log(rods[select1[rods[select1].length - 1]]);
            
        // }
        // if (select1 !== null && key === rods[select1[rods.length - 1]]) {
        //     console.log('run');
        //     ctx.strokeStyle = 'blue';
        //     ctx.lineWidth = 5;
        //     ctx.strokeRect(startX, startY, diskDimCell*(parseInt(key)+1), diskDimCell);
        // }
        
    }   
      
}

function drawBackground(){
    
    for (let rodN = 1; rodN <= 3; rodN++) {
        const rodStartX = (0.25 * rodN * canvasDim.w) - (rodDim.w/2)
        const rodStartY = canvasDim.h - rodDim.h
        ctx.fillStyle = 'black'
        ctx.fillRect(rodStartX, rodStartY, rodDim.w, rodDim.h)
    }
    const baseStartX = (canvasDim.w - baseDim.w)/2
    const baseStartY = canvasDim.h - baseDim.h

    ctx.fillRect(baseStartX, baseStartY, baseDim.w, baseDim.h)

}

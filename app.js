const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const canvasDim = {
    w: 800,
    h: 400
}
const rodDim = {
    w: 4,
    h: 120
}

const baseDim = {
    w: 780,
    h: 6
}

const DISK_COLORS = ['red','green','yellow','purple','orange','indigo','lightseagreen','olivedrab']

//every area for disks on the rod is devided by ten since 
const diskDimCell = canvasDim.w * 0.3 * 0.1
 
const nDisks = 8

let rods = [[],[],[]]

let diskData = {}

let firstClick = true

// setting canvas
function stageCanvas(){
    canvas.width = canvasDim.w
    canvas.height = canvasDim.h

}
stageCanvas()

function spawnDisks(nDisks){
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
    console.log(rods)
    console.log(diskData)
    drawAll()
}



let select1 = null
canvas.addEventListener('click',(event) => {
    console.log(event)
    // ctx.fillRect(event.clientX, event.clientY, 150, 100)
    // console.log(canvasDim.w / 8);
    // console.log(canvasDim.w * 3 / 8)
    
    if (firstClick === true) {
        firstClick = false
        if ((event.clientX >= canvasDim.w / 8) && (event.clientX < canvasDim.w * 3 / 8)) {
            select1 = 0
        

        } else if((event.clientX  >= canvasDim.w * 3 / 8) && (event.clientX < canvasDim.w * 5 / 8)) {
            select1 = 1
            

        } else if((event.clientX  >= canvasDim.w * 5 / 8) && (event.clientX < canvasDim.w * 7 / 8)) {
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

    // console.log(click1);
    // save which click it is
})


function move (rodid1 = null, rodid2 = null){
    if (rodid1 !== null) {
        console.log(rodid1,rodid2)
        if (rodid2 !== null) {
            console.log(`both clicked`);
            
            if ((rods[rodid1][(rods[rodid1].length - 1)]) < (rods[rodid2][rods[rodid2].length-1]) || (rods[rodid2].length == 0 && rods[rodid1].length !==0)) {
                const lastElement = rods[rodid1].pop()
                rods[rodid2].push(lastElement)
                console.log(lastElement)
                console.log(rods);
                console.log('reSpawn');

                return  reSpawn(lastElement,rodid2)
                
            } else{
                console.log(`rules`);
                
            }
        } else{
            console.log(`wait for 2nd click`);
        }
    } else{
        console.log(`nothing clicked`);
        console.log(rods[rodid1],rods[rodid2])
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

// Variables
const canvas = document.querySelector('.custom-canvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const startingPositions = [0, 1, 2, 3];
const startionPositionSize = startingPositions.length;
const nodeStartingDeviation = 32;
const nodeCount = 64;
const alphaIncrement = 0.03;
let nodes = [];
const  ball_color = {
    r: 0,
    g: 67,
    b: 194
};
let originX = -1;
let originY = -1;
const originRadius = 64;
const connectionDistanceThreshold = 256;

// Setup Canvas
window.addEventListener('resize', function(e){
    console.log('Window Resize...');
    initialize();
});
window.requestAnimationFrame(render);
ctx.fillStyle = '#1D1D1D';
ctx.fillRect(0, 0, width, height);

// Set A Timeout Before Starting
window.setTimeout( initialize, 4 );

function initialize(){
    for(let i = 1; i <= nodeCount; i++){
        nodes.push(createNode());
    }
}

// Render
function render(){
    ctx.clearRect(0, 0, width, height);
    renderNodes();
    renderConnectionss();
    renderOrigin();
    updateNodes();
    populateNodes();
    window.requestAnimationFrame(render);
}

function renderOrigin(){
    originX = width / 2 + originRadius / 4;
    originY = height / 2 + originRadius / 4;
    const grd = ctx.createLinearGradient(originX - originRadius, originY - originRadius, originX + originRadius, originY + originRadius);
    grd.addColorStop(0, '#960ac8');
    grd.addColorStop(1, '#0043c2');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(originX, originY, originRadius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

function renderNodes(){
    Array.prototype.forEach.call(nodes, function(b){
        if(!b.hasOwnProperty('type')){
            ctx.fillStyle = 'rgba('+b.color.r+','+b.color.g+','+b.color.b+','+b.alpha+')';
            ctx.beginPath();
            ctx.arc(b.x, b.y, 4, 0, Math.PI*2, true);
            ctx.closePath();
            ctx.fill();
        }
    });
}

// calculate distance between two points
function getDistance(b1, b2){
    const  delta_x = Math.abs(b1.x - b2.x),
        delta_y = Math.abs(b1.y - b2.y);

    return Math.sqrt(Math.pow(delta_x, 2) + Math.pow(delta_y, 2));
}

function isNodeClosed(node, open, closed) {
    return open.indexOf(node) > -1 || closed.indexOf(node) > -1;
}

function renderConnectionss(){
    nodes.forEach((n) => {
       n.connected = false;
    });
    let fraction, alpha;
    const open = [];
    const closed = [];
    const origin = {x: originX, y: originY, color: {r: ball_color.r, g: ball_color.g, b: ball_color.b}, alpha: 0.8};
    let threshold = connectionDistanceThreshold;

    for(let j = 0; j < nodes.length; j++) {
        const n = nodes[j];
        if(!isNodeClosed(n, open, closed)) {
            fraction = getDistance(origin, n);
            if(fraction > 0 && Math.abs(fraction) < threshold){
                alpha = (1 - fraction / threshold).toString();

                const grd = ctx.createLinearGradient(origin.x, origin.y, n.x, n.y);
                grd.addColorStop(0, 'rgba('+origin.color.r+','+origin.color.g+','+origin.color.b+','+origin.alpha+')');
                grd.addColorStop(1, 'rgba('+n.color.r+','+n.color.g+','+n.color.b+','+n.alpha+')');
                ctx.strokeStyle = grd;
                ctx.lineWidth = 2;

                ctx.beginPath();
                ctx.moveTo(origin.x, origin.y);
                ctx.lineTo(n.x, n.y);
                ctx.stroke();
                ctx.closePath();
                open.push(n);
            }
        }
    }

    while (open.length > 0) {
        const added = [];
        for (let i=0; i < open.length; ++i) {
            const o = open[i];
            let pollDistance = -1;
            let pollIndex = -1;
            for(let j = 0; j < nodes.length; j++) {
                const n = nodes[j];
                if(!isNodeClosed(n, open, closed)) {
                    fraction = getDistance(o, n);
                    if(fraction > 0 && Math.abs(fraction) < threshold && pollDistance < 0 || pollDistance > fraction){
                        pollDistance = fraction;
                        pollIndex = j;

                    }
                }
            }
            if(pollIndex > 0) {
                const n = nodes[pollIndex];
                alpha = (1 - pollDistance / threshold).toString();

                const grd = ctx.createLinearGradient(o.x, o.y, n.x, n.y);
                grd.addColorStop(0, 'rgba('+o.color.r+','+o.color.g+','+o.color.b+','+o.alpha+')');
                grd.addColorStop(1, 'rgba('+n.color.r+','+n.color.g+','+n.color.b+','+n.alpha+')');
                ctx.strokeStyle = grd;
                ctx.lineWidth = 2;

                ctx.beginPath();
                ctx.moveTo(o.x, o.y);
                ctx.lineTo(n.x, n.y);
                ctx.stroke();
                ctx.closePath();
                n.connected = true;
                added.push(n);
            }
            closed.push(o);
            open.splice(i, 1);
            --i; // Correct the index value
        }
        added.forEach((a) => {
            open.push(a);
        });
    }
}

function populateNodes(){
    if(nodes.length < nodeCount){
        nodes.push(createNode());
    }
}

function createNode() {
    const min = 0;
    const max = 10;
    return {
        x: getXAxisLocation(),
        y: getYAxisLocation(),
        vx: getRandomSpeed(0)[0],
        vy: getRandomSpeed(0)[1],
        r: nodeStartingDeviation,
        alpha: 1,
        color: {r: getRandom(0, 255), g: getRandom(0, 255), b: getRandom(0, 255)},
        phase: getRandom(min, max),
        connected: false
    }
}

// Update balls
function updateNodes(){
    const new_balls = [];
    Array.prototype.forEach.call(nodes, function(b){
        b.x += b.vx;
        b.y += b.vy;

        if(b.x > -(50) && b.x < (width+50) && b.y > -(50) && b.y < (height+50)){
            new_balls.push(b);
        }

        // alpha change
        b.phase += alphaIncrement;
        b.alpha = Math.abs(Math.cos(b.phase));
        // console.log(b.alpha);
    });

    nodes = new_balls.slice(0);
}

function getRandomSpeed(){
    const min = -1;
    const max = 1;
    return [getRandom(min, max), getRandom(min, max)];
}

function getRandom(min, max) {
    return Math.random()*(max - min) + min;
}

function getXAxisLocation() {
    const centerX = width / 2;
    return getRandom(centerX - nodeStartingDeviation, centerX + nodeStartingDeviation)
}

function getYAxisLocation() {
    const centerY = height / 2;
    return getRandom(centerY - nodeStartingDeviation, centerY + nodeStartingDeviation)
}

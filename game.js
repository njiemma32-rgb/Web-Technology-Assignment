const c = document.createElement("canvas");
c.width = 800;
c.height = 400;
document.body.style.background = "black";
document.body.appendChild(c);
const ctx = c.getContext("2d");

let p = {x:100,y:305,vy:0};
let obs = [], score = 0, speed = 5, over = false;

document.onkeydown = e => {
    if ((e.code === "Space" || e.code === "ArrowUp") && p.y >= 305 && !over) p.vy = -12;
    if (e.key.toLowerCase() === "r" && over) location.reload();
};

function game() {
    ctx.fillStyle = "#35150f";
    ctx.fillRect(0,0,800,400);

    ctx.fillStyle = "#d17b50";
    ctx.fillRect(0,330,800,70);

    if (!over) {
        p.vy += 0.6;
        p.y += p.vy;
        if (p.y > 305) {p.y = 305; p.vy = 0;}

        if (Math.random() < 0.018) {
            let type = ["spike","pit","car","block"][Math.floor(Math.random()*4)];
            obs.push({x:800,type});
        }

        obs.forEach(o => o.x -= speed);

        obs = obs.filter(o => o.x > -150);
        speed += 0.001;
        score++;

        obs.forEach(o => {
            let h = o.type === "car" ? 45 : o.type === "block" ? 45 : 30;
            let w = o.type === "pit" ? 100 : o.type === "car" ? 80 : 40;

            ctx.fillStyle = o.type === "car" ? "red" : "black";

            if (o.type === "pit") {
                ctx.fillRect(o.x,330,w,70);
                if (p.x+20 > o.x && p.x < o.x+w && p.y >= 305) over = true;
            } else {
                if (o.type === "spike") {
                    ctx.beginPath();
                    ctx.moveTo(o.x,330);
                    ctx.lineTo(o.x+20,300);
                    ctx.lineTo(o.x+40,330);
                    ctx.fill();
                } else ctx.fillRect(o.x,330-h,w,h);

                if (p.x+20 > o.x && p.x < o.x+w && p.y+25 > 330-h) over = true;
            }
        });
    }

    // Stickman
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(p.x+10,p.y+5,5,0,7);
    ctx.fill();
    ctx.fillRect(p.x+8,p.y+10,4,10);
    ctx.fillRect(p.x+3,p.y+20,3,7);
    ctx.fillRect(p.x+14,p.y+20,3,7);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: "+Math.floor(score/10),20,30);

    if (over) {
        ctx.fillStyle = "red";
        ctx.font = "40px Arial";
        ctx.fillText("GAME OVER!",280,180);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Press R to restart",310,220);
    }

    requestAnimationFrame(game);
}
game();
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = Math.random() > 0.5 ? '#00d4ff' : '#8a2be2';
    }
    update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.005;
        if (this.size <= 0.3) { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.size = Math.random() * 2 + 1; }
    }
    draw() { ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
}

function init() { for (let i = 0; i < 100; i++) particles.push(new Particle()); }
function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); }
init(); animate();

function toggleMenu() { document.getElementById('navLinks').classList.toggle('active'); }

function selectGuild(name, isLocked = false) {
    const savedGuild = localStorage.getItem('myGuild');
    
    if (savedGuild) {
        if (savedGuild === name && !isLocked) { return true; } 
        else {
            alert("⚠️ نظام سـونـغ جـيـن وو: لقد اخترت ولاءك بالفعل لنقابة [" + savedGuild + "]. لا يمكن تغيير القدر.");
            if (window.event) window.event.preventDefault();
            return false;
        }
    } else {
        localStorage.setItem('myGuild', name);
        if (isLocked) {
            alert("⚠️ لقد اخترت الولاء لنقابة [" + name + "] وهي مغلقة حالياً. لقد ضاع مستقبلك.");
            if (window.event) window.event.preventDefault();
            return false;
        } else {
            alert("✅ تم الاستيقاظ: أنت الآن فرد من " + name + ".");
            return true;
        }
    }
}

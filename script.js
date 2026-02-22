const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

let particles = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.color = Math.random() > 0.5 ? '#00d4ff' : '#8a2be2';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particles = [];
    for (let i = 0; i < 70; i++) particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
init(); animate();

// نظام الولاء المطور
function selectGuild(name, isLocked = false) {
    if (isLocked) {
        branchClosed(`نقابة ${name}`);
        return;
    }
    localStorage.setItem('myGuild', name);
    alert(`✅ تم الاستيقاظ! النظام يعترف بك الآن كعضو في [${name}].`);
    if (name === 'Eclipse') {
        window.open("https://chat.whatsapp.com/J3ebo43vwzjBlMfViL5EJ5", "_blank");
    }
}

function branchClosed(name) {
    if (confirm(`⚠️ الفرع [${name}] قيد الإنشاء حالياً.\n\nهل تريد مراسلة الحاكم مباشرة؟`)) {
        window.open("https://wa.me/96597805334", "_blank");
    }
}

function checkLoyalty(branch) {
    const saved = localStorage.getItem('myGuild');
    if (!saved) {
        alert("⚠️ يجب عليك إعلان ولاؤك لنقابة أولاً قبل دخول هذا الفرع!");
        window.location.href = "#guilds";
        return;
    }
    branchClosed(branch);
}

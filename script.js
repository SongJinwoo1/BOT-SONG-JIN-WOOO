const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize); resize();
let particles = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5; this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2; this.color = Math.random() > 0.5 ? '#00d4ff' : '#8a2be2';
    }
    update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() { ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
}
function init() { for (let i = 0; i < 60; i++) particles.push(new Particle()); }
function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); }
init(); animate();

function toggleSlide(id, btn, textOpen, textClose) {
    const content = document.getElementById(id);
    content.classList.toggle('active');
    btn.innerText = content.classList.contains('active') ? textClose : textOpen;
}

function selectGuild(name, isLocked = false) {
    const saved = localStorage.getItem('myGuild');
    if (saved && saved !== name) { alert("⚠️ لا يسمح بتغيير الولاء! انتمائك لـ " + saved); return; }
    if (isLocked) { alert("⚠️ مغلق حالياً."); return; }
    localStorage.setItem('myGuild', name);
    alert("✅ تم إعلان الولاء لـ " + name);
    if (name === 'Eclipse') window.open("https://chat.whatsapp.com/J3ebo43vwzjBlMfViL5EJ5");
}

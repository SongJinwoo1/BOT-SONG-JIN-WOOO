const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
let particles = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1; this.speedX = Math.random() * 1 - 0.5; this.speedY = Math.random() * 1 - 0.5;
        this.color = Math.random() > 0.5 ? '#00d4ff' : '#8a2be2';
    }
    update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.005;
        if (this.size <= 0.3) { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.size = Math.random() * 2 + 1; }
    }
    draw() { ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
}
function init() { for (let i = 0; i < 120; i++) particles.push(new Particle()); }
function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); }
init(); animate();

function selectGuild(name, isLocked = false) {
    const saved = localStorage.getItem('myGuild');
    if (saved) {
        if (saved === name && !isLocked) return true;
        alert("⚠️ نظام سـونـغ جـيـن وو: لقد اخترت ولاءك بالفعل لـ [" + saved + "]. لا يمكن تغيير القدر.");
        if (window.event) window.event.preventDefault(); return false;
    }
    localStorage.setItem('myGuild', name);
    if (isLocked) { alert("⚠️ اخترت نقابة مغلقة [" + name + "]. تم قفل قدرك."); if (window.event) window.event.preventDefault(); return false; }
    alert("✅ تم الاستيقاظ: أنت الآن فرد من " + name + "."); return true;
}

function checkLoyalty(branch) {
    const saved = localStorage.getItem('myGuild');
    if (!saved) {
        alert("⚠️ خطأ في الوصول: يجب اختيار ولاءك في قاعة النقابات أولاً لدخول " + branch);
        if (window.event) window.event.preventDefault(); return false;
    }
    alert("✅ جاري التحقق... أهلاً بك يا عضو " + saved + ". يتم فتح " + branch); return true;
}

function toggleMenu() { document.getElementById('navLinks').classList.toggle('active'); }

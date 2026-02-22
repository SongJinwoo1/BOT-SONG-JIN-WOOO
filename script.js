// --- محرك الجزيئات ---
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
    update() { this.x += this.speedX; this.y += this.speedY; if (this.size > 0.2) this.size -= 0.005; }
    draw() { ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
}
function init() { for (let i = 0; i < 80; i++) particles.push(new Particle()); }
function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); }
init(); animate();

// --- نظام الولاء المطور ---
function selectGuild(name, isLocked = false) {
    if (isLocked) {
        branchClosed(`نقابة ${name}`);
        return;
    }

    // الخطوة 1: الحفظ الفوري في ذاكرة المتصفح
    localStorage.setItem('myGuild', name);
    
    // الخطوة 2: تنبيه المستخدم بالنجاح
    alert(`✅ تم الاستيقاظ! النظام يعترف بك الآن كعضو في [${name}].`);

    // الخطوة 3: التوجيه للرابط يدوياً لضمان عدم ضياع البيانات
    if (name === 'Eclipse') {
        window.open("https://chat.whatsapp.com/J3ebo43vwzjBlMfViL5EJ5", "_blank");
    }
}

function branchClosed(name) {
    const msg = `⚠️ الفرع [${name}] قيد الاستدعاء من العدم (قريباً).\n\nهل تود مراسلة الحاكم مباشرة؟`;
    if (confirm(msg)) {
        window.open("https://wa.me/96597805334", "_blank");
    }
}

function checkLoyalty(branch) {
    const saved = localStorage.getItem('myGuild');
    if (!saved) {
        alert("⚠️ خطأ: يجب عليك إعلان ولاؤك لنقابة أولاً!");
        window.location.href = "#guilds";
        return;
    }
    branchClosed(branch);
}

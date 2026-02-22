// --- محرك جزيئات المانا ---
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

// --- نظام التحكم في الفروع وهيبة الظلال ---
function branchClosed(branchName) {
    const shadowMessage = `
    ⚠️ تنبيه من نظام الظلال:
    --------------------------
    الفرع: [ ${branchName} ]
    الحالة: قيد الاستدعاء من العدم.. (قريباً)
    
    عذراً أيها الصياد، "سـونـغ جـيـن وو" لم يأمر بفتح هذه البوابة بعد. 
    إذا كنت تستعجل القوة، تواصل مع الحاكم مباشرة.
    `;
    if (confirm(shadowMessage + "\n\nهل تريد فتح بوابة التواصل مع الحاكم الآن؟")) {
        window.open("https://wa.me/96597805334", "_blank"); // رقمك المسجل [cite: 2026-02-21]
    }
}

function selectGuild(name, isLocked = false) {
    if (isLocked) { branchClosed(`نقابة ${name}`); return false; }
    const saved = localStorage.getItem('myGuild');
    if (saved) { alert(`⚠️ النظام: ولاؤك محجوز بالفعل لنقابة [${saved}].`); return false; }
    localStorage.setItem('myGuild', name);
    alert(`✅ تم الاستيقاظ! أهلاً بك في صفوف ${name}.`); return true;
}

function checkLoyalty(branch) {
    const saved = localStorage.getItem('myGuild');
    if (!saved) { alert(`⚠️ خطأ نظام: الوصول لـ ${branch} يتطلب اختيار نقابة أولاً!`); return false; }
    const closedBranches = ['المتجر', 'SYS', 'التصنيف', 'الأوامر'];
    if (closedBranches.includes(branch)) { branchClosed(branch); return false; }
    return true;
}

// --- إعدادات الخلفية (جزيئات زرقاء وبنفسجية) ---
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize); resize();

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
        this.x += this.speedX; this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() { ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
}
function init() { for (let i = 0; i < 70; i++) particles.push(new Particle()); }
function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); }
init(); animate();

// --- نظام الولاء (المحمي - لم يتم تعديله) ---
function selectGuild(name, isLocked = false) {
    const saved = localStorage.getItem('myGuild');
    if (saved && saved !== name) {
        alert("⚠️ النظام لا يسمح بتغيير الولاء! أنت تنتمي بالفعل لنقابة " + saved);
        return;
    }
    if (isLocked) { branchClosed(`نقابة ${name}`); return; }
    localStorage.setItem('myGuild', name);
    alert(`✅ تم الاستيقاظ! النظام يعترف بك الآن كعضو في [${name}].`);
    if (name === 'Eclipse') window.open("https://chat.whatsapp.com/J3ebo43vwzjBlMfViL5EJ5", "_blank");
}

// --- الوظائف الجديدة (التطويرات والتعريف) ---
function toggleDevButtons() {
    const sub = document.getElementById('dev-sub-buttons');
    const btn = document.getElementById('dev-main-btn');
    if (sub.style.display === 'none' || sub.style.display === '') {
        sub.style.display = 'flex'; btn.innerText = 'إغلاق المجمع';
    } else {
        sub.style.display = 'none'; btn.innerText = 'فتح المجمع';
    }
}

function showGuildInfo(guild) {
    if (guild === 'Eclipse') {
        alert("🛡️ نقابة اكليبس:\nتأسست عام 2022، هي المملكة العريقة في إقليم فـالكـيـري. تتميز بتفاعل أسطوري وجوائز مادية للمتفاعلين.");
    } else if (guild === 'Espada') {
        alert("⚔️ نقابة اسبادا:\nفرع إقليمي جديد تحت التطوير، مخصص لنخبة المقاتلين في نظام الظلال.");
    }
}

function branchClosed(name) {
    if (confirm(`⚠️ الفرع [${name}] قيد الإنشاء حالياً.\nهل تريد مراسلة الحاكم؟`)) {
        window.open("https://wa.me/965997805334", "_blank");
    }
}

function checkLoyalty(branch) {
    const saved = localStorage.getItem('myGuild');
    if (!saved) { alert("⚠️ أعلن ولاؤك أولاً!"); window.location.href = "#guilds"; return; }
    branchClosed(branch);
}

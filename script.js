// 🌌 نظام مانا الخلفية (أزرق وبنفسجي)
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize); resize();
let particles = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5; this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2; this.color = Math.random() > 0.5 ? '#00d4ff' : '#8a2be2';
    }
    update() { this.x += this.speedX; this.y += this.speedY; }
    draw() { ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
}
function init() { for (let i = 0; i < 45; i++) particles.push(new Particle()); }
function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); }
init(); animate();

// ⚔️ نظام إيغريس والنفي الزمني
let patience = 3;
const BAN_DURATION = 24 * 60 * 60 * 1000;

function askIgris() {
    const q = document.getElementById('user-q').value.trim();
    const reply = document.getElementById('shadow-reply');
    if (!q) return;

    if (q.length < 4) {
        patience--;
        if (patience <= 0) {
            reply.innerText = "لقد أهنت العرش بتفاهتك. اعتذر الآن أو واجه النفي!";
            document.getElementById('input-zone').style.display = "none";
            document.getElementById('lock-zone').style.display = "block";
        } else { reply.innerText = `تحدث بوقار.. بقيت لك ${patience} فرص.`; }
    } else {
        reply.innerText = "سجلت كلماتك في سجلات الظل.. هل لديك طلب للملك؟";
    }
    document.getElementById('user-q').value = "";
}

function apologize() {
    const txt = document.getElementById('apology-input').value;
    if (txt.includes("أعتذر") || txt.includes("اعتذر") || txt.includes("آسف")) {
        let count = parseInt(localStorage.getItem('apology_count') || 0) + 1;
        localStorage.setItem('apology_count', count);
        if (count >= 3) {
            localStorage.setItem('shadow_ban_end', new Date().getTime() + BAN_DURATION);
            applyBan();
        } else {
            patience = 3;
            document.getElementById('lock-zone').style.display = "none";
            document.getElementById('input-zone').style.display = "block";
            document.getElementById('shadow-reply').innerText = `قُبل اعتذارك (${count}/3). احذر من الثالثة!`;
        }
    }
}

function applyBan() {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    document.getElementById('content-wrapper').style.opacity = "0.1";
    document.getElementById('content-wrapper').style.pointerEvents = "none";
    document.getElementById('main-nav').style.display = "none";
    document.getElementById('input-zone').style.display = "none";
    document.getElementById('lock-zone').style.display = "none";
    document.getElementById('ban-zone').style.display = "block";
    document.getElementById('shadow-reply').innerText = "تم نفيك من المملكة لمدة 24 ساعة.. ارحل.";
    startTimer();
}

function startTimer() {
    const timerDisplay = document.getElementById('timer-display');
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const endTime = parseInt(localStorage.getItem('shadow_ban_end'));
        const distance = endTime - now;
        if (distance <= 0) {
            clearInterval(interval);
            localStorage.removeItem('shadow_ban_end');
            localStorage.setItem('apology_count', 0);
            location.reload();
            return;
        }
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        timerDisplay.innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// 🛡️ درع الحماية الخفي (Anti-Hacker)
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I") || (e.ctrlKey && e.key === "u")) {
        e.preventDefault();
    }
});
setInterval(() => { debugger; }, 100);

// التحقق من الحالة عند الفتح
window.onload = function() {
    const banEnd = localStorage.getItem('shadow_ban_end');
    if (banEnd && new Date().getTime() < parseInt(banEnd)) { applyBan(); }
};

function toggleSlide(id, btn, openT, closeT) {
    const el = document.getElementById(id); el.classList.toggle('active');
    btn.innerText = el.classList.contains('active') ? closeT : openT;
}

function sendSuggestion() {
    window.open("https://wa.me/965997805334?text=أيها الملك، لدي اقتراح للنسخة الجديدة: ");
}

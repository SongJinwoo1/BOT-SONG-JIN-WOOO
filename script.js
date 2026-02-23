// نظام خلفية المانا (أزرق وبنفسجي)
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
function init() { for (let i = 0; i < 50; i++) particles.push(new Particle()); }
function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); }
init(); animate();

// نظام ذكاء الفارس إيغريس
let patience = 3;
function askIgris() {
    const q = document.getElementById('user-q').value.trim();
    const reply = document.getElementById('shadow-reply');
    const inputZone = document.getElementById('input-zone');
    const navOptions = document.getElementById('nav-options');

    if (!q) return;

    // ردود إيغريس الموقرة عن الملك
    if (q.includes("منشئ") || q.includes("صاحب") || q.includes("من صنعك") || q.includes("من الملك")) {
        reply.innerText = "هذا الصرح شُيّد بأمر جلالة الملك سونغ جين وو. أنا سيفه المخلص وحارس عهده.. هل ترغب في محادثته؟";
        navOptions.style.display = "flex";
        return;
    }

    if (q.length < 5) {
        patience--;
        if (patience <= 0) {
            reply.innerText = "لقد أسأت الأدب في حضرة العرش. اختفِ فوراً ولا تظهر ثانية.";
            inputZone.style.display = "none";
            document.getElementById('lock-zone').style.display = "block";
            return;
        }
        reply.innerText = `التزم وقار الفرسان.. أمامك ${patience} تنبيهات قبل النفي.`;
    } else {
        reply.innerText = "سجلت كلماتك بوقار.. هل تود التواصل مع الملك أم الانتقال لسجلات النظام؟";
        navOptions.style.display = "flex";
    }
}

// طقوس الاعتذار لفك الحظر
function apologize() {
    const txt = document.getElementById('apology-input').value;
    if (txt.includes("أعتذر") || txt.includes("اعتذر") || txt.includes("آسف")) {
        patience = 3;
        document.getElementById('lock-zone').style.display = "none";
        document.getElementById('input-zone').style.display = "block";
        document.getElementById('shadow-reply').innerText = "تم قبول اعتذارك بأمر من الملك. لا تكرر حماقتك ثانية.";
    }
}

function toggleSlide(id, btn, openT, closeT) {
    const el = document.getElementById(id); el.classList.toggle('active');
    btn.innerText = el.classList.contains('active') ? closeT : openT;
}

function sendSuggestion() {
    window.open("https://wa.me/965997805334?text=أيها الملك، لدي اقتراح لتطوير المقر: ");
}

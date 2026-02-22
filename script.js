// --- إعداد نظام مانا الجزيئات (أزرق وبنفسجي) ---
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
        // تطبيق رؤية القائد: تناثر جزيئات زرقاء وبنفسجية
        this.color = Math.random() > 0.5 ? '#00d4ff' : '#8a2be2';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        // الحفاظ على حجم الجزيئات لضمان استمرار الطاقة في الخلفية
        if (this.size > 0.2) this.size -= 0.005;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        // إعادة توليد الجزيئات المختفية للحفاظ على كثافة المانا
        if (particles[i].size <= 0.3) {
            particles.splice(i, 1);
            i--;
            particles.push(new Particle());
        }
    }
}

function init() {
    particles = [];
    for (let i = 0; i < 100; i++) particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

// --- نظام التحكم في القائمة (Mobile Menu) ---
function toggleMenu() { 
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.toggle('active'); 
}

// --- نظام اختيار الولاء (النقابات) ---
function selectGuild(name) {
    const savedGuild = localStorage.getItem('myGuild');
    if (savedGuild) {
        alert("النظام: لقد اخترت ولاءك بالفعل لنقابة " + savedGuild);
        // منع أي إجراء إضافي إذا كان الولاء مسجلاً
        return false;
    } else {
        localStorage.setItem('myGuild', name);
        alert("النظام: تم تسجيل ولائك لنقابة " + name + ". استعد للارتقاء.");
    }
}

// --- نظام التمرير السلس (Smooth Scroll) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth' });
            // إغلاق القائمة تلقائياً في الجوال بعد اختيار القسم
            if (window.innerWidth <= 768) {
                const navLinks = document.getElementById('navLinks');
                if (navLinks.classList.contains('active')) toggleMenu();
            }
        }
    });
});

// إعادة ضبط الأبعاد عند تغيير حجم الشاشة (خاصة للـ iPad Pro)
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// تشغيل النظام
init();
animate();

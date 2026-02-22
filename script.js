// --- إعداد نظام مانا الجزيئات (رؤية القائد: أزرق وبنفسجي) ---
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 100;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
}

class Particle {
    constructor() {
        this.init();
    }
    init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        // تناثر الألوان الملكية المعتمدة
        this.color = Math.random() > 0.5 ? '#00d4ff' : '#8a2be2';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // الحفاظ على تدفق الطاقة
        if (this.size > 0.2) this.size -= 0.005;
        
        // إعادة التوليد إذا خرج الجزيء أو صغر حجمه
        if (this.size <= 0.3 || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.init();
        }
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

// --- نظام الولاء الصارم (النقابات) ---
function selectGuild(name) {
    const currentGuild = localStorage.getItem('myGuild');
    
    if (currentGuild) {
        alert("⚠️ نظام سـونـغ جـيـن وو: لقد أقسمت بالولاء لنقابة [" + currentGuild + "] سابقاً. لا يمكن تغيير القدر.");
        return false;
    } else {
        localStorage.setItem('myGuild', name);
        alert("✅ تم الاستيقاظ: أنت الآن فرد من " + name + ". سيتم قفل اختيارك للأبد.");
        checkGuildStatus(); // تفعيل القفل فوراً
    }
}

function checkGuildStatus() {
    const savedGuild = localStorage.getItem('myGuild');
    if (savedGuild) {
        const buttons = document.querySelectorAll('.system-btn');
        buttons.forEach(btn => {
            // استهداف أزرار الانضمام فقط
            if (btn.innerText.includes("انضم") || btn.onclick?.toString().includes("selectGuild")) {
                btn.classList.add('locked-btn');
                btn.innerHTML = "تم اختيار الولاء: " + savedGuild;
                btn.style.borderColor = "#555";
                btn.style.color = "#555";
                btn.onclick = function(e) { 
                    e.preventDefault(); 
                    alert("نظام سـونـغ جـيـن وو: لقد اخترت طريقك بالفعل، لا تراجع."); 
                };
            }
        });
    }
}

// --- نظام الملاحة والقائمة ---
function toggleMenu() { 
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.toggle('active'); 
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth' });
            if (window.innerWidth <= 768) {
                const navLinks = document.getElementById('navLinks');
                if (navLinks.classList.contains('active')) toggleMenu();
            }
        }
    });
});

// --- التشغيل النهائي للنظام ---
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animate();
checkGuildStatus(); // التأكد من الولاء عند كل دخول للموقع

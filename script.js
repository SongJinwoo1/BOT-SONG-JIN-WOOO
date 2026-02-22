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
        this.color = Math.random() > 0.5 ? '#00d4ff' : '#8a2be2';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
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
init(); animate();

// --- نظام القائمة ---
function toggleMenu() { document.getElementById('navLinks').classList.toggle('active'); }

// --- نظام الولاء المطور (الحل النهائي) ---
function selectGuild(name, isLocked = false) {
    const savedGuild = localStorage.getItem('myGuild');
    
    if (savedGuild) {
        // إذا كان يحاول الدخول لنفس نقابته المسجلة، اسمح له بالعبور
        if (savedGuild === name && !isLocked) {
            return true; 
        } 
        // إذا كان يحاول الدخول لنقابة مختلفة، اظهر رسالة القدر
        else {
            alert("⚠️ نظام سـونـغ جـيـن وو: لقد اخترت ولاءك بالفعل لنقابة [" + savedGuild + "]. لا يمكن تغيير القدر.");
            if (window.event) window.event.preventDefault();
            return false;
        }
    } 
    
    // تسجيل الولاء لأول مرة
    else {
        localStorage.setItem('myGuild', name);
        
        if (isLocked) {
            alert("⚠️ لقد اخترت الولاء لنقابة [" + name + "] وهي مغلقة حالياً. لقد ضاع مستقبلك في الظلال.");
            if (window.event) window.event.preventDefault();
            return false;
        } else {
            alert("✅ تم الاستيقاظ: أنت الآن فرد من " + name + ". سيتم قفل اختيارك للأبد.");
            return true; 
        }
    }
}

// --- التمرير السلس ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        if (window.innerWidth <= 768) toggleMenu();
    });
});

window.addEventListener('resize', () => {
    canvas.width = innerWidth; canvas.height = innerHeight; init();
});

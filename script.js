// --- إعدادات خلفية المانا (Particles) ---
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particlesArray;

// ضبط حجم الكانفاس ليناسب الشاشة دائماً
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80)
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 3) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 2) - 1;
        let directionY = (Math.random() * 2) - 1;
        // ألوان المانا: أزرق وبنفسجي
        let color = Math.random() > 0.5 ? '#00d4ff' : '#8a2be2';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

window.addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

init();
animate();

// --- نظام اختيار النقابة (The Guild System) ---
function selectGuild(guildName) {
    const status = document.getElementById('guildStatus');
    const btn = document.getElementById('guildBtn');
    
    // التحقق إذا كان المستخدم قد اختار نقابة مسبقاً
    if (localStorage.getItem('userGuild')) {
        status.innerText = "النظام: لا يمكن تغيير الولاء. أنت تنتمي بالفعل لنقابة " + localStorage.getItem('userGuild');
        status.style.color = "#ff4d4d";
    } else {
        localStorage.setItem('userGuild', guildName);
        status.innerText = "تم القبول! لقد أصبحت الآن عضواً في " + guildName;
        status.style.color = "#00d4ff";
        btn.innerText = "تم الانضمام";
        btn.disabled = true;
        btn.style.opacity = "0.5";
    }
}

// التحقق من النقابة عند تحميل الصفحة
window.onload = function() {
    if (localStorage.getItem('userGuild')) {
        const btn = document.getElementById('guildBtn');
        if(btn) {
            btn.innerText = "تم الانضمام";
            btn.disabled = true;
            btn.style.opacity = "0.5";
        }
    }
};

// --- التمرير السلس للأقسام ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

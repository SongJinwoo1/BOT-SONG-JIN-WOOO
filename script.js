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

function toggleMenu() { document.getElementById('navLinks').classList.toggle('active'); }

function selectGuild(name) {
    if (localStorage.getItem('myGuild')) {
        alert("النظام: لقد اخترت ولاءك بالفعل لنقابة " + localStorage.getItem('myGuild'));
        event.preventDefault();
    } else {
        localStorage.setItem('myGuild', name);
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        if (window.innerWidth <= 768) toggleMenu();
    });
});

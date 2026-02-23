/** * نظام سـونـغ جـيـن وو - نسخة VOID_CORE
 * برمجة النظام المركزي
 */

// 1. نظام جزيئات الظلال (أزرق وبنفسجي)
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

function resize() { 
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
}
window.addEventListener('resize', resize); 
resize();

let particles = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        // توزيع الألوان بين البنفسجي والأزرق
        this.color = Math.random() > 0.5 ? '#8a2be2' : '#00d4ff';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particles = [];
    for (let i = 0; i < 75; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
init();
animate();

// 2. وظيفة القوائم المنسدلة الموحدة
function toggleSlide(id, btn, textOpen, textClose) {
    const content = document.getElementById(id);
    content.classList.toggle('active');
    btn.innerText = content.classList.contains('active') ? textClose : textOpen;
}

// 3. نظام الولاء (محمي ببروتوكول القائد - لا يُعدل نهائياً)
function selectGuild(name, isLocked = false) {
    const saved = localStorage.getItem('myGuild');
    
    // منع الخيانة أو تغيير الولاء
    if (saved && saved !== name) { 
        alert("⚠️ النظام لا يسمح بتغيير الولاء! انتمائك مسجل لـ " + saved); 
        return; 
    }
    
    if (isLocked) { 
        alert("⚠️ هذه النقابة في طور الاستيقاظ ومغلقة حالياً."); 
        return; 
    }
    
    localStorage.setItem('myGuild', name);
    alert("✅ تم تسجيل ولاؤك في سجلات الظلال لنقابة: " + name);
    
    // التوجه لجروب النقابة
    if (name === 'Eclipse') {
        window.open("https://chat.whatsapp.com/J3ebo43vwzjBlMfViL5EJ5");
    }
}

// 4. فحص الصيانة للوصول للأقسام
function checkLoyalty(branch) {
    const saved = localStorage.getItem('myGuild');
    if (!saved) { 
        alert("⚠️ الدخول مرفوض! يجب إعلان الولاء أولاً في قسم النقابات."); 
        window.location.href = "#guilds"; 
        return; 
    }
    alert(`⚙️ قسم [${branch}] يخضع حالياً لتطويرات بروتوكول VOID_CORE.`);
}

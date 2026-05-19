const photos = [
    "Foto 1.png",
    "Foto 2.png",
    "Foto 3.png",
    "Foto 4.png",
    "Foto 5.png",
    "Foto 6.png"
];

let currentIndex = 0;
const mainPhoto = document.getElementById('main-photo');

function changePhoto() {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    
    // Je gewenste lage sensitiviteit
    const sensitivity = 1.49;
    
    let progress = (scrollY / maxScroll) * sensitivity;
    if (progress > 1) progress = 1;
    
    const newIndex = Math.floor(progress * (photos.length - 1));
    
    if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        
        mainPhoto.style.opacity = "0";
        
        setTimeout(() => {
            mainPhoto.src = photos[currentIndex];
            mainPhoto.style.opacity = "1";
        }, 160);
    }
}

function setupNav() {
    const links = document.querySelectorAll('.nav-link');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            if (!link.classList.contains('active')) {
                link.style.color = '#ffff99';
            }
        });
        
        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('active')) {
                link.style.color = '#fff';
            }
        });
        
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === 'index.html') return;
            
            e.preventDefault();
            this.style.transition = 'transform 0.2s';
            this.style.transform = 'scale(0.85)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                window.location.href = this.href;
            }, 180);
        });
    });
}

window.addEventListener('scroll', changePhoto);
window.addEventListener('load', () => {
    setupNav();
    console.log('%cSomewhere In Between - Fotoreeks geladen (sensitivity 0.5)', 'color:#ffeb3b');
});


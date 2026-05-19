const photos = [
    { src: "Foto 2.png", caption: "Eindeloze nachten vol gepieker en gedachten." },
    { src: "Foto 1.png", caption: "Een nieuwe outfit voelt soms als een begin, een moment tussen twijfel en verwachting. Tussen wie je was en wie je wil zijn." },
    { src: "Foto 6.png", caption: "Een plek om te schuilen, achter een scherm, achter een personage. Een ruimte waarin je even kan zijn wie je wil." },
    { src: "Foto 4.png", caption: "Een bewijs van een moment waarin twee namen elkaar vonden, en voor even samen bestonden." },
    { src: "Foto 3.png", caption: "Alleen zijn kan soms ook iets moois betekenen." },
    { src: "Foto 5.png", caption: "Een moment waarin de eenzaamheid zwaarder wordt." }
];

let currentIndex = 0;
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');

function openLightbox(index) {
    currentIndex = index;
    lightboxImage.src = photos[index].src;
    lightboxCaption.textContent = photos[index].caption;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'visible';
}

function showNext() {
    const oldImage = lightboxImage;
    
    currentIndex = (currentIndex + 1) % photos.length;
    
    // Maak een nieuwe afbeelding voor de fade-in
    const newImage = document.createElement('img');
    newImage.src = photos[currentIndex].src;
    newImage.alt = "";
    newImage.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        opacity: 0;
        transition: opacity 0.5s ease;
    `;
    
    // Voeg nieuwe afbeelding toe bovenop de oude
    lightboxImage.parentNode.appendChild(newImage);
    
    // Fade out oude + fade in nieuwe
    oldImage.style.transition = 'opacity 0.4s ease';
    oldImage.style.opacity = '0';
    
    setTimeout(() => {
        newImage.style.opacity = '1';
    }, 50);
    
    // Wacht tot animatie klaar is, update dan de echte afbeelding + caption
    setTimeout(() => {
        lightboxImage.src = photos[currentIndex].src;
        lightboxCaption.textContent = photos[currentIndex].caption || '';
        
        // Verwijder de tijdelijke afbeelding
        if (newImage.parentNode) newImage.parentNode.removeChild(newImage);
        
        // Reset opacity van hoofdafbeelding
        lightboxImage.style.transition = 'none';
        lightboxImage.style.opacity = '1';
    }, 550);
}

function showPrev() {
    const oldImage = lightboxImage;
    
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    
    const newImage = document.createElement('img');
    newImage.src = photos[currentIndex].src;
    newImage.alt = "";
    newImage.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        opacity: 0;
        transition: opacity 0.5s ease;
    `;
    
    lightboxImage.parentNode.appendChild(newImage);
    
    oldImage.style.transition = 'opacity 0.4s ease';
    oldImage.style.opacity = '0';
    
    setTimeout(() => {
        newImage.style.opacity = '1';
    }, 50);
    
    setTimeout(() => {
        lightboxImage.src = photos[currentIndex].src;
        lightboxCaption.textContent = photos[currentIndex].caption || '';
        
        if (newImage.parentNode) newImage.parentNode.removeChild(newImage);
        
        lightboxImage.style.transition = 'none';
        lightboxImage.style.opacity = '1';
    }, 550);
}

// Event listeners
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
});

document.getElementById('close-btn').addEventListener('click', closeLightbox);
document.getElementById('next-btn').addEventListener('click', showNext);
document.getElementById('prev-btn').addEventListener('click', showPrev);

// Sluit met Escape toets
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && lightbox.style.display === 'flex') {
        closeLightbox();
    }
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
});

// Klik buiten de afbeelding om te sluiten
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'light-theme') {
        body.classList.add('light-theme');
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');
        themeToggle.textContent = isLight ? '☀️' : '🌙';
        localStorage.setItem('theme', isLight ? 'light-theme' : '');
    });

    // Scroll reveal
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                if (entry.target.id === 'publications') {
                    const items = entry.target.querySelectorAll('.timeline-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('reveal');
                            const lis = item.querySelectorAll('li');
                            lis.forEach((li, liIndex) => {
                                setTimeout(() => {
                                    li.style.opacity = '1';
                                    li.style.transform = 'translateX(0)';
                                }, liIndex * 100);
                            });
                        }, index * 200);
                    });
                }
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    const galleryImages = Array.from(document.querySelectorAll('.album-image img'));
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxCounter = document.querySelector('.lightbox-counter');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    let activeIndex = 0;

    function updateLightbox(index) {
        const image = galleryImages[index];
        const title = image.closest('.album-card')?.querySelector('.album-copy h5')?.textContent || '';
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent = title;
        lightboxCounter.textContent = `${index + 1} / ${galleryImages.length}`;
        activeIndex = index;
    }

    function openLightbox(index) {
        updateLightbox(index);
        lightbox.classList.remove('hidden');
        lightbox.setAttribute('aria-hidden', 'false');
    }

    function closeLightbox() {
        lightbox.classList.add('hidden');
        lightbox.setAttribute('aria-hidden', 'true');
    }

    if (galleryImages.length > 0) {
        galleryImages.forEach((img, index) => {
            img.addEventListener('click', () => openLightbox(index));
        });
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            const nextIndex = (activeIndex - 1 + galleryImages.length) % galleryImages.length;
            updateLightbox(nextIndex);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            const nextIndex = (activeIndex + 1) % galleryImages.length;
            updateLightbox(nextIndex);
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (!lightbox || lightbox.classList.contains('hidden')) return;
        if (event.key === 'Escape') {
            closeLightbox();
        }
        if (event.key === 'ArrowLeft') {
            const prevIndex = (activeIndex - 1 + galleryImages.length) % galleryImages.length;
            updateLightbox(prevIndex);
        }
        if (event.key === 'ArrowRight') {
            const nextIndex = (activeIndex + 1) % galleryImages.length;
            updateLightbox(nextIndex);
        }
    });
});
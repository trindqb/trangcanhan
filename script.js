// Theme toggle
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
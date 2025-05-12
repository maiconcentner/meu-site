/**
 * Otimizações para dispositivos móveis
 */
document.addEventListener('DOMContentLoaded', function() {
    // Fechar o menu ao clicar em um link (para mobile)
    const navLinks = document.querySelectorAll('.nav-list a');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                mobileMenuToggle.classList.remove('active');
                navList.classList.remove('active');
            }
        });
    });
    
    // Adicionar overlay para o menu mobile
    const body = document.body;
    const menuOverlay = document.createElement('div');
    menuOverlay.classList.add('menu-overlay');
    body.appendChild(menuOverlay);
    
    // Abrir/fechar menu mobile
    if (mobileMenuToggle && navList) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            body.classList.toggle('menu-open'); // Impedir rolagem quando menu estiver aberto
        });
        
        menuOverlay.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            navList.classList.remove('active');
            menuOverlay.classList.remove('active');
            body.classList.remove('menu-open');
        });
    }
    
    // Lazy loading de imagens para melhorar performance em mobile
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback para navegadores que não suportam lazy loading nativo
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // Melhorar carregamento de fontes
    if ('fonts' in document) {
        Promise.all([
            document.fonts.load('1rem Roboto'),
            document.fonts.load('1rem Poppins')
        ]).then(() => {
            document.body.classList.add('fonts-loaded');
        });
    }
    
    // Melhorar desempenho de rolagem em mobile
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // Verificar posição de rolagem para efeitos
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Adicionar classe à header quando rolar
                const header = document.querySelector('.header');
                if (scrollTop > 50) {
                    header.classList.add('sticky');
                } else {
                    header.classList.remove('sticky');
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Adicionar suporte a toque para os cards de portfólio em dispositivos móveis
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            this.classList.toggle('touch-focus');
        }, {passive: true});
    });
});
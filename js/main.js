/**
 * Funcionalidades principais para o site de Serviços Acadêmicos
 * Autor: Seu Nome
 * Data: 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    // Header fixo ao rolar a página
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // Menu mobile
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuToggle && navList) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navList.classList.remove('active');
            });
        });
    }
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        if (navList && navList.classList.contains('active') && 
            !event.target.closest('.main-nav') && 
            !event.target.closest('.mobile-menu-toggle')) {
            mobileMenuToggle.classList.remove('active');
            navList.classList.remove('active');
        }
    });
    
    // Animação ao scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                const animation = element.getAttribute('data-animation') || 'fade-in';
                element.classList.add(animation);
            }
        });
    }
    
    // Verificar elementos visíveis no carregamento inicial
    if (animateElements.length > 0) {
        checkScroll();
        window.addEventListener('scroll', checkScroll);
    }
    
    // Rolagem suave para links internos
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 100;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Botão de voltar ao topo
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Contador de estatísticas
    const statCounters = document.querySelectorAll('.stat-counter');
    
    function startCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    }
    
    // Iniciar contadores quando estiverem visíveis
    function checkCounters() {
        statCounters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            
            if (rect.top < window.innerHeight && !counter.classList.contains('counted')) {
                counter.classList.add('counted');
                startCounter(counter);
            }
        });
    }
    
    if (statCounters.length > 0) {
        window.addEventListener('scroll', checkCounters);
        checkCounters(); // Verificar no carregamento inicial
    }
    
    // Inicializar tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            
            if (tooltipText) {
                const tooltipElement = document.createElement('div');
                tooltipElement.className = 'tooltip';
                tooltipElement.textContent = tooltipText;
                
                document.body.appendChild(tooltipElement);
                
                const rect = this.getBoundingClientRect();
                const tooltipRect = tooltipElement.getBoundingClientRect();
                
                tooltipElement.style.top = `${rect.top - tooltipRect.height - 10}px`;
                tooltipElement.style.left = `${rect.left + (rect.width / 2) - (tooltipRect.width / 2)}px`;
                tooltipElement.style.opacity = '1';
                
                this.addEventListener('mouseleave', function() {
                    tooltipElement.remove();
                }, { once: true });
            }
        });
    });
});
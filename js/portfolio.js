/**
 * Script específico para a página de portfólio
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar partículas se existir o elemento
    if (document.getElementById('particles-js')) {
        if (typeof particlesJS === 'function') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: "#ffffff"
                    },
                    shape: {
                        type: "circle",
                        stroke: {
                            width: 0,
                            color: "#000000"
                        },
                    },
                    opacity: {
                        value: 0.5,
                        random: false,
                    },
                    size: {
                        value: 3,
                        random: true,
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#ffffff",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: false,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: true,
                            mode: "grab"
                        },
                        onclick: {
                            enable: true,
                            mode: "push"
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        push: {
                            particles_nb: 4
                        }
                    }
                },
                retina_detect: true
            });
        }
    }

    // Função para verificar se o elemento está visível na viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Função para adicionar animações quando os elementos entrarem na viewport
    function handleScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
        
        animatedElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                
                // Adicionar classe específica baseada na animação
                if (element.classList.contains('animate-fade-in')) {
                    element.classList.add('fade-in-visible');
                } else if (element.classList.contains('animate-slide-up')) {
                    element.classList.add('slide-up-visible');
                }
            }
        });
    }

    // Adicionar listener de scroll para acionar animações
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Acionar uma vez quando a página carregar
    handleScrollAnimations();

    // Smooth scroll para links de âncora
    document.querySelectorAll('a.scroll-to').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
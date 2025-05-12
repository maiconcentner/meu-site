/**
 * Funcionalidades para galeria e portfólio
 * Autor: Seu Nome
 * Data: 2025
 */

function initGallery() {
    // Filtro de portfólio
    const portfolioFilters = document.querySelectorAll('.portfolio-filter li');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (portfolioFilters.length > 0) {
        portfolioFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remover classe ativa de todos os filtros
                portfolioFilters.forEach(item => item.classList.remove('active'));
                
                // Adicionar classe ativa ao filtro clicado
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filtrar itens
                portfolioItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                        
                        // Adicionar animação de fade-in
                        setTimeout(() => {
                            item.classList.add('show');
                        }, 50);
                    } else {
                        if (item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                            
                            // Adicionar animação de fade-in
                            setTimeout(() => {
                                item.classList.add('show');
                            }, 50);
                        } else {
                            item.classList.remove('show');
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            });
        });
    }
    
    // Lightbox para imagens
    const portfolioImages = document.querySelectorAll('.portfolio-image img');
    
    if (portfolioImages.length > 0) {
        portfolioImages.forEach(image => {
            image.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Criar lightbox
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                document.body.appendChild(lightbox);
                
                // Adicionar imagem ao lightbox
                const lightboxImg = document.createElement('img');
                lightboxImg.src = this.src;
                lightbox.appendChild(lightboxImg);
                
                // Adicionar botão de fechar
                const closeBtn = document.createElement('span');
                closeBtn.className = 'lightbox-close';
                closeBtn.innerHTML = '&times;';
                lightbox.appendChild(closeBtn);
                
                // Adicionar título e descrição se disponíveis
                const title = this.getAttribute('data-title');
                const description = this.getAttribute('data-description');
                
                if (title || description) {
                    const infoBox = document.createElement('div');
                    infoBox.className = 'lightbox-info';
                    
                    if (title) {
                        const titleElement = document.createElement('h3');
                        titleElement.textContent = title;
                        infoBox.appendChild(titleElement);
                    }
                    
                    if (description) {
                        const descElement = document.createElement('p');
                        descElement.textContent = description;
                        infoBox.appendChild(descElement);
                    }
                    
                    lightbox.appendChild(infoBox);
                }
                
                // Mostrar lightbox com animação
                setTimeout(() => {
                    lightbox.classList.add('show');
                }, 50);
                
                // Fechar lightbox ao clicar no botão ou fora da imagem
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox || e.target === closeBtn) {
                        lightbox.classList.remove('show');
                        
                        // Remover lightbox após animação
                        setTimeout(() => {
                            lightbox.remove();
                        }, 300);
                    }
                });
                
                // Fechar lightbox com tecla ESC
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') {
                        lightbox.classList.remove('show');
                        
                        // Remover lightbox após animação
                        setTimeout(() => {
                            lightbox.remove();
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Carrossel de imagens
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const indicators = carousel.querySelectorAll('.carousel-indicator');
        
        let currentSlide = 0;
        let interval = null;
        const autoplayDelay = parseInt(carousel.getAttribute('data-autoplay')) || 5000;
        
        // Função para mostrar slide
        function showSlide(index) {
            // Esconder todos os slides
            slides.forEach(slide => {
                slide.style.display = 'none';
            });
            
            // Remover classe ativa de todos os indicadores
            indicators.forEach(indicator => {
                indicator.classList.remove('active');
            });
            
            // Mostrar slide atual
            slides[index].style.display = 'block';
            
            // Adicionar classe ativa ao indicador atual
            if (indicators[index]) {
                indicators[index].classList.add('active');
            }
        }
        
        // Inicializar carrossel
        if (slides.length > 0) {
            showSlide(currentSlide);
            
            // Botões de navegação
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                    showSlide(currentSlide);
                    resetAutoplay();
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    currentSlide = (currentSlide + 1) % slides.length;
                    showSlide(currentSlide);
                    resetAutoplay();
                });
            }
            
            // Indicadores
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', function() {
                    currentSlide = index;
                    showSlide(currentSlide);
                    resetAutoplay();
                });
            });
            
            // Autoplay
            function startAutoplay() {
                if (autoplayDelay > 0) {
                    interval = setInterval(() => {
                        currentSlide = (currentSlide + 1) % slides.length;
                        showSlide(currentSlide);
                    }, autoplayDelay);
                }
            }
            
            function resetAutoplay() {
                if (interval) {
                    clearInterval(interval);
                    startAutoplay();
                }
            }
            
            startAutoplay();
            
            // Pausar autoplay ao passar o mouse
            carousel.addEventListener('mouseenter', function() {
                if (interval) {
                    clearInterval(interval);
                }
            });
            
            carousel.addEventListener('mouseleave', function() {
                startAutoplay();
            });
        }
    });
}
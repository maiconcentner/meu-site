// Script específico para a página FAQ

document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidade para expandir/colapsar itens de FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Alterna o estado do item atual
            item.classList.toggle('active');
            
            // Alterna o ícone
            const toggleIcon = item.querySelector('.faq-toggle i');
            if (toggleIcon) {
                if (item.classList.contains('active')) {
                    toggleIcon.className = 'fas fa-minus';
                } else {
                    toggleIcon.className = 'fas fa-plus';
                }
            }
        });
    });
    
    // Funcionalidade para filtrar por categoria
    const categoryButtons = document.querySelectorAll('.faq-category-btn');
    const faqCategories = document.querySelectorAll('.faq-category');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe 'active' de todos os botões
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona a classe 'active' ao botão clicado
            button.classList.add('active');
            
            // Obtém a categoria a ser mostrada
            const targetCategory = button.getAttribute('data-category');
            
            // Esconde todas as categorias
            faqCategories.forEach(category => {
                category.classList.remove('active');
            });
            
            // Mostra a categoria selecionada
            document.getElementById(targetCategory).classList.add('active');
        });
    });
    
    // Funcionalidade de pesquisa
    const searchInput = document.getElementById('faqSearch');
    const searchBtn = document.querySelector('.search-btn');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // Se a pesquisa estiver vazia, restaura a visualização normal
            faqItems.forEach(item => {
                item.style.display = '';
                item.classList.remove('active'); // Fecha todos os itens
            });
            
            // Restaura a categoria ativa
            const activeCategory = document.querySelector('.faq-category-btn.active');
            if (activeCategory) {
                const categoryId = activeCategory.getAttribute('data-category');
                faqCategories.forEach(cat => cat.classList.remove('active'));
                document.getElementById(categoryId).classList.add('active');
            } else {
                // Se nenhuma categoria estiver ativa, ativa a primeira
                categoryButtons[0].click();
            }
            return;
        }
        
        // Mostra todos os itens de FAQ para pesquisa
        faqCategories.forEach(category => {
            category.classList.add('active');
        });
        
        // Filtra os itens de acordo com o termo de pesquisa
        let foundResults = false;
        
        faqItems.forEach(item => {
            const questionText = item.querySelector('.faq-question h3').textContent.toLowerCase();
            const answerText = item.querySelector('.faq-answer') ? 
                              item.querySelector('.faq-answer').textContent.toLowerCase() : '';
            
            if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                item.style.display = '';
                item.classList.add('active'); // Expande os itens que correspondem à pesquisa
                foundResults = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Se nenhum resultado for encontrado, exibe uma mensagem
        const noResultsElement = document.getElementById('no-results-message');
        if (noResultsElement) {
            if (!foundResults) {
                noResultsElement.style.display = 'block';
            } else {
                noResultsElement.style.display = 'none';
            }
        }
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Funcionalidade para tags de pesquisa populares
    const searchTags = document.querySelectorAll('.search-tag');
    
    searchTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            const searchQuery = this.getAttribute('data-search') || this.textContent.trim();
            if (searchInput) {
                searchInput.value = searchQuery;
                performSearch();
                
                // Scroll para os resultados
                const faqSection = document.querySelector('.faq-section');
                if (faqSection) {
                    faqSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Scroll suave para links âncora
    document.querySelectorAll('.scroll-to').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Inicialização de elementos visuais
    
    // Inicializar barras de progresso
    const progressBars = document.querySelectorAll('.progress-fill');
    const levelFills = document.querySelectorAll('.level-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                if (target.classList.contains('level-fill')) {
                    const parent = target.parentElement;
                    const level = parent.getAttribute('data-level');
                    if (level) {
                        target.style.width = level;
                    }
                } else {
                    const width = target.getAttribute('data-width');
                    if (width) {
                        target.style.width = width;
                    }
                }
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.1 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
    
    levelFills.forEach(fill => {
        observer.observe(fill);
    });
    
    // Inicialização de tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // Controles de zoom
    const zoomButtons = document.querySelectorAll('.zoom-btn');
    
    zoomButtons.forEach(button => {
        button.addEventListener('click', function() {
            const image = this.closest('.resolution-preview').querySelector('img');
            // Abrir imagem em tamanho maior em um modal ou nova janela
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${image.src}" alt="${image.alt}">
                </div>
            `;
            document.body.appendChild(modal);
            
            // Fechar o modal
            modal.querySelector('.close-modal').addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            // Fechar o modal ao clicar fora da imagem
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
    });
    
    // Botão de play para vídeo
    const videoPlayButtons = document.querySelectorAll('.video-play-button');
    
    videoPlayButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoContainer = this.closest('.video-container');
            const video = videoContainer.querySelector('video');
            
            if (video) {
                // Carrega o vídeo se for lazy-loaded
                if (video.classList.contains('lazy-video')) {
                    const videoSrc = video.getAttribute('data-src');
                    if (videoSrc) {
                        video.src = videoSrc;
                        video.classList.remove('lazy-video');
                    }
                }
                
                // Reproduz o vídeo
                video.play()
                    .then(() => {
                        this.style.display = 'none';
                    })
                    .catch(error => {
                        console.error('Erro ao reproduzir o vídeo:', error);
                    });
            }
        });
        
        const video = button.closest('.video-container')?.querySelector('video');
        if (video) {
            video.addEventListener('pause', function() {
                button.style.display = 'flex';
            });
            
            video.addEventListener('ended', function() {
                button.style.display = 'flex';
            });
        }
    });
    
    // Adicionar estilos para o modal de imagem
    const style = document.createElement('style');
    style.textContent = `
        .image-modal {
            display: flex;
            position: fixed;
            z-index: 9999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            align-items: center;
            justify-content: center;
        }
        
        .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .modal-content img {
            max-width: 100%;
            max-height: 90vh;
            display: block;
            margin: 0 auto;
        }
        
        .close-modal {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 35px;
            font-weight: bold;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
    
    // Corrigir o problema da imagem branca cortando o background
    const bannerWave = document.querySelector('.banner-wave');
    if (bannerWave) {
        bannerWave.style.marginBottom = '-5px'; // Elimina qualquer espaço entre a onda e a próxima seção
    }
});
/**
 * Validação de formulários
 * Autor: Seu Nome
 * Data: 2025
 */

function validateForm() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Verificar se é o formulário de contato
            const isContactForm = form.id === 'contactForm';
            
            // Verificar campos obrigatórios
            const requiredFields = form.querySelectorAll('[required]');
            let hasError = false;
            
            requiredFields.forEach(field => {
                // Remover mensagens de erro anteriores
                removeErrorMessage(field);
                
                if (!field.value.trim()) {
                    e.preventDefault();
                    hasError = true;
                    showErrorMessage(field, 'Este campo é obrigatório');
                } else {
                    // Validações específicas por tipo de campo
                    if (field.type === 'email' && !isValidEmail(field.value)) {
                        e.preventDefault();
                        hasError = true;
                        showErrorMessage(field, 'Por favor, insira um e-mail válido');
                    }
                    
                    if (field.id === 'phone' && field.value.trim() && !isValidPhone(field.value)) {
                        e.preventDefault();
                        hasError = true;
                        showErrorMessage(field, 'Por favor, insira um telefone válido');
                    }
                    
                    if (field.id === 'message' && field.value.trim().length < 10) {
                        e.preventDefault();
                        hasError = true;
                        showErrorMessage(field, 'A mensagem deve ter pelo menos 10 caracteres');
                    }
                }
            });
            
            // Se for o formulário de contato e não tiver erros
            if (isContactForm && !hasError) {
                // Mostrar feedback de envio
                e.preventDefault();
                
                // Simular envio (remover em produção e usar o formspree)
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
                
                setTimeout(() => {
                    form.innerHTML = `
                        <div class="form-success">
                            <i class="fas fa-check-circle"></i>
                            <h3>Mensagem enviada com sucesso!</h3>
                            <p>Agradecemos seu contato. Retornaremos em breve.</p>
                        </div>
                    `;
                }, 1500);
                
                // Em produção, use o código abaixo para enviar o formulário
                /*
                const formData = new FormData(form);
                
                fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        form.innerHTML = `
                            <div class="form-success">
                                <i class="fas fa-check-circle"></i>
                                <h3>Mensagem enviada com sucesso!</h3>
                                <p>Agradecemos seu contato. Retornaremos em breve.</p>
                            </div>
                        `;
                    } else {
                        throw new Error('Erro ao enviar o formulário');
                    }
                })
                .catch(error => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
                    console.error(error);
                });
                */
            }
        });
        
        // Validação em tempo real
        const fields = form.querySelectorAll('input, textarea, select');
        
        fields.forEach(field => {
            field.addEventListener('blur', function() {
                if (field.hasAttribute('required') && !field.value.trim()) {
                    showErrorMessage(field, 'Este campo é obrigatório');
                } else if (field.type === 'email' && field.value.trim() && !isValidEmail(field.value)) {
                    showErrorMessage(field, 'Por favor, insira um e-mail válido');
                } else if (field.id === 'phone' && field.value.trim() && !isValidPhone(field.value)) {
                    showErrorMessage(field, 'Por favor, insira um telefone válido');
                } else {
                    removeErrorMessage(field);
                }
            });
            
            field.addEventListener('input', function() {
                if (field.value.trim()) {
                    removeErrorMessage(field);
                }
            });
        });
    });
    
    // Máscara para campo de telefone
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            let formattedValue = '';
            
            if (value.length > 0) {
                formattedValue = '(' + value.substring(0, 2);
                
                if (value.length > 2) {
                    formattedValue += ') ' + value.substring(2, 7);
                    
                    if (value.length > 7) {
                        formattedValue += '-' + value.substring(7, 11);
                    }
                }
            }
            
            e.target.value = formattedValue;
        });
    });
}

// Funções auxiliares
function showErrorMessage(field, message) {
    // Remover mensagem de erro anterior se existir
    removeErrorMessage(field);
    
    // Adicionar classe de erro ao campo
    field.classList.add('error');
    
    // Criar elemento de mensagem de erro
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    // Inserir mensagem após o campo
    field.parentNode.appendChild(errorElement);
}

function removeErrorMessage(field) {
    // Remover classe de erro
    field.classList.remove('error');
    
    // Remover mensagem de erro se existir
    const errorElement = field.parentNode.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Remover caracteres não numéricos
    const phoneDigits = phone.replace(/\D/g, '');
    
    // Verificar se tem pelo menos 10 dígitos (DDD + número)
    return phoneDigits.length >= 10;
}
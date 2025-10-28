
        // Snow Animation
        function initializeSnow() {
            const snowContainer = document.getElementById('snow-container');
            const snowflakes = ['❄', '❅', '❆'];
            
            function createSnowflake() {
                const snowflake = document.createElement('div');
                snowflake.className = 'snowflake';
                snowflake.innerHTML = snowflakes[Math.floor(Math.random() * snowflakes.length)];
                snowflake.style.left = Math.random() * 100 + 'vw';
                snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
                snowflake.style.opacity = Math.random() * 0.8 + 0.2;
                snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
                
                snowContainer.appendChild(snowflake);
                
                setTimeout(() => {
                    if (snowflake.parentNode) {
                        snowflake.remove();
                    }
                }, 5000);
            }
            
            setInterval(createSnowflake, 300);
        }

        // Função para verificar se é Natal
        function isChristmasTime() {
            const today = new Date();
            const month = today.getMonth() + 1; // Janeiro é 0
            const day = today.getDate();
            
            // Verifica se é 24 ou 25 de dezembro
            return (month === 12 && (day === 24 || day === 25));
        }

        // Função para verificar data e abrir o presente apropriado
        function checkDateAndOpenGift() {
            if (isChristmasTime()) {
                openGiftModal();
            } else {
                openBlockedModal();
            }
        }

        // Modal Functions - Para modais normais
        function openModal(title, text, photoUrl) {
            const modal = document.getElementById('modal');
            const modalTitle = document.getElementById('modal-title');
            const modalText = document.getElementById('modal-text');
            const modalPhoto = document.getElementById('modal-photo');
            
            modalTitle.textContent = title;
            modalText.textContent = text;
            modalPhoto.src = photoUrl;
            modalPhoto.alt = title;
            
            modal.classList.add('active');
            document.body.classList.add('no-scroll');
        }

        function closeModal(event) {
            if (event && event.target !== event.currentTarget) return;
            
            const modal = document.getElementById('modal');
            modal.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }

        // Modal de Bloqueio
        function openBlockedModal() {
            const modal = document.getElementById('blocked-modal');
            modal.classList.add('active');
            document.body.classList.add('no-scroll');
        }

        function closeBlockedModal(event) {
            if (event && event.target !== event.currentTarget) return;
            
            const modal = document.getElementById('blocked-modal');
            modal.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }

        // Carrossel do Presente
        let currentSlide = 0;
        const giftImages = [
            'image/foto.png',
            'image/foto.png', 
            'image/foto.png',
            'image/foto.png'
        ];

        function initializeCarousel() {
            const track = document.querySelector('.carousel-track');
            const indicators = document.querySelector('.carousel-indicators');
            
            // Limpa o carrossel
            track.innerHTML = '';
            indicators.innerHTML = '';
            
            // Adiciona as imagens ao carrossel
            giftImages.forEach((image, index) => {
                const slide = document.createElement('div');
                slide.className = 'carousel-slide';
                slide.innerHTML = `<img src="${image}" alt="Presente ${index + 1}" class="carousel-image">`;
                track.appendChild(slide);
                
                // Cria os indicadores
                const indicator = document.createElement('button');
                indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
                indicator.addEventListener('click', () => goToSlide(index));
                indicators.appendChild(indicator);
            });
            
            updateCarousel();
        }

        function updateCarousel() {
            const track = document.querySelector('.carousel-track');
            const indicators = document.querySelectorAll('.carousel-indicator');
            const slideWidth = document.querySelector('.carousel-slide').clientWidth;
            
            track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
            
            // Atualiza indicadores
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % giftImages.length;
            updateCarousel();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + giftImages.length) % giftImages.length;
            updateCarousel();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateCarousel();
        }

        // Modal do Presente
        function openGiftModal() {
            const modal = document.getElementById('gift-modal');
            initializeCarousel();
            modal.classList.add('active');
            document.body.classList.add('no-scroll');
        }

        function closeGiftModal(event) {
            if (event && event.target !== event.currentTarget) return;
            
            const modal = document.getElementById('gift-modal');
            modal.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }

        // Event Listeners para os botões do carrossel
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelector('.carousel-prev').addEventListener('click', prevSlide);
            document.querySelector('.carousel-next').addEventListener('click', nextSlide);
            
            // Teclado para navegar no carrossel
            document.addEventListener('keydown', function(e) {
                const giftModal = document.getElementById('gift-modal');
                if (giftModal.classList.contains('active')) {
                    if (e.key === 'ArrowLeft') prevSlide();
                    if (e.key === 'ArrowRight') nextSlide();
                }
            });

            // Mostrar no console se é natal (para teste)
            console.log('É natal?', isChristmasTime());
            console.log('Data atual:', new Date().toLocaleDateString());
        });

        // Keyboard Navigation para fechar modais
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
                closeGiftModal();
                closeBlockedModal();
            }
        });

        // Initialize Snow on Page Load
        document.addEventListener('DOMContentLoaded', function() {
            initializeSnow();
        });

        // Prevent context menu on images
        document.addEventListener('contextmenu', function(e) {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
            }
        });

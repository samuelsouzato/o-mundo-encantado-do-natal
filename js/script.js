document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.cards-teatro > div');
    const buttons = document.querySelectorAll('button.btn-teatro'); 
    let maxCardHeight = 0;

    // --- FUNÇÃO 1: Alinhamento dos Cards (Altura igual quando fechados) ---
    function equalizeHeights() {
        // 1. Solta a altura para medir
        cards.forEach(card => {
            if (!card.classList.contains('open')) {
                card.style.height = 'auto'; 
            }
        });

        // 2. Mede o maior
        maxCardHeight = 0;
        cards.forEach(card => {
            // Só considera cards fechados para o cálculo base
            if (!card.classList.contains('open')) {
                const height = card.offsetHeight;
                if (height > maxCardHeight) {
                    maxCardHeight = height;
                }
            }
        });

        // 3. Aplica a altura a todos
        cards.forEach(card => {
            if (!card.classList.contains('open')) {
                card.style.height = maxCardHeight + 'px';
            }
            
            // SEGREDO DA RESPONSIVIDADE: Se o card estiver aberto durante o resize,
            // recalculamos a altura do texto para ele não quebrar.
            if (card.classList.contains('open')) {
                const info = card.querySelector('.teatro-info');
                if (info) {
                    info.style.maxHeight = info.scrollHeight + "px"; // Ajusta ao novo tamanho do texto
                }
            }
        });
    }

    // Executa ao carregar e ao redimensionar a tela
    equalizeHeights();
    window.addEventListener('resize', equalizeHeights);

    // --- FUNÇÃO 2: Abrir e Fechar (Cálculo Exato do Texto) ---
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.parentElement; 
            const info = card.querySelector('.teatro-info'); // Pega a div do texto
            
            // Alterna o estado
            card.classList.toggle('open');

            if (card.classList.contains('open')) {
                // --- ABRINDO ---
                // 1. Libera o card para crescer
                card.style.height = 'auto';
                
                // 2. Calcula a altura REAL do texto (scrollHeight) e aplica
                // Isso faz ele expandir exatamente até o fim do texto, nem mais, nem menos.
                info.style.maxHeight = info.scrollHeight + "px";
                
                this.textContent = 'Ver menos';

            } else {
                // --- FECHANDO ---
                // 1. Trava a altura do card de volta no padrão
                card.style.height = maxCardHeight + 'px';
                
                // 2. Zera a altura do texto para ele sumir suavemente
                info.style.maxHeight = null; 
                
                this.textContent = 'Saiba mais';
            }
        });
    });
});
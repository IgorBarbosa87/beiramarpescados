// Script para funcionalidade das tabs
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Funcionalidade dos botões DETALHES
    const detalhesButtons = document.querySelectorAll('.btn-detalhes, .btn-receber');
	    // Lógica do Modal de Recebimento de Mercadoria
	    const recebimentoModal = document.getElementById('recebimentoModal');
	    const closeModalBtn = document.getElementById('closeModalBtn');
	    const salvarModalBtn = document.getElementById('salvarModalBtn');
	
	    detalhesButtons.forEach(button => {
	        button.addEventListener('click', function() {
	            // Abrir o modal
	            recebimentoModal.style.display = 'block';
	            // Você pode adicionar aqui a lógica para carregar dados específicos do pedido, se necessário
	        });
	    });
	
	    // Fechar o modal ao clicar no X
	    closeModalBtn.addEventListener('click', function() {
	        recebimentoModal.style.display = 'none';
	    });
	
	    // Fechar o modal ao clicar fora dele
	    window.addEventListener('click', function(event) {
	        if (event.target == recebimentoModal) {
	            recebimentoModal.style.display = 'none';
	        }
	    });
	
	    // Lógica do botão SALVAR (apenas para protótipo)
	    salvarModalBtn.addEventListener('click', function() {
	        const formaArmazenamento = document.getElementById('formaArmazenamento').value;
	        if (formaArmazenamento) {
	            alert('Forma de Armazenamento selecionada: ' + formaArmazenamento + '. Ação de salvar simulada.');
	            recebimentoModal.style.display = 'none';
	        } else {
	            alert('Por favor, selecione a Forma de Armazenamento.');
	        }
	    });
});

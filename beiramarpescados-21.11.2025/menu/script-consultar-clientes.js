document.addEventListener('DOMContentLoaded', function() {
    // 1. Lógica para expandir/recolher submenus (Reutilizada do script-novo-cliente.js)
    const submenuToggles = document.querySelectorAll('.submenu-toggle');
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const parentLi = this.closest('.menu-item');
            parentLi.classList.toggle('expanded');
            // Altera o ícone da seta
            this.classList.toggle('fa-chevron-up');
            this.classList.toggle('fa-chevron-down');
        });
    });

    // Inicialização: Se o menu CLIENTES já está 'expanded' no HTML, garantir que o ícone esteja correto.
    const clientesMenu = document.querySelector('.menu-item.expanded .submenu-toggle');
    if (clientesMenu) {
        clientesMenu.classList.add('fa-chevron-up');
    }

    // 2. Lógica de Busca (Simulação)
    const searchButton = document.querySelector('.search-btn');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const orderBy = document.getElementById('orderBy').value;
            const sortOrder = document.getElementById('sortOrder').value;
            const intelligentSearch = document.getElementById('intelligentSearch').value;

            alert(`Simulando busca de clientes:
- Ordenar por: ${orderBy}
- Ordem: ${sortOrder}
- Busca Inteligente: "${intelligentSearch}"`);

            // Aqui seria a lógica real para filtrar a tabela (fetch, manipulação do DOM)
        });
    }

    // 3. Lógica de Exportação (Simulação)
    const exportButton = document.querySelector('.export-btn');
    if (exportButton) {
        exportButton.addEventListener('click', function() {
            const selectAll = document.getElementById('selectAll').checked;
            
            if (selectAll) {
                alert('Simulando exportação de TODOS os clientes.');
            } else {
                // Em um cenário real, você verificaria quais linhas da tabela estão selecionadas
                alert('Simulando exportação dos clientes selecionados (ou de todos, se não houver seleção individual implementada).');
            }
        });
    }
});

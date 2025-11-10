document.addEventListener('DOMContentLoaded', function() {
    // 1. Lógica para expandir/recolher submenus (Reutilizada do script-inicio.js)
    // Esta lógica é carregada via script-inicio.js, mas mantemos a estrutura para referência.

    // 2. Lógica de Busca (Simulação) - Filtros Superiores
    const filterButton = document.querySelector('.filter-btn');
    if (filterButton) {
        filterButton.addEventListener('click', function() {
            const cliente = document.getElementById('cliente').value;
            const segmento = document.getElementById('segmento').value;
            const status = document.getElementById('status').value;
            const dataInicial = document.getElementById('dataInicial').value;
            const dataFinal = document.getElementById('dataFinal').value;
            const valorMinimo = document.getElementById('valorMinimo').value;
            const valorMaximo = document.getElementById('valorMaximo').value;

            alert(`Simulando filtragem de pedidos:
- Cliente: ${cliente}
- Segmento: ${segmento}
- Status: ${status}
- Data Inicial: ${dataInicial}
- Data Final: ${dataFinal}
- Valor Mínimo: ${valorMinimo}
- Valor Máximo: ${valorMaximo}`);

            // Aqui seria a lógica real para filtrar a tabela (fetch, manipulação do DOM)
        });
    }

    // 3. Lógica de Limpar Filtros (Simulação)
    const clearButton = document.querySelector('.clear-btn');
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            document.getElementById('cliente').value = '';
            document.getElementById('segmento').value = '';
            document.getElementById('status').value = '';
            document.getElementById('dataInicial').value = '';
            document.getElementById('dataFinal').value = '';
            document.getElementById('valorMinimo').value = '';
            document.getElementById('valorMaximo').value = '';
            alert('Filtros superiores limpos.');
        });
    }

    // 4. Lógica de Busca (Simulação) - Filtros da Tabela
    const searchTableButton = document.querySelector('.filters-bar-table .search-btn');
    if (searchTableButton) {
        searchTableButton.addEventListener('click', function() {
            const orderByTable = document.getElementById('orderByTable').value;
            const sortOrderTable = document.getElementById('sortOrderTable').value;
            const intelligentSearchTable = document.getElementById('intelligentSearchTable').value;

            alert(`Simulando busca na tabela de pedidos:
- Ordenar por: ${orderByTable}
- Ordem: ${sortOrderTable}
- Busca Inteligente: "${intelligentSearchTable}"`);
        });
    }

    // 5. Lógica de Exportação (Simulação)
    const exportButton = document.querySelector('.pedidos-header-bar .export-btn');
    if (exportButton) {
        exportButton.addEventListener('click', function() {
            const selectAllPedidos = document.getElementById('selectAllPedidos').checked;
            
            if (selectAllPedidos) {
                alert('Simulando exportação de TODOS os pedidos.');
            } else {
                alert('Simulando exportação dos pedidos selecionados.');
            }
        });
    }

    // 6. Lógica do botão NOVO PEDIDO (Simulação)
    const newPedidoButton = document.querySelector('.new-pedido-btn');
    if (newPedidoButton) {
        newPedidoButton.addEventListener('click', function() {
            alert('Simulando navegação para a tela de Novo Pedido.');
            // window.location.href = 'novo-pedido.html'; // Descomentar quando a tela for criada
        });
    }
});

// Script para funcionalidade do Cadastro de Mercadoria
document.addEventListener('DOMContentLoaded', function() {
    const btnAdicionar = document.getElementById('btnAdicionar');
    const btnSalvar = document.getElementById('btnSalvar');
    const tableBody = document.getElementById('mercadoriaTableBody');
    const form = document.getElementById('cadastroMercadoriaForm');

    let mercadorias = [];

    // Adicionar mercadoria à tabela
    btnAdicionar.addEventListener('click', function() {
        const produto = document.getElementById('produto');
        const quantidade = document.getElementById('quantidade');
        const valor = document.getElementById('valor');

        // Validação básica
        if (!produto.value || !quantidade.value || !valor.value) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const produtoTexto = produto.options[produto.selectedIndex].text;
        const quantidadeNum = parseInt(quantidade.value);
        const valorNum = parseFloat(valor.value.replace(',', '.'));
        const total = quantidadeNum * valorNum;

        // Adicionar ao array
        mercadorias.push({
            produto: produtoTexto,
            quantidade: quantidadeNum,
            valor: valorNum,
            total: total
        });

        // Atualizar tabela
        atualizarTabela();

        // Limpar campos
        quantidade.value = '';
        valor.value = '';
    });

    // Atualizar tabela
    function atualizarTabela() {
        tableBody.innerHTML = '';

        mercadorias.forEach((item, index) => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td>${item.produto}</td>
                <td>${item.quantidade}</td>
                <td>R$ ${item.valor.toFixed(2).replace('.', ',')}</td>
                <td>R$ ${item.total.toFixed(2).replace('.', ',')}</td>
            `;
        });
    }

    // Salvar mercadorias
    btnSalvar.addEventListener('click', function() {
        if (mercadorias.length === 0) {
            alert('Adicione pelo menos uma mercadoria antes de salvar.');
            return;
        }

        const dataEntrega = document.getElementById('dataEntrega').value;
        
        if (!dataEntrega) {
            alert('Por favor, informe a data de entrega.');
            return;
        }

        console.log('Mercadorias cadastradas:', mercadorias);
        console.log('Data de entrega:', dataEntrega);
        
        alert('Mercadorias cadastradas com sucesso!');
        
        // Limpar formulário e tabela
        form.reset();
        mercadorias = [];
        atualizarTabela();
    });

    // Formatar input de valor
    const valorInput = document.getElementById('valor');
    valorInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = (parseInt(value) / 100).toFixed(2);
            e.target.value = value.replace('.', ',');
        }
    });

    // Formatar input de data
    const dataInput = document.getElementById('dataEntrega');
    dataInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        if (value.length >= 5) {
            value = value.substring(0, 5) + '/' + value.substring(5, 7);
        }
        e.target.value = value;
    });
});

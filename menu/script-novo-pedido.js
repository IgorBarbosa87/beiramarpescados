document.addEventListener('DOMContentLoaded', () => {
    const addProductBtn = document.getElementById('addProductBtn');
    const productsTableBody = document.getElementById('productsTableBody');
    const saveOrderBtn = document.getElementById('saveOrderBtn');

    // Elementos do formulário de adição de produto
    const selectProduto = document.getElementById('produto');
    const inputValor = document.getElementById('valor');
    const inputQuantidade = document.getElementById('quantidade');

    // Simulação de dados (em um projeto real, viriam de uma API)
    const mockProdutos = [
        { id: 1, nome: 'Salmão Fresco', preco: 55.00 },
        { id: 2, nome: 'Tilápia Congelada', preco: 28.50 },
        { id: 3, nome: 'Camarão Rosa', preco: 89.90 },
        { id: 4, nome: 'Lula em Anéis', preco: 45.00 }
    ];

    const mockClientes = [
        { id: 101, nome: 'ATACADO X' },
        { id: 102, nome: 'Restaurante Sabor do Mar' },
        { id: 103, nome: 'Peixaria Central' }
    ];

    let produtosDoPedido = [];

    // Função para carregar os produtos no select
    function carregarProdutos() {
        mockProdutos.forEach(produto => {
            const option = document.createElement('option');
            option.value = produto.id;
            option.textContent = produto.nome;
            selectProduto.appendChild(option);
        });
    }

    // Função para carregar os clientes no select
    function carregarClientes() {
        const selectCliente = document.getElementById('cliente');
        mockClientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = cliente.nome;
            selectCliente.appendChild(option);
        });
    }

    // Função para atualizar o valor do produto ao selecionar
    selectProduto.addEventListener('change', () => {
        const produtoId = parseInt(selectProduto.value);
        const produtoSelecionado = mockProdutos.find(p => p.id === produtoId);
        if (produtoSelecionado) {
            // Formata o valor para o padrão monetário (R$)
            inputValor.value = produtoSelecionado.preco.toFixed(2).replace('.', ',');
        } else {
            inputValor.value = '';
        }
    });

    // Função para adicionar um produto à tabela
    addProductBtn.addEventListener('click', () => {
        const produtoId = parseInt(selectProduto.value);
        const quantidade = parseInt(inputQuantidade.value);
        const valorUnitarioStr = inputValor.value.replace(',', '.');
        const valorUnitario = parseFloat(valorUnitarioStr);

        if (!produtoId || isNaN(quantidade) || quantidade <= 0 || isNaN(valorUnitario) || valorUnitario <= 0) {
            alert('Por favor, selecione um produto, informe uma quantidade válida e um valor.');
            return;
        }

        const produtoSelecionado = mockProdutos.find(p => p.id === produtoId);
        if (!produtoSelecionado) {
            alert('Produto não encontrado.');
            return;
        }

        const total = valorUnitario * quantidade;

        const novoProduto = {
            id: produtosDoPedido.length + 1, // ID temporário para a linha da tabela
            produtoNome: produtoSelecionado.nome,
            quantidade: quantidade,
            precoUnitario: valorUnitario,
            total: total
        };

        produtosDoPedido.push(novoProduto);
        renderizarTabelaProdutos();
        limparFormularioProduto();
    });

    // Função para remover um produto da tabela
    function removerProduto(id) {
        produtosDoPedido = produtosDoPedido.filter(produto => produto.id !== id);
        renderizarTabelaProdutos();
    }

    // Função para renderizar a tabela de produtos
    function renderizarTabelaProdutos() {
        productsTableBody.innerHTML = '';
        produtosDoPedido.forEach(produto => {
            const row = productsTableBody.insertRow();
            row.innerHTML = `
                <td>${produto.produtoNome}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.precoUnitario.toFixed(2).replace('.', ',')}</td>
                <td>R$ ${produto.total.toFixed(2).replace('.', ',')}</td>
                <td><button class="remove-btn" data-id="${produto.id}"><i class="fas fa-trash"></i></button></td>
            `;
        });

        // Adiciona evento de remoção aos novos botões
        productsTableBody.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                removerProduto(id);
            });
        });
    }

    // Função para limpar o formulário de adição de produto
    function limparFormularioProduto() {
        selectProduto.value = '';
        inputValor.value = '';
        inputQuantidade.value = '1';
    }

    // Função para salvar o pedido (simulação)
    saveOrderBtn.addEventListener('click', () => {
        const clienteId = document.getElementById('cliente').value;
        const dataEntrega = document.getElementById('dataEntrega').value;

        if (!clienteId || !dataEntrega) {
            alert('Por favor, selecione um cliente e informe a data de entrega.');
            return;
        }

        if (produtosDoPedido.length === 0) {
            alert('O pedido deve ter pelo menos um produto.');
            return;
        }

        const totalPedido = produtosDoPedido.reduce((acc, produto) => acc + produto.total, 0);

        const pedido = {
            clienteId: clienteId,
            dataEntrega: dataEntrega,
            produtos: produtosDoPedido,
            total: totalPedido
        };

        console.log('Pedido a ser salvo:', pedido);
        alert(`Pedido salvo com sucesso! Total: R$ ${totalPedido.toFixed(2).replace('.', ',')}`);

        // Limpar o formulário após salvar (simulação)
        document.getElementById('cliente').value = '';
        document.getElementById('dataEntrega').value = '';
        produtosDoPedido = [];
        renderizarTabelaProdutos();
    });

    // Inicialização
    carregarProdutos();
    carregarClientes();
});

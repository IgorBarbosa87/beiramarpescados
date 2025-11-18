document.addEventListener('DOMContentLoaded', () => {
    const addProductBtn = document.getElementById('addProductBtn');
    const productsTableBody = document.getElementById('productsTableBody');
    const saveOrderBtn = document.getElementById('saveOrderBtn');

    // Elementos do formulário de adição de produto
    const selectProduto = document.getElementById('produto');
    const inputValor = document.getElementById('valor');
    const inputQuantidade = document.getElementById('quantidade');
    const inputDataEntrega = document.getElementById('dataEntrega');

    // Lista de produtos conforme CADASTRO DE PRODUTO
    const mockProdutos = [
        { id: 101, nome: 'TILÁPIA INTEIRA CONGELADA', preco: 28.50 },
        { id: 102, nome: 'LAGOSTA (GRANEL)', preco: 89.90 },
        { id: 103, nome: 'SALMÃO INTEIRO CONGELADO', preco: 55.00 },
        { id: 104, nome: 'CAMARÃO SEM CABEÇA (GRANEL/PACOTE)', preco: 45.00 }
    ];

    const mockClientes = [
        { id: 101, nome: 'ATACADO X' },
        { id: 102, nome: 'Restaurante Sabor do Mar' },
        { id: 103, nome: 'Peixaria Central' }
    ];

    let produtosDoPedido = [];
    let editandoId = null; // ID do produto que está sendo editado

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

    // Função para formatar valor para R$
    function formatarValor(valor) {
        return valor.toFixed(2).replace('.', ',');
    }

    // Função para converter valor formatado (R$) para número
    function converterValor(valorStr) {
        return parseFloat(valorStr.replace(',', '.'));
    }

    // Função para atualizar o valor do produto ao selecionar
    selectProduto.addEventListener('change', () => {
        const produtoId = parseInt(selectProduto.value);
        const produtoSelecionado = mockProdutos.find(p => p.id === produtoId);
        if (produtoSelecionado) {
            inputValor.value = formatarValor(produtoSelecionado.preco);
        } else {
            inputValor.value = '';
        }
    });

    // Função para adicionar um produto à tabela
    addProductBtn.addEventListener('click', () => {
        const produtoId = parseInt(selectProduto.value);
        const quantidade = parseInt(inputQuantidade.value);
        const valorUnitario = converterValor(inputValor.value);

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

        if (editandoId !== null) {
            // Editar produto existente
            const produtoExistente = produtosDoPedido.find(p => p.id === editandoId);
            if (produtoExistente) {
                produtoExistente.produtoNome = produtoSelecionado.nome;
                produtoExistente.quantidade = quantidade;
                produtoExistente.precoUnitario = valorUnitario;
                produtoExistente.total = total;
            }
            editandoId = null;
            addProductBtn.textContent = 'ADICIONAR';
        } else {
            // Adicionar novo produto
            const novoProduto = {
                id: produtosDoPedido.length + 1,
                produtoNome: produtoSelecionado.nome,
                quantidade: quantidade,
                precoUnitario: valorUnitario,
                total: total
            };
            produtosDoPedido.push(novoProduto);
        }

        renderizarTabelaProdutos();
        limparFormularioProduto();
    });

    // Função para remover um produto da tabela
    function removerProduto(id) {
        if (confirm('Deseja remover este item do pedido?')) {
            produtosDoPedido = produtosDoPedido.filter(produto => produto.id !== id);
            renderizarTabelaProdutos();
        }
    }

    // Função para editar um produto
    function editarProduto(id) {
        const produto = produtosDoPedido.find(p => p.id === id);
        if (produto) {
            editandoId = id;
            
            // Preencher o formulário com os dados do produto
            selectProduto.value = mockProdutos.find(p => p.nome === produto.produtoNome)?.id || '';
            inputValor.value = formatarValor(produto.precoUnitario);
            inputQuantidade.value = produto.quantidade;
            
            // Mudar o texto do botão
            addProductBtn.textContent = 'ATUALIZAR';
            
            // Scroll para o formulário
            document.querySelector('.add-product-form').scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Função para renderizar a tabela de produtos
    function renderizarTabelaProdutos() {
        productsTableBody.innerHTML = '';
        produtosDoPedido.forEach(produto => {
            const row = productsTableBody.insertRow();
            row.innerHTML = `
                <td>${produto.produtoNome}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${formatarValor(produto.precoUnitario)}</td>
                <td>R$ ${formatarValor(produto.total)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-edit-item" data-id="${produto.id}" title="Editar"><i class="fas fa-edit"></i></button>
                        <button class="btn-remove-item" data-id="${produto.id}" title="Remover"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            `;
        });

        // Adiciona eventos aos botões de edição
        productsTableBody.querySelectorAll('.btn-edit-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                editarProduto(id);
            });
        });

        // Adiciona eventos aos botões de remoção
        productsTableBody.querySelectorAll('.btn-remove-item').forEach(button => {
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
        editandoId = null;
        addProductBtn.textContent = 'ADICIONAR';
    }

    // Função para converter data de formato ISO para DD/MM/YYYY
    function formatarDataBR(dataISO) {
        if (!dataISO) return '';
        const [ano, mes, dia] = dataISO.split('-');
        return `${dia}/${mes}/${ano}`;
    }

    // Função para salvar o pedido (simulação)
    saveOrderBtn.addEventListener('click', () => {
        const clienteId = document.getElementById('cliente').value;
        const dataEntrega = inputDataEntrega.value;

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
            dataEntrega: formatarDataBR(dataEntrega),
            produtos: produtosDoPedido,
            total: totalPedido
        };

        console.log('Pedido a ser salvo:', pedido);
        alert(`Pedido salvo com sucesso! Total: R$ ${formatarValor(totalPedido)}`);

        // Limpar o formulário após salvar (simulação)
        document.getElementById('cliente').value = '';
        inputDataEntrega.value = '';
        produtosDoPedido = [];
        renderizarTabelaProdutos();
        limparFormularioProduto();
    });

    // Inicialização
    carregarProdutos();
    carregarClientes();
});

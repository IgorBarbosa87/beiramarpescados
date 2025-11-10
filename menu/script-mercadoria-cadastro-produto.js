// Script para funcionalidade do Cadastro de Produto
document.addEventListener('DOMContentLoaded', function() {
    const btnAdicionar = document.getElementById('btnAdicionar');
    const produtoSelect = document.getElementById('produto');
    const productsList = document.querySelector('.products-list');
    const modal = document.getElementById('editModal');
    const closeModal = document.querySelector('.close');
    const editForm = document.getElementById('editForm');
    const btnCancelar = document.querySelector('.btn-cancelar-modal');

    let currentEditingItem = null;
    let nextCode = 105; // Próximo código disponível

    // Adicionar novo produto
    btnAdicionar.addEventListener('click', function() {
        const selectedOption = produtoSelect.options[produtoSelect.selectedIndex];
        
        if (!selectedOption.value) {
            alert('Por favor, selecione um produto.');
            return;
        }

        const produtoNome = selectedOption.text;
        const codigo = String(nextCode).padStart(4, '0');
        
        // Criar novo item de produto
        const newProductItem = document.createElement('div');
        newProductItem.className = 'product-item';
        newProductItem.setAttribute('data-code', codigo);
        newProductItem.innerHTML = `
            <div class="product-code">${codigo}</div>
            <div class="product-name">
                <button class="btn-edit"><i class="fas fa-edit"></i></button>
                ${produtoNome}
            </div>
        `;

        // Adicionar à lista
        productsList.appendChild(newProductItem);

        // Adicionar evento de edição ao novo botão
        const editBtn = newProductItem.querySelector('.btn-edit');
        editBtn.addEventListener('click', function() {
            openEditModal(newProductItem);
        });

        // Incrementar código
        nextCode++;

        // Resetar select
        produtoSelect.value = '';
        
        alert('Produto adicionado com sucesso!');
    });

    // Abrir modal de edição
    function openEditModal(productItem) {
        currentEditingItem = productItem;
        const codigo = productItem.getAttribute('data-code');
        const nomeElement = productItem.querySelector('.product-name');
        const nome = nomeElement.textContent.trim();

        document.getElementById('editCodigo').value = codigo;
        document.getElementById('editNome').value = nome;

        modal.style.display = 'block';
    }

    // Fechar modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        currentEditingItem = null;
    });

    btnCancelar.addEventListener('click', function() {
        modal.style.display = 'none';
        currentEditingItem = null;
    });

    // Fechar modal ao clicar fora
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            currentEditingItem = null;
        }
    });

    // Salvar edição
    editForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const novoNome = document.getElementById('editNome').value.trim();

        if (!novoNome) {
            alert('Por favor, informe o nome do produto.');
            return;
        }

        if (currentEditingItem) {
            const nomeElement = currentEditingItem.querySelector('.product-name');
            const editBtn = nomeElement.querySelector('.btn-edit');
            
            // Atualizar nome mantendo o botão
            nomeElement.innerHTML = '';
            nomeElement.appendChild(editBtn);
            nomeElement.appendChild(document.createTextNode(' ' + novoNome));

            alert('Produto atualizado com sucesso!');
            modal.style.display = 'none';
            currentEditingItem = null;
        }
    });

    // Adicionar eventos de edição aos produtos existentes
    const editButtons = document.querySelectorAll('.btn-edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productItem = this.closest('.product-item');
            openEditModal(productItem);
        });
    });
});

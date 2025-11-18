const pedidos = [
  {
    id: "PEDIDO/120",
    status: "pendente",
    data: "05/10/25",
    cliente: "Tabajara Soledade",
    produtos: [
      { nome: "Filé de Surubim", qtd: 2 },
      { nome: "Pescada Posta M", qtd: 10 },
      { nome: "Filé de Pescadinhas", qtd: 22 },
      { nome: "Posta de Atum", qtd: 6 },
      { nome: "Filé de Pescada Amarela", qtd: 8 },
      { nome: "Filé de Pescada Branca", qtd: 2 },
      { nome: "Filé de Dourada", qtd: 4 }
    ]
  }
];

const columns = document.querySelectorAll('.orders');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDate = document.getElementById('modal-date');
const modalClient = document.getElementById('modal-client');
const modalProducts = document.getElementById('modal-products');
const modalActions = document.getElementById('modal-actions');

function renderPedidos() {
  columns.forEach(col => col.innerHTML = "");
  pedidos.forEach(p => {
    const col = document.querySelector(`.column[data-status="${p.status}"] .orders`);
    const div = document.createElement('div');
    div.className = 'order';
    div.innerHTML = `
      <p><strong>${p.id}</strong></p>
      <p>${p.data}</p>
      <p>CLIENTE -</p>
      <button onclick="abrirModal('${p.id}')">DETALHES</button>
    `;
    col.appendChild(div);
  });
}

function abrirModal(id) {
  const p = pedidos.find(x => x.id === id);
  modalTitle.textContent = `${p.id} - ${p.status.toUpperCase()}`;
  modalDate.textContent = p.data;
  modalClient.textContent = p.cliente;
  modalProducts.innerHTML = "";
  p.produtos.forEach(prod => {
    modalProducts.innerHTML += `<tr><td>${prod.nome}</td><td>${prod.qtd}</td></tr>`;
  });

  modalActions.innerHTML = "";
  if (p.status === "pendente") {
    modalActions.innerHTML = `<button onclick="mudarStatus('${id}', 'producao')">Iniciar Produção</button>`;
  } else if (p.status === "producao") {
    modalActions.innerHTML = `
      <button onclick="mudarStatus('${id}', 'armazenamento')">Armazenamento</button>
      <button onclick="mudarStatus('${id}', 'enviado')">Enviar</button>
    `;
  } else if (p.status === "armazenamento") {
    modalActions.innerHTML = `<button onclick="mudarStatus('${id}', 'enviado')">Enviar</button>`;
  }

  modal.classList.remove('hidden');
}

function mudarStatus(id, novoStatus) {
  const p = pedidos.find(x => x.id === id);
  p.status = novoStatus;
  modal.classList.add('hidden');
  renderPedidos();
}

document.querySelector('.modal .close').addEventListener('click', () => {
  modal.classList.add('hidden');
});

function gerarId() {
  const numero = 100 + pedidos.length + 1;
  return `PEDIDO/${numero}`;
}

function criarNovoPedido() {
  const novo = {
    id: gerarId(),
    status: "pendente",
    data: new Date().toLocaleDateString("pt-BR"),
    cliente: "Cliente -",
    produtos: [
      { nome: "Filé de Surubim", qtd: 2 },
      { nome: "Filé de Pescada Branca", qtd: 4 }
    ]
  };
  pedidos.push(novo);
  renderPedidos();

  // Efeito visual no novo pedido
  const cards = document.querySelectorAll('.order');
  const ultimo = cards[cards.length - 1];
  ultimo.classList.add('new');
}

document.getElementById('btnNovoPedido').addEventListener('click', criarNovoPedido);

// Lógica para expandir/recolher submenus
const submenuLinks = document.querySelectorAll('.menu-item.has-submenu > a');

const toggleSubmenu = (element) => {
  const parentLi = element.closest('.menu-item');
  parentLi.classList.toggle('expanded');
  
  const toggleIcon = parentLi.querySelector('.submenu-toggle');
  if (toggleIcon) {
    toggleIcon.classList.toggle('fa-chevron-up');
    toggleIcon.classList.toggle('fa-chevron-down');
  }
};

submenuLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    if (this.closest('.menu-item').classList.contains('has-submenu')) {
      e.preventDefault();
      toggleSubmenu(this);
    }
  });
});
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    
    if (usuarioLogado) {
        const userNameElement = document.querySelector('.user-name');
        if (userNameElement) {
            userNameElement.textContent = `0001 - ${usuarioLogado.toUpperCase()}`;
        }
    }

renderPedidos();

// --- Lógica de Consulta de Mercadoria (Movida) ---

document.addEventListener('DOMContentLoaded', function() {
    // A lógica de tabs agora deve ser aplicada apenas aos elementos dentro do novo container
    const tabs = document.querySelectorAll('.consulta-mercadoria-container .tab');
    
    // Os IDs dos conteúdos das tabs foram alterados para evitar conflito: em-rota-consulta e entregue-consulta
    const tabContents = [
        document.getElementById('em-rota-consulta'),
        document.getElementById('entregue-consulta')
    ];

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Remove active class from all tab contents
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            // Mapeamento do data-tab para o ID do conteúdo
            const contentId = tabId === 'em-rota' ? 'em-rota-consulta' : 'entregue-consulta';
            
            const contentElement = document.getElementById(contentId);
            if (contentElement) {
                contentElement.classList.add('active');
            }
        });
    });

    // Lógica do Modal de Recebimento de Mercadoria
    /* const detalhesButtons = document.querySelectorAll('.btn-detalhes, .btn-receber');
    const recebimentoModal = document.getElementById('recebimentoModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const salvarModalBtn = document.getElementById('salvarModalBtn');

    detalhesButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Abrir o modal
            recebimentoModal.style.display = 'block';
            // Você pode adicionar aqui a lógica para carregar dados específicos do pedido, se necessário
        });
    }); */

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
// Lógica para os botões DETALHES na tabela ENTREGUE
    document.querySelectorAll('#entregue-consulta .btn-detalhes').forEach(button => {
        button.addEventListener('click', function(e) {
            // O ID do pedido está na primeira célula (td) da linha (tr)
            const pedidoId = e.target.closest('tr').querySelector('td:first-child').textContent.trim();
            
            // A função 'abrirModal' no script-painel-de-vendas.js espera um ID que está no array 'pedidos'.
            // No entanto, os pedidos da tabela 'ENTREGUE' (e 'EM ROTA') não estão no array 'pedidos' do script-painel-de-vendas.js.
            // Eles são dados estáticos no HTML.
            
            // Para simular a abertura do modal com os dados da linha, vamos criar um objeto de pedido temporário.
            const row = e.target.closest('tr');
            const data = row.children[1].textContent.trim();
            const cliente = row.children[3].textContent.trim();
            
            // Como não temos os produtos, vamos usar um mock para que a função 'abrirModal' não quebre.
            const mockPedido = {
                id: pedidoId,
                status: 'entregue',
                data: data,
                cliente: cliente,
                produtos: [{ nome: 'Item 1 (Mock)', qtd: 1 }, { nome: 'Item 2 (Mock)', qtd: 2 }]
            };
            
            // Adicionar o mockPedido temporariamente ao array 'pedidos' para que 'abrirModal' funcione
            const originalPedidosLength = pedidos.length;
            pedidos.push(mockPedido);
            
            // Chamar a função abrirModal
            abrirModal(pedidoId);
            
            // Remover o mockPedido do array 'pedidos'
            pedidos.pop();
            
            // O modal de recebimento pode estar sendo exibido, vamos garantir que ele seja escondido
            recebimentoModal.style.display = 'none';
        });
    });

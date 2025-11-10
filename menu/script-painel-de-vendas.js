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

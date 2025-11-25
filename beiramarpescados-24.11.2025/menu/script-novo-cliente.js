document.addEventListener('DOMContentLoaded', function() {
    // Lógica para expandir/recolher submenus (reutilizada)
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

    // Lógica de submissão do formulário
    const newClientForm = document.getElementById('newClientForm');
    if (newClientForm) {
        newClientForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulação de coleta de dados do formulário
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;

            alert(`Simulando adição do novo cliente: ${nome} (${email}).`);

            // Aqui seria a lógica para enviar os dados para o backend
            // newClientForm.reset(); // Limpar o formulário após o "salvamento"
        });
    }
});

// Script unificado de navegação de menu para todas as páginas
document.addEventListener('DOMContentLoaded', function() {
    // Lógica para o toggle dos submenus
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

    // Lógica para o botão de logout
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            fazerLogout();
        });
    }

    // Atualizar nome do usuário se estiver logado
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    
    if (usuarioLogado) {
        const userNameElement = document.querySelector('.user-name');
        if (userNameElement) {
            userNameElement.textContent = `0001 - ${usuarioLogado.toUpperCase()}`;
        }
    }
});

function fazerLogout() {
    if (confirm('Deseja sair do sistema?')) {
        window.location.href = '../login/login.html';
    }
}

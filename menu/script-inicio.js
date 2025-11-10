
document.addEventListener('DOMContentLoaded', function() {
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

    const ctx = document.getElementById('categoryChart');

    if (ctx) {
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['EM ANÁLISE', 'ENTREGUE', 'RUPTURA', 'EM PRODUÇÃO'],
                datasets: [{
                    data: [30, 35, 25, 10],
                    backgroundColor: [
                        '#3498db',
                        '#2ecc71',
                        '#e74c3c',
                        '#f1c40f'
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += context.parsed + '%';
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            fazerLogout();
        });
    }

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


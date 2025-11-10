// script-avisos.js
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const avisosContainer = document.querySelector('.avisos-container');
    const btnNovoAviso = document.getElementById('btnNovoAviso');
    const modalAviso = document.getElementById('modalAviso');
    const closeModal = document.querySelector('.close');
    const btnCancelar = document.getElementById('btnCancelar');
    const formAviso = document.getElementById('formAviso');
    const modalTitulo = document.getElementById('modalTitulo');
    
    // Chaves para localStorage
    const AVISOS_KEY = 'dashboard_avisos';
    
    // Carregar avisos ao iniciar
    carregarAvisos();
    
    // Event Listeners
    btnNovoAviso.addEventListener('click', abrirModalNovoAviso);
    closeModal.addEventListener('click', fecharModal);
    btnCancelar.addEventListener('click', fecharModal);
    formAviso.addEventListener('submit', salvarAviso);
    
    // Fechar modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target === modalAviso) {
            fecharModal();
        }
    });
    
    // Funções
    function carregarAvisos() {
        const avisos = obterAvisos();
        exibirAvisos(avisos);
    }
    
    function obterAvisos() {
        const avisosJSON = localStorage.getItem(AVISOS_KEY);
        return avisosJSON ? JSON.parse(avisosJSON) : [];
    }
    
    function salvarAvisos(avisos) {
        localStorage.setItem(AVISOS_KEY, JSON.stringify(avisos));
    }
    
    function exibirAvisos(avisos) {
        if (avisos.length === 0) {
            avisosContainer.innerHTML = `
                <div class="sem-avisos">
                    <i class="fas fa-bell-slash"></i>
                    <p>Nenhum aviso cadastrado</p>
                </div>
            `;
            return;
        }
        
        // Filtrar avisos expirados
        const hoje = new Date().toISOString().split('T')[0];
        const avisosAtivos = avisos.filter(aviso => 
            !aviso.dataExpiracao || aviso.dataExpiracao >= hoje
        );
        
        // Ordenar por prioridade (alta -> média -> baixa) e data
        avisosAtivos.sort((a, b) => {
            const prioridades = { alta: 3, media: 2, baixa: 1 };
            if (prioridades[b.prioridade] !== prioridades[a.prioridade]) {
                return prioridades[b.prioridade] - prioridades[a.prioridade];
            }
            return new Date(b.dataCriacao) - new Date(a.dataCriacao);
        });
        
        let html = '';
        avisosAtivos.forEach(aviso => {
            html += criarCardAviso(aviso);
        });
        
        avisosContainer.innerHTML = html;
        
        // Adicionar event listeners para os botões de editar e excluir
        document.querySelectorAll('.btn-editar').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                editarAviso(id);
            });
        });
        
        document.querySelectorAll('.btn-excluir').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                excluirAviso(id);
            });
        });
    }
    
    function criarCardAviso(aviso) {
        const dataCriacao = formatarData(aviso.dataCriacao);
        const dataExpiracao = aviso.dataExpiracao ? formatarData(aviso.dataExpiracao) : 'Sem data de expiração';
        
        return `
            <div class="aviso-card ${aviso.prioridade}">
                <div class="aviso-header">
                    <h3 class="aviso-titulo">${aviso.titulo}</h3>
                    <span class="aviso-prioridade prioridade-${aviso.prioridade}">${aviso.prioridade.toUpperCase()}</span>
                </div>
                <div class="aviso-mensagem">${aviso.mensagem}</div>
                <div class="aviso-footer">
                    <div class="aviso-datas">
                        <span>Criado em: ${dataCriacao}</span>
                        ${aviso.dataExpiracao ? `<span> | Expira em: ${dataExpiracao}</span>` : ''}
                    </div>
                    <div class="aviso-acoes">
                        <button class="btn-editar" data-id="${aviso.id}">Editar</button>
                        <button class="btn-excluir" data-id="${aviso.id}">Excluir</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    function formatarData(dataString) {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR');
    }
    
    function abrirModalNovoAviso() {
        modalTitulo.textContent = 'NOVO AVISO';
        formAviso.reset();
        document.getElementById('avisoId').value = '';
        document.getElementById('avisoData').value = '';
        modalAviso.style.display = 'block';
    }
    
    function fecharModal() {
        modalAviso.style.display = 'none';
    }
    
    function editarAviso(id) {
        const avisos = obterAvisos();
        const aviso = avisos.find(a => a.id === id);
        
        if (aviso) {
            modalTitulo.textContent = 'EDITAR AVISO';
            document.getElementById('avisoId').value = aviso.id;
            document.getElementById('avisoTitulo').value = aviso.titulo;
            document.getElementById('avisoMensagem').value = aviso.mensagem;
            document.getElementById('avisoPrioridade').value = aviso.prioridade;
            document.getElementById('avisoData').value = aviso.dataExpiracao || '';
            modalAviso.style.display = 'block';
        }
    }
    
    function excluirAviso(id) {
        if (confirm('Tem certeza que deseja excluir este aviso?')) {
            const avisos = obterAvisos();
            const avisosAtualizados = avisos.filter(aviso => aviso.id !== id);
            salvarAvisos(avisosAtualizados);
            carregarAvisos();
        }
    }
    
    function salvarAviso(event) {
        event.preventDefault();
        
        const id = document.getElementById('avisoId').value;
        const titulo = document.getElementById('avisoTitulo').value.trim();
        const mensagem = document.getElementById('avisoMensagem').value.trim();
        const prioridade = document.getElementById('avisoPrioridade').value;
        const dataExpiracao = document.getElementById('avisoData').value;
        
        if (!titulo || !mensagem) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        const avisos = obterAvisos();
        
        if (id) {
            // Editar aviso existente
            const index = avisos.findIndex(aviso => aviso.id === id);
            if (index !== -1) {
                avisos[index] = {
                    ...avisos[index],
                    titulo,
                    mensagem,
                    prioridade,
                    dataExpiracao: dataExpiracao || null
                };
            }
        } else {
            // Criar novo aviso
            const novoAviso = {
                id: gerarId(),
                titulo,
                mensagem,
                prioridade,
                dataCriacao: new Date().toISOString().split('T')[0],
                dataExpiracao: dataExpiracao || null
            };
            avisos.push(novoAviso);
        }
        
        salvarAvisos(avisos);
        carregarAvisos();
        fecharModal();
    }
    
    function gerarId() {
        return Date.now().toString();
    }
});
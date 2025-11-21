
function fazerLogin() {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    
    if (!usuario || !senha) {
        alert('Por favor, preencha todos os campos');
        return;
    }
    
    localStorage.setItem('usuarioLogado', usuario);
    
    window.location.href = '../menu/inicio.html';
}

function solicitarCodigo() {
    const email = document.querySelector('input[type="email"]').value;
    
    if (!email) {
        alert('Por favor, digite seu e-mail');
        return;
    }

    // Validação de e-mail com '@'
    if (email.indexOf('@') === -1) {
        alert('Por favor, digite um e-mail válido (deve conter @).');
        return;
    }
    
    alert('Código enviado para: ' + email);
    
    window.location.href = 'codigosenha.html';
}

function validarCodigo() {
    const codigo = document.querySelector('input[type="text"]').value;
    
    if (!codigo) {
        alert('Por favor, digite o código recebido');
        return;
    }
    
    window.location.href = '../menu/inicio.html';
}

function voltarLogin() {
    window.location.href = 'login.html';
}


document.addEventListener('DOMContentLoaded', function() {
    const senhaInput = document.getElementById('senha');
    if (senhaInput) {
        senhaInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                fazerLogin();
            }
        });
    }
    
    const btnEntrar = document.getElementById('btao');
    if (btnEntrar) {
        btnEntrar.addEventListener('click', function(e) {
            e.preventDefault();
            fazerLogin();
        });
    }
    
    const btnContinuarSenha = document.querySelector('.senha button[type="submit"]');
    if (btnContinuarSenha) {
        btnContinuarSenha.addEventListener('click', function(e) {
            e.preventDefault();
            solicitarCodigo();
        });
    }
    
    const btnContinuarCodigo = document.querySelector('.form-codigo button[type="submit"]');
    if (btnContinuarCodigo) {
        btnContinuarCodigo.addEventListener('click', function(e) {
            e.preventDefault();
            validarCodigo();
        });
    }
});
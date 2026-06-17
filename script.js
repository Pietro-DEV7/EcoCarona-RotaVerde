document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // =============== BANCO DE DADOS LOCAL ===============
    let appData = JSON.parse(localStorage.getItem('ecoData')) || {
        co2Evitado: 0,
        pontosUsuario: 0,
        pontosTurmaBase: 3120, // Base de pontos dos Meninos do Porão
        isLoggedIn: false
    };

    // =============== REGRAS DE NEGÓCIO ===============
    const regeasPorKM = {
        walk:   { pontos: 120, co2: 0.9, nome: 'A pé' },
        bike:   { pontos: 100, co2: 0.5, nome: 'Bicicleta' },
        carona: { pontos: 60,  co2: 0.3, nome: 'Carona' }
    };

    let modalidadeAtual = null;

    // =============== ELEMENTOS DO DOM ===============
    const screenLogin = document.getElementById('screen-login');
    const mainApp = document.getElementById('main-app');
    const loginForm = document.getElementById('login-form');
    const btnLogout = document.getElementById('btn-logout');
    
    const displayCO2 = document.getElementById('co2-value');
    const displayPoints = document.getElementById('points-value');
    const displayRanking = document.getElementById('ranking-points');

    const modalDistancia = document.getElementById('modal-distancia');
    const modalContent = document.getElementById('modal-content');
    const inputKm = document.getElementById('input-km');
    const btnCancelar = document.getElementById('btn-cancelar-modal');
    const btnConfirmar = document.getElementById('btn-confirmar-modal');
    const modalErro = document.getElementById('modal-erro');
    const modalDesc = document.getElementById('modal-desc');

    // =============== FUNÇÕES PRINCIPAIS ===============
    function updateUI() {
        displayCO2.innerText = appData.co2Evitado.toFixed(1);
        displayPoints.innerText = appData.pontosUsuario;
        displayRanking.innerText = (appData.pontosTurmaBase + appData.pontosUsuario).toLocaleString('pt-BR');
    }

    function checkLoginState() {
        if (appData.isLoggedIn) {
            screenLogin.classList.add('hidden');
            mainApp.classList.remove('hidden');
            mainApp.classList.add('flex');
            updateUI();
        } else {
            screenLogin.classList.remove('hidden');
            mainApp.classList.add('hidden');
            mainApp.classList.remove('flex');
        }
    }

    function saveData() {
        localStorage.setItem('ecoData', JSON.stringify(appData));
    }

    checkLoginState();

    // =============== LOGIN / LOGOUT ===============
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        appData.isLoggedIn = true;
        saveData();
        checkLoginState();
    });

    btnLogout.addEventListener('click', () => {
        appData.isLoggedIn = false;
        saveData();
        checkLoginState();
    });

    // =============== LÓGICA DO MODAL ===============
    document.querySelectorAll('.btn-trip').forEach(button => {
        button.addEventListener('click', (e) => {
            modalidadeAtual = e.currentTarget.getAttribute('data-type');
            modalDesc.innerText = `Quantos KM você percorreu ${regeasPorKM[modalidadeAtual].nome}?`;
            inputKm.value = '';
            modalErro.classList.add('hidden');

            modalDistancia.classList.remove('hidden');
            setTimeout(() => {
                modalDistancia.classList.remove('opacity-0');
                modalContent.classList.remove('scale-95');
            }, 10);
        });
    });

    function fecharModal() {
        modalDistancia.classList.add('opacity-0');
        modalContent.classList.add('scale-95');
        setTimeout(() => {
            modalDistancia.classList.add('hidden');
        }, 300);
    }

    btnCancelar.addEventListener('click', fecharModal);

    btnConfirmar.addEventListener('click', () => {
        const kmIniciado = parseFloat(inputKm.value);

        if (isNaN(kmIniciado) || kmIniciado <= 0) {
            modalErro.classList.remove('hidden');
            return; 
        }

        const regra = regeasPorKM[modalidadeAtual];
        const pontosGanhos = Math.round(kmIniciado * regra.pontos);
        const co2Evitado = kmIniciado * regra.co2;

        appData.pontosUsuario += pontosGanhos;
        appData.co2Evitado += co2Evitado;

        saveData();
        updateUI();

        displayCO2.parentElement.classList.remove('highlight-update');
        displayPoints.parentElement.classList.remove('highlight-update');
        void displayCO2.parentElement.offsetWidth; 
        displayCO2.parentElement.classList.add('highlight-update');
        displayPoints.parentElement.classList.add('highlight-update');

        fecharModal();

        setTimeout(() => {
            alert(`Sucesso! Você andou ${kmIniciado}KM ${regra.nome}.\n\n+ ${pontosGanhos} Pontos\n+ ${co2Evitado.toFixed(1)}kg de CO₂ evitados.\n\nDeseja registrar mais algum trajeto no Dashboard?`);
        }, 400);
    });

    // =============== NAVEGAÇÃO ===============
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = {
        'dashboard': document.getElementById('tab-dashboard'),
        'ranking': document.getElementById('tab-ranking')
    };

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            Object.keys(sections).forEach(key => {
                if(key === target) {
                    sections[key].classList.remove('hidden');
                    sections[key].classList.add('block', 'fade-in');
                } else {
                    sections[key].classList.add('hidden');
                    sections[key].classList.remove('block', 'fade-in');
                }
            });
            navButtons.forEach(nav => {
                if(nav === btn) {
                    nav.classList.remove('text-slate-400');
                    nav.classList.add('text-emerald-600');
                } else {
                    nav.classList.add('text-slate-400');
                    nav.classList.remove('text-emerald-600');
                }
            });
        });
    });
});
// js/salas.js (COM LISTAGEM E DELETE)

// Roda quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    listarSalas(); // <--- NOVO: Mostra a lista quando a página abre

    // Adiciona o listener para o formulário de salvar
    document.getElementById('form-sala').addEventListener('submit', salvarSala);

    // Adiciona listener para a lista (para os botões de apagar)
    document.getElementById('lista-salas').addEventListener('click', function(event) {
        // Verifica se o clique foi num botão de apagar
        if (event.target.classList.contains('btn-delete-sala')) {
            const salaId = event.target.getAttribute('data-id');
            apagarSala(salaId); // <--- NOVO: Chama a função de apagar
        }
    });
});

// Esta função você já tinha, mas ela agora chama 'listarSalas()' no final
function salvarSala(e) {
    e.preventDefault();

    const sala = {
        id: Date.now(),
        nome: document.getElementById('nomeSala').value,
        capacidade: parseInt(document.getElementById('capacidade').value),
        tipo: document.getElementById('tipo').value
    };

    const salas = getData('salas');
    salas.push(sala);
    saveData('salas', salas);

    alert('Sala salva com sucesso!');
    e.target.reset();

    listarSalas(); // <--- NOVO: Atualiza a lista na tela
}

// --- NOVA FUNÇÃO: Listar Salas ---
function listarSalas() {
    const salas = getData('salas');
    const containerLista = document.getElementById('lista-salas');
    containerLista.innerHTML = ''; // Limpa a lista antes de redesenhar

    if (salas.length === 0) {
        containerLista.innerHTML = '<li class="list-group-item">Nenhuma sala cadastrada.</li>';
        return;
    }

    salas.forEach(sala => {
        const item = document.createElement('li');
        item.className = 'list-group-item d-flex justify-content-between align-items-center';
        // Cria o HTML para o item da lista
        item.innerHTML = `
            <div>
                <strong>${sala.nome}</strong> (${sala.tipo})
                <br>
                <small class="text-muted">Capacidade: ${sala.capacidade} lugares</small>
            </div>
            <button class="btn btn-danger btn-sm btn-delete-sala" data-id="${sala.id}">
                Apagar
            </button>
        `;
        containerLista.appendChild(item);
    });
}

// --- NOVA FUNÇÃO: Apagar Sala ---
function apagarSala(id) {
    // 1. TRAVA DE SEGURANÇA
    const sessoes = getData('sessoes');
    // Verifica se alguma sessão ('some') está usando esta sala
    const salaEmUso = sessoes.some(sessao => sessao.salaId == id);

    if (salaEmUso) {
        alert('Erro: Esta sala não pode ser apagada, pois está vinculada a uma ou mais sessões.\nPor favor, apague as sessões primeiro.');
        return; // Para a execução
    }

    // 2. Confirmação
    if (confirm('Tem certeza que deseja apagar esta sala?')) {
        const salas = getData('salas');
        // Cria um novo array sem a sala que queremos apagar
        const novasSalas = salas.filter(sala => sala.id != id);
        saveData('salas', novasSalas); // Salva o novo array
        
        alert('Sala apagada com sucesso!');
        listarSalas(); // Atualiza a lista na tela
    }
}
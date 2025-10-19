// js/editar-sessao.js

let sessaoIdParaEditar = null;

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const sessaoId = params.get('id');

    if (!sessaoId) {
        alert('ID da sessão não encontrado!');
        window.location.href = 'sessoes.html'; 
        return;
    }

    sessaoIdParaEditar = sessaoId;
    carregarFilmesESalas();
    carregarDadosSessao(sessaoId);
});

function carregarFilmesESalas() {
    const filmes = getData('filmes');
    const salas = getData('salas');

    const selectFilme = document.getElementById('filme');
    const selectSala = document.getElementById('sala');

    selectFilme.innerHTML = '<option value="">Selecione um filme...</option>';
    selectSala.innerHTML = '<option value="">Selecione uma sala...</option>';

    filmes.forEach(filme => {
        const option = document.createElement('option');
        option.value = filme.id;
        option.textContent = filme.titulo;
        selectFilme.appendChild(option);
    });

    salas.forEach(sala => {
        const option = document.createElement('option');
        option.value = sala.id;
        option.textContent = `${sala.nome} (${sala.tipo})`;
        selectSala.appendChild(option);
    });
}

function carregarDadosSessao(id) {
    const sessoes = getData('sessoes');
    const sessao = sessoes.find(s => s.id == id);

    if (!sessao) {
        alert('Sessão não encontrada!');
        window.location.href = 'sessoes.html';
        return;
    }

    // Preenche o formulário
    document.getElementById('filme').value = sessao.filmeId;
    document.getElementById('sala').value = sessao.salaId;
    document.getElementById('dataHora').value = sessao.dataHora;
    document.getElementById('preco').value = sessao.preco;
    document.getElementById('idioma').value = sessao.idioma;
    document.getElementById('formato').value = sessao.formato;
}

// Lógica para SALVAR a edição
document.getElementById('form-sessao').addEventListener('submit', function(e) {
    e.preventDefault();

    const sessaoAtualizada = {
        id: parseInt(sessaoIdParaEditar), // Mantém o ID original
        filmeId: parseInt(document.getElementById('filme').value),
        salaId: parseInt(document.getElementById('sala').value),
        dataHora: document.getElementById('dataHora').value,
        preco: parseFloat(document.getElementById('preco').value),
        idioma: document.getElementById('idioma').value,
        formato: document.getElementById('formato').value
    };

    const sessoes = getData('sessoes');
    
    // Encontra o ÍNDICE (posição) da sessão antiga
    const indexParaAtualizar = sessoes.findIndex(s => s.id == sessaoIdParaEditar);

    if (indexParaAtualizar === -1) {
        alert('Erro ao encontrar sessão para atualizar.');
        return;
    }

    // Substitui a sessão antiga pela nova
    sessoes[indexParaAtualizar] = sessaoAtualizada;
    saveData('sessoes', sessoes);

    alert('Sessão atualizada com sucesso!');
    window.location.href = 'sessoes.html'; // Volta para a lista
});
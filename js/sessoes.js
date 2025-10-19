// js/sessoes.js

// Executa quando o DOM estiver totalmente carregado
document.addEventListener('DOMContentLoaded', function() {
    carregarFilmesESalas();
});

function carregarFilmesESalas() {
    const filmes = getData('filmes');
    const salas = getData('salas');

    const selectFilme = document.getElementById('filme');
    const selectSala = document.getElementById('sala');

    // Preenche o select de filmes
    filmes.forEach(filme => {
        const option = document.createElement('option');
        option.value = filme.id; // Salva o ID do filme
        option.textContent = filme.titulo; // Mostra o título
        selectFilme.appendChild(option);
    });

    // Preenche o select de salas
    salas.forEach(sala => {
        const option = document.createElement('option');
        option.value = sala.id; // Salva o ID da sala
        option.textContent = `${sala.nome} (${sala.tipo})`; // Mostra nome e tipo
        selectSala.appendChild(option);
    });
}

// Lógica para salvar a sessão
document.getElementById('form-sessao').addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Coletar dados
    const filmeId = document.getElementById('filme').value;
    const salaId = document.getElementById('sala').value;
    const dataHora = document.getElementById('dataHora').value;
    const preco = document.getElementById('preco').value;
    const idioma = document.getElementById('idioma').value;
    const formato = document.getElementById('formato').value;

    // 2. Criar objeto
    const sessao = {
        id: Date.now(),
        filmeId: parseInt(filmeId), // Armazena APENAS o ID
        salaId: parseInt(salaId),   // Armazena APENAS o ID
        dataHora: dataHora,
        preco: parseFloat(preco),
        idioma: idioma,
        formato: formato
    };

    // 3. Salvar no localStorage
    const sessoes = getData('sessoes');
    sessoes.push(sessao);
    saveData('sessoes', sessoes);

    // 4. Feedback
    alert('Sessão salva com sucesso!');
    e.target.reset();
});
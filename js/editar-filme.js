// js/editar-filme.js

// Variável global para guardar o ID do filme
let filmeIdParaEditar = null;

// Roda quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // 1. Pegar o ID da URL
    const params = new URLSearchParams(window.location.search);
    const filmeId = params.get('id');

    if (!filmeId) {
        alert('ID do filme não encontrado!');
        window.location.href = 'cadastro-filmes.html'; // Volta para a lista
        return;
    }

    filmeIdParaEditar = filmeId;

    // 2. Carregar os dados do filme no formulário
    carregarDadosFilme(filmeId);

    // 3. Adicionar listener para o submit do formulário
    document.getElementById('form-filme').addEventListener('submit', salvarEdicaoFilme);
});

// Carrega os dados do filme específico e preenche o formulário
function carregarDadosFilme(id) {
    const filmes = getData('filmes');
    // Encontra o filme pelo ID
    const filme = filmes.find(f => f.id == id);

    if (!filme) {
        alert('Filme não encontrado!');
        window.location.href = 'cadastro-filmes.html';
        return;
    }

    // Preenche o formulário
    document.getElementById('titulo').value = filme.titulo;
    document.getElementById('descricao').value = filme.descricao;
    document.getElementById('urlImagem').value = filme.urlImagem;
    document.getElementById('genero').value = filme.genero;
    document.getElementById('classificacao').value = filme.classificacao;
    document.getElementById('duracao').value = filme.duracao;
    document.getElementById('dataEstreia').value = filme.dataEstreia;
}

// Salva as alterações
function salvarEdicaoFilme(e) {
    e.preventDefault();

    // 1. Coletar dados do formulário
    const filmeAtualizado = {
        id: parseInt(filmeIdParaEditar), // Mantém o ID original
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        urlImagem: document.getElementById('urlImagem').value,
        genero: document.getElementById('genero').value,
        classificacao: document.getElementById('classificacao').value,
        duracao: parseInt(document.getElementById('duracao').value),
        dataEstreia: document.getElementById('dataEstreia').value
    };

    // 2. Atualizar no localStorage
    const filmes = getData('filmes');
    
    // Encontra o ÍNDICE (posição) do filme antigo
    const indexParaAtualizar = filmes.findIndex(f => f.id == filmeIdParaEditar);

    if (indexParaAtualizar === -1) {
        alert('Erro ao encontrar filme para atualizar.');
        return;
    }

    // Substitui o filme antigo pelo novo
    filmes[indexParaAtualizar] = filmeAtualizado;

    // Salva o array modificado
    saveData('filmes', filmes);

    // 4. Feedback e redirecionamento
    alert('Filme atualizado com sucesso!');
    window.location.href = 'cadastro-filmes.html'; // Volta para a lista de filmes
}
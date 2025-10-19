// js/filmes.js (COM LISTAGEM, DELETE E EDITAR)

// Roda quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    listarFilmes();

    // Adiciona o listener para o formulário
    document.getElementById('form-filme').addEventListener('submit', salvarFilme);

    // Adiciona listener para a lista (para os botões de apagar)
    document.getElementById('lista-filmes').addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-delete-filme')) {
            const filmeId = event.target.getAttribute('data-id');
            apagarFilme(filmeId);
        }
    });
});

function salvarFilme(e) {
    e.preventDefault();

    // 1. Coletar dados do formulário
    const filme = {
        id: Date.now(),
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        urlImagem: document.getElementById('urlImagem').value,
        genero: document.getElementById('genero').value,
        classificacao: document.getElementById('classificacao').value,
        duracao: parseInt(document.getElementById('duracao').value),
        dataEstreia: document.getElementById('dataEstreia').value
    };

    // 2. Salvar no localStorage
    const filmes = getData('filmes');
    filmes.push(filme);
    saveData('filmes', filmes);

    // 3. Feedback e Limpar
    alert('Filme salvo com sucesso!');
    e.target.reset();

    // 4. ATUALIZAR A LISTA NA TELA
    listarFilmes();
}

// --- FUNÇÃO ATUALIZADA: Listar Filmes ---
function listarFilmes() {
    const filmes = getData('filmes');
    const containerLista = document.getElementById('lista-filmes');
    containerLista.innerHTML = ''; // Limpa a lista atual

    if (filmes.length === 0) {
        containerLista.innerHTML = '<li class="list-group-item">Nenhum filme cadastrado.</li>';
        return;
    }

    filmes.forEach(filme => {
        const item = document.createElement('li');
        item.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        // --- MUDANÇA AQUI: Adicionado botão "Editar" ---
        item.innerHTML = `
            <div>
                <strong>${filme.titulo}</strong> (${filme.genero})
                <br>
                <small class="text-muted">Duração: ${filme.duracao} min | Estreia: ${new Date(filme.dataEstreia).toLocaleDateString()}</small>
            </div>
            <div>
                <a href="editar-filme.html?id=${filme.id}" class="btn btn-warning btn-sm">
                    Editar
                </a>
                <button class="btn btn-danger btn-sm btn-delete-filme" data-id="${filme.id}">
                    Apagar
                </button>
            </div>
        `;
        containerLista.appendChild(item);
    });
}

// --- Função Apagar Filme ---
function apagarFilme(id) {
    // TRAVA DE SEGURANÇA
    const sessoes = getData('sessoes');
    const filmeEmUso = sessoes.some(sessao => sessao.filmeId == id);

    if (filmeEmUso) {
        alert('Erro: Este filme não pode ser apagado, pois está vinculado a uma ou mais sessões.\nPor favor, apague as sessões primeiro.');
        return;
    }

    if (confirm('Tem certeza que deseja apagar este filme?')) {
        const filmes = getData('filmes');
        const novosFilmes = filmes.filter(filme => filme.id != id);
        saveData('filmes', novosFilmes);
        
        alert('Filme apagado com sucesso!');
        listarFilmes(); // Atualiza a lista
    }
}
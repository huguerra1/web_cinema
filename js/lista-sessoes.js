// js/lista-sessoes.js (COM BOTÕES DE EDITAR E APAGAR)

document.addEventListener('DOMContentLoaded', function() {
    listarSessoes();
    adicionarEventListeners(); // Adiciona o "ouvidor" de cliques para apagar
});

function listarSessoes() {
    const sessoes = getData('sessoes');
    const filmes = getData('filmes');
    const salas = getData('salas');
    
    const container = document.getElementById('lista-sessoes');
    container.innerHTML = ''; 

    if (!sessoes || sessoes.length === 0) {
        container.innerHTML = '<p class="text-muted">Nenhuma sessão cadastrada.</p>';
        return;
    }

    sessoes.forEach(sessao => {
        // Usamos '==' para comparar, pois os IDs podem ser string/número
        const filme = filmes.find(f => f.id == sessao.filmeId);
        const sala = salas.find(s => s.id == sessao.salaId);

        if (!filme || !sala) {
            console.warn(`Sessão ${sessao.id} pulada por falta de filme ou sala.`);
            return; 
        }

        const dataHora = new Date(sessao.dataHora).toLocaleString('pt-BR', {
            dateStyle: 'short',
            timeStyle: 'short'
        });
        const preco = `R$ ${sessao.preco.toFixed(2).replace('.', ',')}`;

        const imageUrl = filme.urlImagem && filme.urlImagem.trim() !== '' 
                         ? filme.urlImagem 
                         : 'https://via.placeholder.com/200x300?text=Sem+Poster'; 

        // --- MUDANÇA AQUI: Adicionados botões de Editar e Apagar ---
        const cardHtml = `
            <div class="col-md-4 mb-3">
                <div class="card h-100">
                    <img src="${imageUrl}" class="card-img-top" alt="Poster do filme: ${filme.titulo}" style="height: 300px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${filme.titulo}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${sala.nome} (${sessao.formato} / ${sessao.idioma})</h6>
                        <p class="card-text">
                            <strong>Data:</strong> ${dataHora}<br>
                            <strong>Preço:</strong> ${preco}<br>
                            <strong>Gênero:</strong> ${filme.genero}
                        </p>
                        
                        <div class="mt-auto">
                            <a href="venda-ingressos.html?sessaoId=${sessao.id}" class="btn btn-primary btn-sm">
                                Comprar
                            </a>
                            <a href="editar-sessao.html?id=${sessao.id}" class="btn btn-warning btn-sm">
                                Editar
                            </a>
                            <button class="btn btn-danger btn-sm btn-delete-sessao" data-id="${sessao.id}">
                                Apagar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `; 
        
        container.innerHTML += cardHtml;
    });
}

// --- Função para "ouvir" os cliques nos botões apagar ---
function adicionarEventListeners() {
    const container = document.getElementById('lista-sessoes');
    
    container.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-delete-sessao')) {
            const sessaoId = event.target.getAttribute('data-id');
            apagarSessao(sessaoId);
        }
    });
}

// --- Função que apaga a sessão ---
function apagarSessao(id) {
    if (!confirm('Tem certeza que deseja apagar esta sessão?')) {
        return; 
    }
    const sessoes = getData('sessoes');
    // Filtra, removendo apenas a sessão com o ID correspondente
    const novasSessoes = sessoes.filter(sessao => sessao.id != id);
    saveData('sessoes', novasSessoes);
    alert('Sessão apagada com sucesso!');
    listarSessoes(); // Recarrega a lista
}
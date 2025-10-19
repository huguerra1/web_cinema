// js/vendas.js

document.addEventListener('DOMContentLoaded', function() {
    carregarSessoes();
    verificarParametroSessao();
});

function carregarSessoes() {
    const sessoes = getData('sessoes');
    const filmes = getData('filmes');
    const salas = getData('salas');

    const selectSessao = document.getElementById('sessao');

    sessoes.forEach(sessao => {
        // Encontra o filme e a sala correspondentes pelos IDs
        const filme = filmes.find(f => f.id === sessao.filmeId);
        const sala = salas.find(s => s.id === sessao.salaId);

        // Formata a data para exibição
        const dataHoraFormatada = new Date(sessao.dataHora).toLocaleString('pt-BR');

        // Cria o texto descritivo para a opção
        // Só adiciona se o filme e a sala forem encontrados
        if (filme && sala) {
            const option = document.createElement('option');
            option.value = sessao.id;
            option.textContent = `${filme.titulo} - ${sala.nome} - ${dataHoraFormatada}`;
            selectSessao.appendChild(option);
        }
    });
}

function verificarParametroSessao() {
    // Pega os parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    const sessaoId = urlParams.get('sessaoId');

    if (sessaoId) {
        // Seleciona automaticamente a sessão que veio da página anterior
        document.getElementById('sessao').value = sessaoId;
    }
}

// Lógica para salvar a venda
document.getElementById('form-venda').addEventListener('submit', function(e) {
    e.preventDefault();

    const sessaoId = document.getElementById('sessao').value;
    const nomeCliente = document.getElementById('nomeCliente').value;
    const cpf = document.getElementById('cpf').value;
    const assento = document.getElementById('assento').value;
    const pagamento = document.getElementById('pagamento').value;

    const ingresso = {
        id: Date.now(),
        sessaoId: parseInt(sessaoId),
        nomeCliente: nomeCliente,
        cpf: cpf,
        assento: assento,
        tipoPagamento: pagamento
    };

    const ingressos = getData('ingressos');
    ingressos.push(ingresso);
    saveData('ingressos', ingressos);

    alert('Venda confirmada com sucesso!');
    e.target.reset();
    // Opcional: Redirecionar para a home
    // window.location.href = 'index.html';
});
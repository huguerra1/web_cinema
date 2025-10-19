// js/storage.js

/**
 * Busca dados do localStorage.
 * @param {string} key A chave para buscar (ex: 'filmes')
 * @returns {Array} Um array de objetos ou um array vazio.
 */
function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

/**
 * Salva dados no localStorage.
 * @param {string} key A chave para salvar (ex: 'filmes')
 * @param {Array} data O array de objetos para salvar.
 */
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
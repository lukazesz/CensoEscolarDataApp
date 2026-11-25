const fs = require('fs');

const dados = JSON.parse(
    fs.readFileSync(
        './src/datasets/instituicoes_pb_2025.json',
        'utf-8'
    )
);

const instituicoes = Array.isArray(dados)
    ? dados
    : dados.data;

const db = {
    instituicoesensino: instituicoes.map((instituicao) => ({
        ...instituicao,
        id: String(instituicao.co_entidade)
    }))
};

fs.writeFileSync(
    'db.json',
    JSON.stringify(db, null, 2),
    { flag: 'wx' }
);

console.log('Banco de dados criado com sucesso!');
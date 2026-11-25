
import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

function InstituicaoEnsino() {

  // Estados das instituições, filtros e paginação
  const [instituicoes, setInstituicoes] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [municipioSelecionado, setMunicipioSelecionado] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);

  const itensPorPagina = 10;

  // Busca as instituições através da API
  useEffect(() => {
    async function carregarInstituicoes() {
      try {
        const response = await fetch(
          'http://localhost:5000/instituicoesensino'
        );

        if (!response.ok) {
          throw new Error('Erro ao carregar instituições.');
        }

        const dados = await response.json();

        setInstituicoes(dados);

      } catch (erro) {
        console.error(erro);
        window.alert('Não foi possível carregar as instituições.');
      }
    }

    carregarInstituicoes();
  }, []);

  // Remove uma instituição através da API
  const removerInstituicao = async (id) => {

    // Solicita confirmação antes da exclusão
    const confirmado = window.confirm(
      'Deseja realmente excluir esta instituição de ensino?'
    );

    if (!confirmado) {
      return;
    }

    try {
      // Envia a requisição DELETE para a API
      const response = await fetch(
        `http://localhost:5000/instituicoesensino/${id}`,
        {
          method: 'DELETE'
        }
      );

      // Verifica se a exclusão foi realizada com sucesso
      if (!response.ok) {
        throw new Error('Erro ao excluir instituição.');
      }

      // Remove a instituição da tabela somente após
      // a confirmação de sucesso da API
      setInstituicoes((instituicoesAnteriores) =>
        instituicoesAnteriores.filter(
          (instituicao) => instituicao.id !== id
        )
      );

    } catch (erro) {
      console.error(erro);
      window.alert('Não foi possível excluir a instituição.');
    }
  };

  // Obtém municípios sem repetições e em ordem alfabética
  const municipios = [...new Set(
    instituicoes
      .map((instituicao) => instituicao.no_municipio)
      .filter(Boolean)
  )].sort((a, b) => a.localeCompare(b, 'pt-BR'));

  // Aplica os filtros de pesquisa e município
  const instituicoesFiltradas = instituicoes.filter((instituicao) => {
    const nome = (instituicao.no_entidade || '').toLowerCase();
    const termo = pesquisa.trim().toLowerCase();

    const correspondeNome = nome.includes(termo);

    const correspondeMunicipio =
      municipioSelecionado === '' ||
      instituicao.no_municipio === municipioSelecionado;

    return correspondeNome && correspondeMunicipio;
  });

  // Ordena todas as instituições encontradas
  const instituicoesOrdenadas = [...instituicoesFiltradas].sort(
    (a, b) =>
      Number(b.qt_mat_bas || 0) - Number(a.qt_mat_bas || 0)
  );

  // Calcula a quantidade total de páginas
  const totalPaginas = Math.ceil(
    instituicoesOrdenadas.length / itensPorPagina
  );

  // Corrige a paginação caso uma página deixe de existir
  // após a exclusão de uma instituição
  useEffect(() => {
    if (paginaAtual > Math.max(1, totalPaginas)) {
      setPaginaAtual(Math.max(1, totalPaginas));
    }
  }, [paginaAtual, totalPaginas]);

  // Define o intervalo de instituições da página atual
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;

  // Seleciona somente as instituições da página atual
  const ranking = instituicoesOrdenadas.slice(
    indiceInicial,
    indiceFinal
  );

  const formatarNumero = (valor) =>
    Number(valor || 0).toLocaleString('pt-BR');

  // Volta para a primeira página ao alterar a pesquisa
  const handlePesquisa = (evento) => {
    setPesquisa(evento.target.value);
    setPaginaAtual(1);
  };

  // Volta para a primeira página ao alterar o município
  const handleMunicipio = (evento) => {
    setMunicipioSelecionado(evento.target.value);
    setPaginaAtual(1);
  };

  return (
    <main className="container py-5">

      <div className="text-center mb-5">
        <h1 className="fw-bold">Instituições de Ensino</h1>

        <p className="text-secondary">
          Consulte as instituições de ensino da Paraíba
          no Censo Escolar 2025.
        </p>
      </div>

      {/* Pesquisa e filtro por município */}
      <div className="row g-3 mb-4">

        <div className="col-12 col-md-7">
          <label
            htmlFor="pesquisa"
            className="form-label fw-semibold"
          >
            Pesquisar instituição
          </label>

          <input
            type="text"
            id="pesquisa"
            className="form-control"
            placeholder="Digite o nome da instituição..."
            value={pesquisa}
            onChange={handlePesquisa}
          />
        </div>

        <div className="col-12 col-md-5">
          <label
            htmlFor="municipio"
            className="form-label fw-semibold"
          >
            Filtrar por município
          </label>

          <select
            id="municipio"
            className="form-select"
            value={municipioSelecionado}
            onChange={handleMunicipio}
          >
            <option value="">Todos os municípios</option>

            {municipios.map((municipio) => (
              <option key={municipio} value={municipio}>
                {municipio}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Tabela de instituições */}
      <div className="card shadow-sm border-0">
        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <h5 className="fw-bold mb-0">
              Instituições de Ensino
            </h5>

            <span className="badge bg-secondary">
              {instituicoesFiltradas.length} resultado(s)
            </span>

          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle">

              <thead className="table-dark">
                <tr>
                  <th>Posição</th>
                  <th>Instituição</th>
                  <th>Município</th>
                  <th className="text-end">Matrículas</th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead>

              <tbody>
                {ranking.length > 0 ? (
                  ranking.map((instituicao, indice) => (

                    <tr key={instituicao.id}>

                      <td>
                        <span className="badge bg-primary">
                          {indiceInicial + indice + 1}º
                        </span>
                      </td>

                      <td className="fw-semibold">
                        {instituicao.no_entidade}
                      </td>

                      <td>
                        {instituicao.no_municipio}
                      </td>

                      <td className="text-end fw-bold">
                        {formatarNumero(instituicao.qt_mat_bas)}
                      </td>

                      {/* Botão de exclusão */}
                      <td className="text-center">
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          title="Excluir instituição"
                          aria-label={`Excluir ${instituicao.no_entidade}`}
                          onClick={() =>
                            removerInstituicao(instituicao.id)
                          }
                        >
                          <FaTrash />
                        </button>
                      </td>

                    </tr>

                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-4 text-secondary"
                    >
                      Nenhuma instituição encontrada.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

          {/* Controles de paginação */}
          {totalPaginas > 0 && (
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 mt-4">

              <p className="text-secondary mb-0">
                Página {paginaAtual} de {totalPaginas}
              </p>

              <div className="d-flex gap-2">

                <button
                  className="btn btn-outline-primary"
                  disabled={paginaAtual === 1}
                  onClick={() => setPaginaAtual(paginaAtual - 1)}
                >
                  Anterior
                </button>

                <button
                  className="btn btn-outline-primary"
                  disabled={paginaAtual >= totalPaginas}
                  onClick={() => setPaginaAtual(paginaAtual + 1)}
                >
                  Próxima
                </button>

              </div>

              <p className="text-secondary mb-0">
                Exibindo {indiceInicial + 1} até{' '}
                {Math.min(indiceFinal, instituicoesFiltradas.length)}
                {' '}de {instituicoesFiltradas.length}
              </p>

            </div>
          )}

        </div>
      </div>
    </main>
  );
}

export default InstituicaoEnsino;

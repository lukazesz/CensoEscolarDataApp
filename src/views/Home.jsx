import instituicoesData from '../datasets/instituicoes_pb_2025.json';

function Home() {

  // Garante que estamos trabalhando com um array
  const instituicoes = Array.isArray(instituicoesData)
    ? instituicoesData
    : instituicoesData.data || [];

  // Calcula o total de instituições
  const totalInstituicoes = instituicoes.length;

  // Calcula o total de matrículas da educação básica
  const totalMatriculas = instituicoes.reduce(
    (total, instituicao) => total + (Number(instituicao.qt_mat_bas) || 0),
    0
  );

  // Identifica os municípios sem repetições
  const totalMunicipios = new Set(
    instituicoes.map(instituicao => instituicao.co_municipio)
  ).size;

  // Calcula o total de matrículas do ensino fundamental
  const totalFundamental = instituicoes.reduce(
    (total, instituicao) => total + (Number(instituicao.qt_mat_fund) || 0),
    0
  );

  // Formata os números no padrão brasileiro
  const formatarNumero = (valor) => {
    return valor.toLocaleString('pt-BR');
  };

  return (
    <main>

      {/* Apresentação */}
      <section className="container py-5 text-center">
        <h1 className="display-4 fw-bold">
          Censo Escolar 2025
        </h1>

        <p className="lead text-secondary">
          Conheça os dados da educação básica do estado da Paraíba.
        </p>
      </section>

      {/* Carrossel */}
      <section className="container mb-5">

        <div
          id="carouselCenso"
          className="carousel slide"
          data-bs-ride="carousel"
        >

          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselCenso"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Imagem 1"
            ></button>

            <button
              type="button"
              data-bs-target="#carouselCenso"
              data-bs-slide-to="1"
              aria-label="Imagem 2"
            ></button>

            <button
              type="button"
              data-bs-target="#carouselCenso"
              data-bs-slide-to="2"
              aria-label="Imagem 3"
            ></button>
          </div>

          <div className="carousel-inner rounded-4">

            <div className="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200"
                className="d-block w-100 imagem-carrossel"
                alt="Sala de aula"
              />

              <div className="carousel-caption">
                <h3>Educação na Paraíba</h3>
                <p>Conhecendo a realidade da educação no estado.</p>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200"
                className="d-block w-100 imagem-carrossel"
                alt="Livros e materiais educacionais"
              />

              <div className="carousel-caption">
                <h3>Conhecimento e aprendizagem</h3>
                <p>Dados que ajudam a compreender a educação.</p>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200"
                className="d-block w-100 imagem-carrossel"
                alt="Estudantes em ambiente escolar"
              />

              <div className="carousel-caption">
                <h3>O futuro começa na educação</h3>
                <p>Informações sobre as instituições de ensino paraibanas.</p>
              </div>
            </div>

          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselCenso"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselCenso"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>

        </div>
      </section>

      {/* Cartões de informações */}
      <section className="container pb-5">

        <div className="text-center mb-4">
          <h2 className="fw-bold">A educação em números</h2>
          <p className="text-secondary">
            Indicadores calculados a partir do Censo Escolar 2025.
          </p>
        </div>

        <div className="row g-4">

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card card-estatistica h-100 text-center p-3">
              <div className="card-body">
                <h6 className="text-secondary">
                  Instituições de Ensino
                </h6>

                <h2 className="fw-bold text-primary">
                  {formatarNumero(totalInstituicoes)}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card card-estatistica h-100 text-center p-3">
              <div className="card-body">
                <h6 className="text-secondary">
                  Matrículas na Educação Básica
                </h6>

                <h2 className="fw-bold text-primary">
                  {formatarNumero(totalMatriculas)}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card card-estatistica h-100 text-center p-3">
              <div className="card-body">
                <h6 className="text-secondary">
                  Municípios
                </h6>

                <h2 className="fw-bold text-primary">
                  {formatarNumero(totalMunicipios)}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card card-estatistica h-100 text-center p-3">
              <div className="card-body">
                <h6 className="text-secondary">
                  Matrículas no Ensino Fundamental
                </h6>

                <h2 className="fw-bold text-primary">
                  {formatarNumero(totalFundamental)}
                </h2>
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}

export default Home;

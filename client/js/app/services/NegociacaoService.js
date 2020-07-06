class NegociacaoService {

  constructor() {
    this._http = new HttpService();
  }

  obterNegociacoesDaSemana() {

    return this._http.get('negociacoes/semana')
      .then(negociacoes => negociacoes.map(
        objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
      )).catch(erro => {
        console.log(erro);
        throw new Error('Erro, não foi possível obter as negociações da semana do servidor.');
      });
  }

  obterNegociacoesDaSemanaAnterior() {

    return this._http.get('negociacoes/anterior')
      .then(negociacoes => negociacoes.map(
        objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
      )).catch(erro => {
        console.log(erro);
        throw new Error('Erro, não foi possível obter as negociações da semana anterior do servidor.');
      });
  }

  obterNegociacoesDaSemanaRetrasada() {

    return this._http.get('negociacoes/retrasada')
      .then(negociacoes => negociacoes.map(
        objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
      )).catch(erro => {
        console.log(erro);
        throw new Error('Erro, não foi possível obter as negociações da semana retrasada do servidor.');
      });
  }

  obterNegociacoes() {
    return Promise.all([
      this.obterNegociacoesDaSemana(),
      this.obterNegociacoesDaSemanaAnterior(),
      this.obterNegociacoesDaSemanaRetrasada()
    ]).then(semanas =>
      semanas.reduce((periodoTotal, semana) => periodoTotal.concat(semana), [])
    ).catch(erro => {
      throw new Error(erro)
    });
  }
  
}
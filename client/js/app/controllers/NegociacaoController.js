class NegociacaoController {

  constructor() {

    let $ = document.querySelector.bind(document);

    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($('#negociacoes-view')),
      'adiciona',
      'esvazia'
    )

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView($('#mensagem-view')),
      'texto'
    )

  }

  adiciona(event) {

    event.preventDefault();
    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._mensagem.texto = 'Negociação adicionada';
    this._limpaFormulario();

  }

  importaNegociacoes() {

    let service = new NegociacaoService();

    //adicionamos as 2 novas chamadas, mas ao executar elas ocorrem fora de ordem
    //pq elas são assíncronas, então vamos botar uma dentro da outra
    /*
    service.obterNegociacoesDaSemana((erro, negociaoes) => {
      if(erro){
        this._mensagem.texto = erro;
        return;
      } 
      negociaoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
      this._mensagem.texto = 'Negociações importadas com sucesso.'
    })
    
    service.obterNegociacoesDaSemanaAnterior((erro, negociaoes) => {
      if(erro){
        this._mensagem.texto = erro;
        return;
      } 
      negociaoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
      this._mensagem.texto = 'Negociações importadas com sucesso.'
    })

    service.obterNegociacoesDaSemanaRetrasada((erro, negociaoes) => {
      if(erro){
        this._mensagem.texto = erro;
        return;
      } 
      negociaoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
      this._mensagem.texto = 'Negociações importadas com sucesso.'
    })*/

    //colocamos uma dentro da outra, mas esse código é uma piramide e ruim de ler
    //chamamos essa 'solução' Pyramid of Doom, e o problema das assíncronas de Callback Hell
    //e ainda temos o teste de erro repetido
    /*service.obterNegociacoesDaSemana((erro, negociaoes) => {
      if(erro){
        this._mensagem.texto = erro;
        return;
      }
      negociaoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
      service.obterNegociacoesDaSemanaAnterior((erro, negociaoes) => {
        if(erro){
          this._mensagem.texto = erro;
          return;
        } 
        negociaoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        service.obterNegociacoesDaSemanaRetrasada((erro, negociaoes) => {
          if(erro){
            this._mensagem.texto = erro;
            return;
          } 
          negociaoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
          this._mensagem.texto = 'Negociações importadas com sucesso.'
        })
      })
    })*/

    //vamos usar o método promise no NegociacaoService
    //mas caimos no mesmo problema de elas ficarem fora de ordem
    /*service.obterNegociacoesDaSemana()
      .then(negociacoes => {
        negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        this._mensagem.texto = 'Negociações da semana importadas com sucesso.';
      }).catch(erro => this._mensagem.texto = erro);

      service.obterNegociacoesDaSemanaAnterior()
      .then(negociacoes => {
        negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        this._mensagem.texto = 'Negociações da semana anterior importadas com sucesso.';
      }).catch(erro => this._mensagem.texto = erro);

      service.obterNegociacoesDaSemanaRetrasada()
      .then(negociacoes => {
        negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        this._mensagem.texto = 'Negociações da semana retrasada importadas com sucesso.';
      }).catch(erro => this._mensagem.texto = erro);
    */

    //o método Promise.all() permite resolver varias promises passadas em ordem em um array
    /*
    Promise.all([
      service.obterNegociacoesDaSemana(),
      service.obterNegociacoesDaSemanaAnterior(),
      service.obterNegociacoesDaSemanaRetrasada()
    ]).then(negociacoes => {
      //mas negociações retorna um array com 3 arrays de negociações
      console.log(negociacoes);

      //então vamos usar o reduce para achatar o array, e aí fazer o forEach 
      negociacoes
        .reduce((arrayAchatado, array) => arrayAchatado.concat(array),[])
        .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
      this._mensagem.texto = 'Negociações da semana retrasada importadas com sucesso.';
    }).catch(erro => this._mensagem.texto = erro);
    */

    //passamos o promisse all para o método obterNegociacoes
    //ele já retorna o array de negociações achatado
    service.obterNegociacoes()
      .then(negociacoes => {
        negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        this._mensagem.texto = 'Negociações da semana retrasada importadas com sucesso.';
      }).catch(erro => this._mensagem.texto = erro);

  }

  apaga() {
    this._listaNegociacoes.esvazia();
    this._mensagem.texto = 'Negociações apagadas'
  }

  _criaNegociacao() {
    return new Negociacao(
      DataHelper.textoParaData(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value,
    );
  }

  _limpaFormulario() {

    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;

    this._inputData.focus();
  }

}
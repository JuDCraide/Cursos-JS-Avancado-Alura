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
      'esvazia',
      'ordena',
      'inverte'
    )

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView($('#mensagem-view')),
      'texto'
    )

    this._ordemAtual = '';
  }

  adiciona(event) {

    event.preventDefault();
    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._mensagem.texto = 'Negociação adicionada';
    this._limpaFormulario();
  }

  importaNegociacoes() {

    let service = new NegociacaoService();

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


  ordena(coluna){
    if(coluna === this._ordemAtual){ 
      this._listaNegociacoes.inverte();
    } else {
      this._listaNegociacoes.ordena((a,b) => a[coluna]-b[coluna]);
    }
    
    this._ordemAtual=coluna;
  }
}
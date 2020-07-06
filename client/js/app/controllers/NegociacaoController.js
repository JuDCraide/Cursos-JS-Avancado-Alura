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
      //adicionamos o ordena eo inverte na lista de métodos q atualizam a view
      'ordena',
      'inverte'
    )

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView($('#mensagem-view')),
      'texto'
    )

    //armazena como tabela está sendo ordenada
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

  //vamos criar um método para ordenar pela coluna
  //ele vai ser chamado pelas colunas do negociacoesView
  ordena(coluna){
    //como apenas recebemos uma cópia da lista temos que criar um método ordena no model
    //e passamos uma função que ordena crescentemente EX: a=5 e b=2, a-b=3 -> positivo -> [b,a]
    //this._listaNegociacoes.ordena((a,b) => a[coluna]-b[coluna]);

    //mas queremos que quando clicamos a segunda vez na coluna
    //sua oredenação seja invertida(crescente ou decrescente)
    if(coluna === this._ordemAtual){
      //se a nova ordem for igual a ordemAtual invertemos a coluna
      this._listaNegociacoes.inverte();
    } else {
      this._listaNegociacoes.ordena((a,b) => a[coluna]-b[coluna]);
    }
    //por fim atualizamos _ordemAtual
    this._ordemAtual=coluna;
  }
}
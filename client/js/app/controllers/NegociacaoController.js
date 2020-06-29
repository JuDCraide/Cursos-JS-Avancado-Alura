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

  //iniciamos a API e nosso objetivo é quando o botão importar negociações for clicado
  //vamos chamar a função que vai retornar as negociações usando requisições AJAX
  importaNegociacoes() {
    //alert('Importando...');

    /*
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'negociacoes/semana');
    //endereço errado para testar erro
    //xhr.open('GET', 'negociacoes/semana2');

    //precisamos fazer configurações antes de enviar
    xhr.onreadystatechange = () => {
      /*
      Estados de uma requisição AJAX:
      0: requisição ainda não iniciada
      1: conexão com o servidor estabelecida
      2: requisição recebida
      3: processando requisição
      4: requisição está concluída e a resposta está pronta
      * /
      //testa se está no último estado ou seja a resposta está pronta
      if (xhr.readyState === 4) {
        //mas pode ter ocorrido erro então testamos se o status é 200(OK)
        if (xhr.status === 200) {
          console.log('Requisição OK, obtendo as negociações do servidor.');
          //xhr.responseText mostra a resposta da requisição
          //usamos JSON.parse para converter de texto para objeto JavaScript
          console.log(JSON.parse(xhr.responseText));

          JSON.parse(xhr.responseText)
            .map(
              //transforma cada objeto retornado pela requisição em uma negociação
              objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
            ).forEach(
              //adiciona as novas negociações na lista
              negociacao => this._listaNegociacoes.adiciona(negociacao)
            )
          
          this._mensagem.texto = 'Negociações importadas com sucesso.'

        } else {
          console.log('Erro, não foi possível obter as negociações do servidor.');
          //e xhr.responseText também recebe respostas de erro
          console.log(xhr.responseText);
          this._mensagem.texto='Erro, não foi possível obter as negociações do servidor.'
        }
      }
    };

    xhr.send();
    */

    //a responsabilidade de buscar dados no servidor não deve ser do controller
    //por isso crimos 1 service para resolver isso e só vamos tratar os resultados
    let service = new NegociacaoService();

    //chamamos negociacoe passando uma função callback
    //tem que ser arrow function por causa do this léxico
    service.obterNegociacoesDaSemana((erro, negociaoes) => {
      //usamos uma convenção chamada error first
      //pega um erro no 1º parametro e o resultado no 2º
      //e a primeira coisa q fazemos é testar se deu o erro
      if(erro){
        this._mensagem.texto = erro;
        return;
      } 

      //adiciona negociações na lista e mostra mensagem de sucesso
      negociaoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
      this._mensagem.texto = 'Negociações importadas com sucesso.'
    })
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
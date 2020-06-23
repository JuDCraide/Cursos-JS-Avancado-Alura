class NegociacaoController {

    constructor() {
        
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        
        //fizemos a armadilha que será chamada após adiciona ou esvazia
        //podemos passar o negociacoesView mesmo criando ele depois
        //só com a função não funciona porque o this é dinâmico e varia com contxto
        /*this._listaNegociacoes = new ListaNegociacoes(function(model) {
            this._negociacoesView.update(model);
        });*/
        
        //por isso precisamos passar a propriedade this para o construtor
        //Assim ele vai guardar o contexto da classe NegociacaoController
        /*this._listaNegociacoes = new ListaNegociacoes(this, function(model) {
            this._negociacoesView.update(model);
        });*/
        
        //mas existe outra solução, só trocar para arrow function funciona
        //isso ocorre pois arrow functions tem this léxico
        //ao invés de dinâmico como o das funções normais
        //ou seja o this não muda de acordo com o contexto
        this._listaNegociacoes = new ListaNegociacoes((model) => {
            this._negociacoesView.update(model);
        });
        this._negociacoesView =  new NegociacoesView($('#negociacoes-view'));
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagem-view'));
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {

        event.preventDefault();
    
        this._listaNegociacoes.adiciona(this._criaNegociacao())
        
        this._mensagem.texto = 'Negociação adicionada';
        this._mensagemView.update(this._mensagem);

        this._limpaFormulario();

        //como vamos fazer a armadilha não vamos precisar mais chamar a função
        //this._negociacoesView.update(this._listaNegociacoes);
    }

    apaga() {
        this._listaNegociacoes.esvazia();
        //this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem.texto = 'Negociações apagadas'
        this._mensagemView.update(this._mensagem);
    }

    _criaNegociacao() {
        return new Negociacao(
            DataHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value,
        );
    }

    _limpaFormulario() {

        this._inputData.value='';
        this._inputQuantidade.value=1;
        this._inputValor.value=0.0;

        this._inputData.focus();
    }

}
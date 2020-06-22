class NegociacaoController {

    constructor() {
        
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociacoes = new ListaNegociacoes();
        
        this._negociacoesView =  new NegociacoesView($('#negociacoes-view'));
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagem-view'));
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {

        event.preventDefault();
    
        this._listaNegociacoes.adiciona(this._criaNegociacao())
        
        //adiciona mensegem sucesso
        this._mensagem.texto = 'Negociação adicionada';
        this._mensagemView.update(this._mensagem);

        this._limpaFormulario();

        this._negociacoesView.update(this._listaNegociacoes);
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
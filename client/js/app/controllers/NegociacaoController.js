class NegociacaoController {

    constructor() {
        
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociacoes = new ListaNegociacoes();
        
        //dizemos que a tabela deve ser criada dentro da div com o id negociacoes-view
        this._negociacoesView =  new NegociacoesView($('#negociacoes-view'));
        //atualizamos a tabela para ela iniciar mesmo sem nenhum item
        //passamos para update o modelo da lista 
        this._negociacoesView.update(this._listaNegociacoes);
    }

    adiciona(event) {

        event.preventDefault();
        
        this._listaNegociacoes.adiciona(this._criaNegociacao())

        this._limpaFormulario()

        //console.log(this._listaNegociacoes.negociacoes);

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
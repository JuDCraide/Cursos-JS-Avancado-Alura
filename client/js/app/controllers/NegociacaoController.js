class NegociacaoController {

    constructor() {
        
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociacoes = new ListaNegociacoes();
    }

    adiciona(event) {

        event.preventDefault();
        
        /*
        //passamos a responsobilidade de fazer as conversões de tipo de data para um helper
        //ao delclarar os métodos como static não precisamos mais da instância
        //let helper = new DateHelper()
        let negociacao = new Negociacao(
            //helper.textoParaData(this._inputData.value),
            DataHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value,
        );

        //console.log(negociacao);
        */

        
        //imprime data no formato feito pelo DataHelper
        //console.log(DataHelper.dataParaTexto(negociacao.data));

        //adicionamos a negociação a lista
        this._listaNegociacoes.adiciona(this._criaNegociacao())

        this._limpaFormulario()

        //podemos quebrar com a lista de negociacoes
        //zeramos ela ao por o tamanho em 0 e podemos incluir usando push
        //para barrar isso fizemos o get negociacões retornar uma cópia
        /*this._listaNegociacoes.negociacoes.length = 0;
        this._listaNegociacoes.negociacoes.push(new Date(),5,1.2);*/
        
        console.log(this._listaNegociacoes.negociacoes);
    }

    //substituimos o código de criacção de negociação por uma função
    _criaNegociacao() {
        return new Negociacao(
            DataHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value,
        );
    }

    //criamos função de limpar para melhorar experiencia do usuário
    _limpaFormulario() {

        this._inputData.value='';
        this._inputQuantidade.value=1;
        this._inputValor.value=0.0;

        this._inputData.focus();
    }

}
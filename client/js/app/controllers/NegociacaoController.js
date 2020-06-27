class NegociacaoController {

    constructor() {
        
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        
        //por armadilhas no modelo não é uma boa prática
        //por isso vamos usar Proxy
        /*this._listaNegociacoes = new ListaNegociacoes((model) => {
            this._negociacoesView.update(model);
        });*/
        
        //macete para guardar this do controller em self
        //e poder chamar dentro da função    
        let self = this;

        //agora implementamos o que testamos no index.js no controller
        this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
            
            get(target, prop, receiver) {
               
                if(['adiciona','esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)){                   
                    return function() {
                        console.log(`interceptando ${prop}`);                        

                        Reflect.apply(target[prop], target, arguments);

                        //chamamos a função update usando o self ao invés de this
                        //e passamos o target pq ele é o modelo
                        self._negociacoesView.update(target);
                    }
                }

                return Reflect.get(target, prop, receiver)
                
            }   
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

    }

    apaga() {
        this._listaNegociacoes.esvazia();


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
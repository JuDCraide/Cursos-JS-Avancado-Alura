class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        //não precisaremos mais do self
        //let self = this;
        /*this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
            get(target, prop, receiver) {
                if(['adiciona','esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)){                   
                    return function() {
                        console.log(`interceptando ${prop}`);                        

                        Reflect.apply(target[prop], target, arguments);
                        self._negociacoesView.update(target);
                    }
                }
                return Reflect.get(target, prop, receiver)
            }   
        });*/

        //chamamos o criador de Proxy ao invés de criar um Proxy
        /*this._listaNegociacoes = ProxyFactory.create(
            new ListaNegociacoes(),
            ['adiciona', 'esvazia'],
            (model) => this._negociacoesView.update(model)
        );*/

        //mas mesmo com a Proxy ainda precisamos chamar update na criação
        //por isso vamos criar a classe Bind, e trocar a criação com proxy por ela
        //também percebemos que não precisamos criar _negociacoesView
        //pq ela não é usada em nenhum lugar a não ser no Bind
        //this._negociacoesView = new NegociacoesView($('#negociacoes-view'));
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            //this._negociacoesView,
            new NegociacoesView($('#negociacoes-view')),
            //a última mudança que vamos fazer é ao invés de passar um array
            //vamos passar direto as strings com os nomes das props
            //['adiciona', 'esvazia'],
            'adiciona',
            'esvazia'
        )
        //this._negociacoesView.update(this._listaNegociacoes);


        //this._mensagem = new Mensagem();
        //chamamos o criador de Proxy para mensagem também
        /*this._mensagem = ProxyFactory.create(
            new Mensagem(),
            ['texto'],
            (model) => this._mensagemView.update(model)
        );*/
        //mas mesmo com a Proxy ainda precisamos chamar update na criação
        //por isso vamos criar a classe Bind, e trocar a criação com proxy por ela
        //também percebemos que não precisamos criar _mensagemView
        //pq ela não é usada em nenhum lugar a não ser no Bind
        //this._mensagemView = new MensagemView($('#mensagem-view'));
        this._mensagem = new Bind(
            new Mensagem(),
            //this._mensagemView,
            new MensagemView($('#mensagem-view')),
            //a última mudança que vamos fazer é ao invés de passar um array
            //vamos passar direto as strings com os nomes das props
            //['texto'],
            'texto'
        )
        //this._mensagemView.update(this._mensagem);

    }

    adiciona(event) {

        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao()); 

        this._mensagem.texto = 'Negociação adicionada';
        //this._mensagemView.update(this._mensagem);

        this._limpaFormulario();

    }

    apaga() {
        this._listaNegociacoes.esvazia();


        this._mensagem.texto = 'Negociações apagadas'
        //this._mensagemView.update(this._mensagem);
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
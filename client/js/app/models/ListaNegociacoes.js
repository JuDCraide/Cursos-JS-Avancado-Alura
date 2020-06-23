class ListaNegociacoes {

    constructor(contexto, armadilha){
        this._negociacoes = [];
        
        //criamos uma armadilha para não ter que lembrar toda a vez de dar update na view
        this._armadilha = armadilha;
        
        //passamos o contexto onde devemos executar a função de armadilha
        //this._contexto = contexto;
        //mas vamos fazer de outro jeito sem contexto
    }

    adiciona(negociacao){
        this._negociacoes.push(negociacao);
        //chamamos a armadilha usando this que é o próprio modelo
        //this._armadilha(this);
        
        //ao invés de chamar só a função temos que usar API de relfexão
        //para fazer a armadilha rodar no contexto certo
        //a função applay recebe, o método, o contexto p executar e um array com parâmetros para corrigir o this
        //Reflect.apply(this._armadilha, this._contexto, [this]);

        //mas existe outra forma de fazer sem usam API  de relfexão
        //por isso voltamos para o mesma forma de chamar a armadilha
        this._armadilha(this);
    }

    get negociacoes() {
        
        return [].concat(this._negociacoes);
    }
  
    esvazia() {
        this._negociacoes = [];
        //this._armadilha(this);
        //Reflect.apply(this._armadilha, this._contexto, [this]);

        this._armadilha(this);
    }

}
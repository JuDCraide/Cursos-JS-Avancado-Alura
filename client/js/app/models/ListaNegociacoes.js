class ListaNegociacoes {

    constructor(armadilha){
        this._negociacoes = [];
        
        //esse código de armadilha faz parte da infraestrutura
        //não deveria estar no modelo, pq pode impedir ele de ser reusado
        //this._armadilha = armadilha;
    }

    adiciona(negociacao){

        this._negociacoes.push(negociacao);

        //é possível forçar um set para poder usar o Proxy
        //mas isso causa problemas de performace então voltamos atrás
        //this._negociacoes = [].concat(this._negociacoes, negociacao);        

        //this._armadilha(this);
    }

    get negociacoes() {
        
        return [].concat(this._negociacoes);
    }
  
    esvazia() {
        this._negociacoes = [];
    
        //this._armadilha(this);
    }

}
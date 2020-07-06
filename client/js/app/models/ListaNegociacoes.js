class ListaNegociacoes {

    constructor(armadilha) {
        this._negociacoes = [];
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }

    esvazia() {
        this._negociacoes = [];
    }

    get volumeTotal() {
        return this._negociacoes.reduce(
            (total, n) => total + n.volume, 0.0
        )
    }

    //criamos um método ordena que será chamado pelo controle
    //ele recebe uma função que serve de critério para ordenação
    ordena(critério) {
        this._negociacoes.sort(critério);
    }

    //criamos uma função para inverter a lista
    inverte() {
        this._negociacoes.reverse();
    }
}
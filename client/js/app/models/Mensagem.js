class Mensagem {

    //criamos o construtor dessa forma para que ao instanciar o objeto mensagem
    //possa ser passado um texto inicial ou não
    //caso não seja passado texto inicia em ''
    constructor(texto='') {
        this._texto = texto;
    }

    get texto() {
        return this._texto;
    }

    //criamos um set para que a string possa ser acessada desse jeito
    //let mensagem = new Mensagem(); mensagem.texto = 'x'
    set texto(texto) {
        this._texto = texto;
    }
}


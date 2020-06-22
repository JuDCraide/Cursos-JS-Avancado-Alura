class View {

    constructor(elemento) {
        this._elemento = elemento
    }

    //para garantir que não vamos criar uma classe que herder de View e não tenha o método template
    //criamos o método na classe View, que retorna um erro, pq não existem classes abstratas em JS 
    //para que o desenvolvedor saiba que tem sobreescrever esse método na classe filha
    template() {
        throw Error('O método template deve ser implementado');
    }

    update(model) {
        this._elemento.innerHTML = this.template(model);
    }
    
}
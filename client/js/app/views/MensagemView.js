//percebemos que as classes MensagemView e NegociacoesView tinham muito em comum
//portando criamos a classe View, e fazemos as outras duas herdarem suas características

class MensagemView extends View{

    /*constructor(elemento) {
        this._elemento = elemento
    }*/

    //precisamos q o construtor chame super passando a entrada para a super class
    constructor(elemento) {
        super(elemento);
    }

    //também resolvemos tirar o _ de _template porque como as classes filhas tem acesso
    // ao template da classe View ele não é mais privado
    template(model) {
        //para não aparecer a cor de fundo se não tiver mensagem usamos operador ternário
        return model.texto ? `
            <p class='alert alert-info'>${model.texto}</p>
        ` : `<p></p>`;
    }

   /* update(model) {
        this._elemento.innerHTML = this._template(model);
    }*/
}
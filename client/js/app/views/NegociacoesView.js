
class NegociacoesView extends View {

    /*constructor(elemento) {
        this._elemento = elemento;
    }*/

    constructor(elemento) {
        super(elemento);
    }

    //também resolvemos tirar o _ de _template porque como as classes filhas tem acesso
    // ao template da classe View ele não é mais privado
    template(model) {
        return `
            <table class="table table-hover table-bordered" >
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>

                <tbody>${    
                    model.negociacoes.map(n => `
                        <tr>
                            <td>${DataHelper.dataParaTexto(n.data)}</td>
                            <td>${n.quantidade}</td>
                            <td>${n.valor}</td>
                            <td>${n.volume}</td>
                        </tr>
                    `).join('')
                }</tbody>

                <tfoot>
                    <td colspan='3'></td>
                    <td>${
                        model.negociacoes.reduce(
                            (total, n) => total + n.volume, 0.0 
                        )
                    }</td>
                </tfoot>
            </table >
        `;
    }
   /* update(model) {
        this._elemento.innerHTML = this._template(model);
    }*/

}


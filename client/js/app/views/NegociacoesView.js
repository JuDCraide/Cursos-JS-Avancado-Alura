
class NegociacoesView extends View {

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
                        //essa solução de chamar reduce não está legal, pq ela é procedural
                        //portanto vamos criar um método no model para pegar total
                        /*model.negociacoes.reduce(
                            (total, n) => total + n.volume, 0.0 
                        )*/
                        model.volumeTotal()
                    }</td>
                </tfoot>
            </table >
        `;
    }
  
}


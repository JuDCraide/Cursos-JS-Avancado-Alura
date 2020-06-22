
class NegociacoesView {

    //construtor recebe o elemento em que a tabela deve ser criada
    constructor(elemento) {
        this._elemento = elemento;
    }

    //retornamos o html em template string para poder deixar identado
    _template(model) {
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

                <tbody>
                    ${
                        //percorremos a lista e retornamos um array em que cada item é uma template string
                        //e cada item n cria uma linha na tabela com seus dados
                        //para retornar uma string e não um array fazemos join apos o map
                        model.negociacoes.map(n => `
                            <tr>
                                <td>${DataHelper.dataParaTexto(n.data)}</td>
                                <td>${n.quantidade}</td>
                                <td>${n.valor}</td>
                                <td>${n.volume}</td>
                            </tr>
                        `).join('')
                    }
                </tbody>

                <tfoot>
                    <td colspan='3'></td>
                    <td>${
                        //só podemos retornar um valor na expressão do tamplate string
                        //por isso retornamos uma Immediately-invoked function expression(IIFE)
                        //mas esse código não está bonito então vamos usar o paradigma funcional
                        /*(function(){
                            let total = 0;
                            model.negociacoes.forEach(n => total+=n.volume);
                            return total;
                        })()*/
                        
                        //fazendo de maneira funcional usando reduce

                        model.negociacoes.reduce(
                            //o 1º parametro de reduce é a função
                            //o 2º parametro do reduce é a inicialização de total, 1ª variável da função
                            (total, n) => total + n.volume, 0.0 
                        )
                    }</td>
                </tfoot>
            </table >
        `;
    }
    update(model) {
        //insere a tabela dentro do elemento recebido no construtor
        this._elemento.innerHTML = this._template(model);

    }

}


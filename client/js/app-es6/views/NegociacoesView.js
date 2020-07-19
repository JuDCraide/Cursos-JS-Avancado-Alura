import {View} from './View';
import {DataHelper} from '../helpers/DateHelper';
//temos um problema com a forma atual, pois não conseguimos acessar o negociacaoController para ordenar colunas
//então vamos alterar o NegociacaoController para exportar uma instância
//importamos a função currentInstance que contém instância
import {currentInstance} from '../controllers/NegociacaoController'
export class NegociacoesView extends View {

    constructor(elemento){
        super(elemento);
        //vamos trabalhar com delegação de eventos e podemos tirar o onclick das ths
        //vamos usar event bubbling, em que é o evento, nesse caso click, sobe dos filhos até os pais
        //então nesse caso o elemento(div com id=negociacoes-view) receberá o evento de click da ths
        elemento.addEventListener('click', function(event) {
            //ele testa se foi o que foi clicado era uma th
            if(event.target.nodeName == 'TH'){
                //e chama a função ordena passando o texto com o nome da coluna minúsculo
                currentInstance().ordena(event.target.textContent.toLowerCase());
            }
        })
    }
    
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
                    <td>${model.volumeTotal}</td>
                </tfoot>
            </table >
        `;
    } 

}
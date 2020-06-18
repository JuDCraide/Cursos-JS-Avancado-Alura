class NegociacaoController {

    constructor() {
        //não funciona só passar document.querySelector p variável
        //usamos o bind para manter a associação entre o query select e o document
        let $ = document.querySelector.bind(document);

        //para melhorar performace ao invés de deixar os inputs no adiciona
        //colocamos elas no constructor e guardamos em propriedades
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

    }

    adiciona(event) {

        event.preventDefault();

        /*
        console.log(this._inputData.value);
        console.log(this._inputQuantidade.value);
        console.log(this._inputValor.value);
        */

        //identificamos que a data era uma string e não do tipo Data
        //aí não podiamos inserir na negociação
        //console.log(typeof (this._inputData.value), this._inputData.value); //string 2020-06-19

        //não funcionou ainda, pegou dia errado só com this._inputData.value
        //colocamos então o this._inputData.value.split('-'); ou this._inputData.value.replace(/-/g,',')
        //aí funciona pq a api de datas aceita datas separada por vírgula, 2020,06,19
        //para treinar um pouco mais vamo inicializar a Data no formato [2020, 05 ,19], diminuímos o mês pq ele vai de 0-11
        //construtor string '2020,06,19' construtor array [2020,05,09]
        /*let data = new Date([
            ...this._inputData.value
                .split('-')
                .map((item, indice) => item - indice % 2) //só diminuí o valor só no mês q te indice 1
        ]);*/

        let data = new Date(this._inputData.value.split('-'));
        //console.log(data);

        let negociacao = new Negociacao(
            data, //this._inputData.value,
            this._inputQuantidade.value,
            this._inputValor.value,
        );

        console.log(negociacao);

    }

}
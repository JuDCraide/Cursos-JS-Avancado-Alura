class Negociacao {
    
    /*
        //Javascript não permite 2 construtores
        constructor(){
            this.data = new Date();
            this.quantidade = 1;
            this.valor = 0.0;
        }
    */

    constructor(data, quantidade, valor){
        //Javascript não tem modificadores de acesso
        //Convenção é usar undeline na frente do nome de variáveis que não podem ser alteradas
        /*
            //dessa forma data podia ser alterada caso o construtor fosse chamado com uma variável no parâmetro data
            this._data = data;
        */
       //para impedir isso de acontecer criamos uma cópia da data recebida como entrada
        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;
        
        //Congela o objeto para que não possa ser alterado depois
        //Mas o freeze é raso/shallow não conjela propriedades dos objetos
        //Ex: como data é um objeto ainda podemos alterá-la usando setData()
        Object.freeze(this);
    }

    /*
        //como mudamos o nome das variáveis com _ precisamos criar métodos get para obter o valor
        getVolume(){
            return this._quantidade * this._valor;
        }
        getData(){
            return this._data
        }
        getQuantidade(){
            return this._quantidade
        }
        getValor(){
            return this._valor
        }
    */

    //para ficar menos verboso usamos o get com o nome 
    //com isso podemos fazer 'n1.volume' para obter o volume fora da função
    //mas fazer 'n1.valor=15' não muda o valor da variável
    //isso ainda não impede de fazer n1._data
    //para isso usamos o freeze
    get data(){
        /*
            //dessa forma era possível modificar a data mesmo com o freeze ao fazer n1.date.setDate(28)
            //pq como o freeze é raso precisamos garantir que data não será mutável => usando programação defensiva
            return this._data
        */
            //portanto ao invés de retornar data retornaremos uma cópia dela, assim ao tentar alterar só altera a cópia
            //a função getTime retorna um long com a representação da data
            //esse long é usado pelo construtor de Date para criar a nossa cópia de data
        
        return new Date(this._data.getTime());
    }
    get quantidade(){
        return this._quantidade
    }
    get valor(){
        return this._valor
    }
    get volume(){
        return this._quantidade * this._valor;
    }
}
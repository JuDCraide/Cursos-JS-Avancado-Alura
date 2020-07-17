class NegociacaoController {

	constructor() {

		let $ = document.querySelector.bind(document);

		this._inputData = $('#data');
		this._inputQuantidade = $('#quantidade');
		this._inputValor = $('#valor');

		this._listaNegociacoes = new Bind(
			new ListaNegociacoes(),
			new NegociacoesView($('#negociacoes-view')),
			'adiciona',
			'esvazia',
			'ordena',
			'inverte'
		)

		this._mensagem = new Bind(
			new Mensagem(),
			new MensagemView($('#mensagem-view')),
			'texto'
		)

		this._ordemAtual = '';

		//para evitar ter que ficar criando um novo service em cada função
		this._service = new NegociacaoService();

		//mas não é boa prática ter no constructor nada além dos atributos da classe
		//então vamos mover essas chamadas para o um método _init
		/*ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.listaTodos())
			.then(negociacoes => negociacoes.forEach(negociacao =>
				this._listaNegociacoes.adiciona(negociacao)
			)).catch(erro => this._mensagem.texto = erro);

		//chama o importaNegociacoes a cada 5 segundos
		setInterval(() => 
			this.importaNegociacoes()
		, 5000);*/

		//e por fim chamamos o _init no construtor
		this._init();
	}

	_init() {

		//também podemos abstrair esse código de listar negociações do banco
		//assim como fizemos com o adiciona
		/*ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.listaTodos())
			.then(negociacoes => negociacoes.forEach(negociacao =>
				this._listaNegociacoes.adiciona(negociacao)
			)).catch(erro => this._mensagem.texto = erro);*/

		//new NegociacaoService()
		this._service
			.lista()
			.then(negociacoes => negociacoes.forEach(negociacao =>
				this._listaNegociacoes.adiciona(negociacao)
			)).catch(erro => this._mensagem.texto = erro)

		setInterval(() =>
			this.importaNegociacoes()
			, 5000);
	}

	//para melhorar a legibilidade e manutenção vamos abstrair parte do código de adiciona no NegociacaoService
	adiciona(event) {

		event.preventDefault();
		/*ConnectionFactory.getConnection()
			.then(connection => {
				let negociacao = this._criaNegociacao();
				new NegociacaoDao(connection).adiciona(negociacao)
					.then(() => {
						this._listaNegociacoes.adiciona(negociacao);
						this._mensagem.texto = 'Negociação adicionada';
						this._limpaFormulario();
					});
			}).catch(erro => this._mensagem.texto = erro);*/

		let negociacao = this._criaNegociacao();

		//new NegociacaoService()
		this._service
			.cadastra(negociacao)
			.then(mensagem => {
				this._listaNegociacoes.adiciona(negociacao);
				this._mensagem.texto = mensagem;
				this._limpaFormulario();
			}).catch(erro => this._mensagem.texto = erro)
	}

	//agora que não importamos mais negociações duplicadas podemos melhorar a usabilidade do sistema
	//para isso vamos remover o botão importar negociações e importar de 5 em 5 segundos
	//faremos isso no constructor usando a função setInterval
	importaNegociacoes() {

		//vamos abstrari o importa negociações para o NegociacaoService
		//assim como adiciona, apaga e lista
		/*let service = new NegociacaoService();
		service.obterNegociacoes()
			.then(
				//vamos filtrar as negociações para não obter a mesma negociação 2 ou mais vezes
				negociacoes => negociacoes.filter(negociacao =>
					//tentamos usar o indexOf pesquisando qual o itemda negociação na _listaNegociacoes
					//e retornando true quando não for achado(resultar em -1)
					//mas não funcionou continuou permitindo adicionar a mesma negociação 2 vezes
					//this._listaNegociacoes.negociacoes.indexOf(negociacao) == -1

					//o indexOf não funciona, pois quando criamos um objeto usando o new ele cria uma variável que aponta para o objeto na memória
					//então como temos 2 variáveis apontando 2 objetos diferentes ao usar o == não vê se o conteúdo dos objetos é igual
					//ele só compara se as variáveis apontam para coisas diferentes e já dá falso
					//só os tipos literais(primitivos) como: string, boolean, e number, ele compara os valores ao invés de comparar onde a variável aponta
					//para resolver esse problema podemos usar o JSON.stringify() para transformar o objeto em string e aí comparar
					//tmb usamos o método some, que vê se um array possuí pelo menos um objeto com certa condição
					//temos que usar a negação, pois só queremos incluir negociações que não estão na lista
					!this._listaNegociacoes.negociacoes.some(negociacaoExistente =>
						JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)
					)
				)
			).then(negociacoes => {
				negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
				this._mensagem.texto = 'Negociações importadas com sucesso.';
			}).catch(erro => this._mensagem.texto = erro);*/

		this._service
			.importa(this._listaNegociacoes.negociacoes)
			.then(negociacoes => {
				negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
				this._mensagem.texto = 'Negociações importadas com sucesso.';
			}).catch(erro => this._mensagem.texto = erro);
	}

	//vamos abstrair, assim como adiciona e lista
	apaga() {
		/*ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.apagaTodos())
			.then(mensagem => {
				this._mensagem.texto = mensagem
				this._listaNegociacoes.esvazia();
			});*/

		//new NegociacaoService()
		this._service
			.apaga()
			.then(mensagem => {
				this._mensagem.texto = mensagem;
				this._listaNegociacoes.esvazia();
			}).catch(erro => this._mensagem.texto = erro)

	}

	_criaNegociacao() {
		return new Negociacao(
			DataHelper.textoParaData(this._inputData.value),
			parseInt(this._inputQuantidade.value),
			parseFloat(this._inputValor.value),
		);
	}

	_limpaFormulario() {
		this._inputData.value = '';
		this._inputQuantidade.value = 1;
		this._inputValor.value = 0.0;

		this._inputData.focus();
	}

	ordena(coluna) {
		if (coluna === this._ordemAtual) {
			this._listaNegociacoes.inverte();
		} else {
			this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
		}

		this._ordemAtual = coluna;
	}
}
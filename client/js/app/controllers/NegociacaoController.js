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

		//vamos adicionar na lista as negociações do banco
		//usamos arrow functions e then para reduzir o código e tornar ele mais legível
		ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.listaTodos())
			.then(negociacoes => negociacoes.forEach(negociacao =>
				this._listaNegociacoes.adiciona(negociacao)
			)).catch(erro => this._mensagem.texto = erro);

	}

	adiciona(event) {

		event.preventDefault();

		/*
		this._listaNegociacoes.adiciona(this._criaNegociacao());
		this._mensagem.texto = 'Negociação adicionada';
		this._limpaFormulario();
		*/

		//adicionamos a negociação no banco
		ConnectionFactory.getConnection()
			.then(connection => {
				let negociacao = this._criaNegociacao();
				new NegociacaoDao(connection).adiciona(negociacao)
					.then(() => {
						//a negociação só é adicionada na lista se for adicionada no banco com sucesso
						this._listaNegociacoes.adiciona(negociacao);
						this._mensagem.texto = 'Negociação adicionada';
						this._limpaFormulario();
					});
			}).catch(erro => this._mensagem.texto = erro);

	}

	importaNegociacoes() {

		let service = new NegociacaoService();

		service.obterNegociacoes()
			.then(negociacoes => {
				negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
				this._mensagem.texto = 'Negociações da semana retrasada importadas com sucesso.';
			}).catch(erro => this._mensagem.texto = erro);
	}

	apaga() {

		/*
		this._listaNegociacoes.esvazia();
		this._mensagem.texto = 'Negociações apagadas'
		*/
		ConnectionFactory.getConnection()
		.then(connection => new NegociacaoDao(connection))
		.then(dao => dao.apagaTodos())
		.then(mensagem => {
			this._mensagem.texto = mensagem
			this._listaNegociacoes.esvazia();
		});

	}

	_criaNegociacao() {
		return new Negociacao(
			DataHelper.textoParaData(this._inputData.value),
			//vamos garantir que o valor e a quantidade são float e inteiro
			//respectivamente antes de salvar no banco
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
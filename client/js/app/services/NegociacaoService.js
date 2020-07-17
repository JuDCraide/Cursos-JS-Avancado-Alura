class NegociacaoService {

	constructor() {
		this._http = new HttpService();
	}

	obterNegociacoesDaSemana() {

		return this._http.get('negociacoes/semana')
			.then(negociacoes => negociacoes.map(
				objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
			)).catch(erro => {
				console.log(erro);
				throw new Error('Erro, não foi possível obter as negociações da semana do servidor.');
			});
	}

	obterNegociacoesDaSemanaAnterior() {

		return this._http.get('negociacoes/anterior')
			.then(negociacoes => negociacoes.map(
				objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
			)).catch(erro => {
				console.log(erro);
				throw new Error('Erro, não foi possível obter as negociações da semana anterior do servidor.');
			});
	}

	obterNegociacoesDaSemanaRetrasada() {

		return this._http.get('negociacoes/retrasada')
			.then(negociacoes => negociacoes.map(
				objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
			)).catch(erro => {
				console.log(erro);
				throw new Error('Erro, não foi possível obter as negociações da semana retrasada do servidor.');
			});
	}

	obterNegociacoes() {
		return Promise.all([
			this.obterNegociacoesDaSemana(),
			this.obterNegociacoesDaSemanaAnterior(),
			this.obterNegociacoesDaSemanaRetrasada()
		]).then(semanas =>
			semanas.reduce((periodoTotal, semana) => periodoTotal.concat(semana), [])
		).catch(erro => {
			throw new Error(erro)
		});
	}

	//criamos o método para adicionar uma negociação no banco
	//e assim facilitar a manutenção do código
	cadastra(negociacao) {
		return ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.adiciona(negociacao))
			.then(() => 'Negociação incluida com sucesso')
			.catch(erro => {
				console.log(erro);
				throw new Error(erro);
			});
	}

	//criamos o método para listar negociações do banco
	//e assim facilitar a manutenção do código
	lista() {
		return ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.listaTodos())
			.catch(erro => {
				console.log(erro);
				throw new Error(erro);
			});
	}

	//criamos o método para apagar negociações do banco
	//e assim facilitar a manutenção do código
	apaga() {
		return ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.apagaTodos())
			.then(() => 'Negociações apagadas com sucesso')
			.catch(erro => {
				console.log(erro);
				throw new Error(erro);
			});
	}

	//criamos o método para importar negociações do backend
	//e comparar com uma lista atual para não importar as mesmas negociações repetidamente
	importa(listaAtual) {
		return this.obterNegociacoes()
			.then(negociacoes => negociacoes.filter(negociacao =>
				!listaAtual.some(negociacaoExistente =>
					//caso tivessemos que comparar negociações em outras partes do códigos
					//sempre teriamos que usar JSON.stringify, mas podemos isolar essa regra no model de negociação
					//JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)

					//então vamos criar a função equals que testa se uma negociação e igual a outra
					negociacao.equals(negociacaoExistente)
					//também poderiamos chamar a partir de negociacaoExistente
					//negociacaoExistente.equals(negociacao)
				)
			)).catch(erro => {
				console.log(erro);
				throw new Error(erro);
			});
	}
}
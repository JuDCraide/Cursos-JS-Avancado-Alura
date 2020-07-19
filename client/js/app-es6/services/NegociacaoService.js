import {HttpService} from './HttpService';
import {ConnectionFactory} from './ConnectionFactory';
import {NegociacaoDao} from '../dao/NegociacaoDao';
import {Negociacao} from '../models/Negociacao';
export class NegociacaoService {

	constructor() {
		this._http = new HttpService();
	}

	obterNegociacoesDaSemana() {

		return this._http.get('negociacoes/semana')
			.then(negociacoes => negociacoes.map(
				objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
			)).catch(erro => {
				//console.log(erro);
				throw new Error('Não foi possível obter as negociações da semana do servidor.');
			});
	}

	obterNegociacoesDaSemanaAnterior() {

		return this._http.get('negociacoes/anterior')
			.then(negociacoes => negociacoes.map(
				objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
			)).catch(erro => {
				//console.log(erro);
				throw new Error('Não foi possível obter as negociações da semana anterior do servidor.');
			});
	}

	obterNegociacoesDaSemanaRetrasada() {

		return this._http.get('negociacoes/retrasada')
			.then(negociacoes => negociacoes.map(
				objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
			)).catch(erro => {
				//console.log(erro);
				throw new Error('Não foi possível obter as negociações da semana retrasada do servidor.');
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
			//console.log(erro);
			throw new Error('Não foi possível obter as negociações do servidor.')
		});
	}

	
	cadastra(negociacao) {
		return ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.adiciona(negociacao))
			.then(() => 'Negociação incluida com sucesso')
			.catch(erro => {
				//console.log(erro);
				throw new Error(erro);
			});
	}

	lista() {
		return ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.listaTodos())
			.catch(erro => {
				//console.log(erro);
				throw new Error(erro);
			});
	}

	apaga() {
		return ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.apagaTodos())
			.then(() => 'Negociações apagadas com sucesso')
			.catch(erro => {
				//console.log(erro);
				throw new Error(erro);
			});
	}

	importa(listaAtual) {
		return this.obterNegociacoes()
			.then(negociacoes => negociacoes.filter(negociacao =>
				!listaAtual.some(negociacaoExistente => negociacao.equals(negociacaoExistente))
			)).catch(erro => {
				//console.log(erro);
				throw new Error(erro);
			});
	}
}
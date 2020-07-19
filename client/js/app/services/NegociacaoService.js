'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {
	function NegociacaoService() {
		_classCallCheck(this, NegociacaoService);

		this._http = new HttpService();
	}

	_createClass(NegociacaoService, [{
		key: 'obterNegociacoesDaSemana',
		value: function obterNegociacoesDaSemana() {

			return this._http.get('negociacoes/semana').then(function (negociacoes) {
				return negociacoes.map(function (objeto) {
					return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
				});
			}).catch(function (erro) {
				//console.log(erro);
				throw new Error('Não foi possível obter as negociações da semana do servidor.');
			});
		}
	}, {
		key: 'obterNegociacoesDaSemanaAnterior',
		value: function obterNegociacoesDaSemanaAnterior() {

			return this._http.get('negociacoes/anterior').then(function (negociacoes) {
				return negociacoes.map(function (objeto) {
					return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
				});
			}).catch(function (erro) {
				//console.log(erro);
				throw new Error('Não foi possível obter as negociações da semana anterior do servidor.');
			});
		}
	}, {
		key: 'obterNegociacoesDaSemanaRetrasada',
		value: function obterNegociacoesDaSemanaRetrasada() {

			return this._http.get('negociacoes/retrasada').then(function (negociacoes) {
				return negociacoes.map(function (objeto) {
					return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
				});
			}).catch(function (erro) {
				//console.log(erro);
				throw new Error('Não foi possível obter as negociações da semana retrasada do servidor.');
			});
		}
	}, {
		key: 'obterNegociacoes',
		value: function obterNegociacoes() {
			return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(function (semanas) {
				return semanas.reduce(function (periodoTotal, semana) {
					return periodoTotal.concat(semana);
				}, []);
			}).catch(function (erro) {
				//console.log(erro);
				throw new Error('Não foi possível obter as negociações do servidor.');
			});
		}
	}, {
		key: 'cadastra',
		value: function cadastra(negociacao) {
			return ConnectionFactory.getConnection().then(function (connection) {
				return new NegociacaoDao(connection);
			}).then(function (dao) {
				return dao.adiciona(negociacao);
			}).then(function () {
				return 'Negociação incluida com sucesso';
			}).catch(function (erro) {
				//console.log(erro);
				throw new Error(erro);
			});
		}
	}, {
		key: 'lista',
		value: function lista() {
			return ConnectionFactory.getConnection().then(function (connection) {
				return new NegociacaoDao(connection);
			}).then(function (dao) {
				return dao.listaTodos();
			}).catch(function (erro) {
				//console.log(erro);
				throw new Error(erro);
			});
		}
	}, {
		key: 'apaga',
		value: function apaga() {
			return ConnectionFactory.getConnection().then(function (connection) {
				return new NegociacaoDao(connection);
			}).then(function (dao) {
				return dao.apagaTodos();
			}).then(function () {
				return 'Negociações apagadas com sucesso';
			}).catch(function (erro) {
				//console.log(erro);
				throw new Error(erro);
			});
		}
	}, {
		key: 'importa',
		value: function importa(listaAtual) {
			return this.obterNegociacoes().then(function (negociacoes) {
				return negociacoes.filter(function (negociacao) {
					return !listaAtual.some(function (negociacaoExistente) {
						return negociacao.equals(negociacaoExistente);
					});
				});
			}).catch(function (erro) {
				//console.log(erro);
				throw new Error(erro);
			});
		}
	}]);

	return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map
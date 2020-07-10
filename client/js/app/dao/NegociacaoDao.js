class NegociacaoDao {

	constructor(connection) {
		this._connection = connection;
		this._store = 'negociacoes';
	}

	//criamos o método adiciona nos baseando na função do testeIndexedDB
	adiciona(negociacao) {
		return new Promise((resolve, reject) => {
			//ao invés de criar variáveis transaction e store  podemos encadear as chamadas
			let request = this._connection
				.transaction([this._store], "readwrite") //pega transaction
				.objectStore(this._store)               //pega a object store
				.add(negociacao);                      //adiciona a negociacao na store

			//se deu sucesso não precisamos retornar nada pelo resolve
			request.onsuccess = e => resolve();

			request.onerror = e => {
				console.log(e.target.error);
				reject("Erro ao incluir negociação");
			}
		})
	}

	//criamos o método listaTodos nos baseando na função do testeIndexedDB
	listaTodos() {
		return new Promise((resolve, reject) => {
			//novamente encadeamos as chamadas
			let cursor = this._connection
				.transaction(["negociacoes"], "readwrite")
				.objectStore("negociacoes")
				.openCursor();

			let negociacoes = [];

			cursor.onsuccess = (e) => {
				let atual = e.target.result;

				if (atual) {
					let dado = atual.value;
					negociacoes.push(
						new Negociacao(dado._data, dado._quantidade, dado._valor)
					);
					atual.continue();

				} else {
					//nesse momento a lista está completa então podemos dar resolve
					resolve(negociacoes);
				}
			};
			cursor.onerror = (e) => {
				console.log(e.target.error.name);
				reject('Não foi possível listar as negociações')
			}
		});
	}

	apagaTodos() {
		return new Promise((resolve, reject) => {
			let request = this._connection
				.transaction([this._store], "readwrite")
				.objectStore(this._store)
				.clear();

			request.onsuccess = e => resolve('Negociações removidas do banco');

			request.onerror = e => {
				console.log(e.target.error);
				reject("Não foi possível excluir as negociações");
			}
		});
	}
}
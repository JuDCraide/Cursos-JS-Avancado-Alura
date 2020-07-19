const dbName = "aluraframe";
const stores = ["negociacoes"];
const version = 4;

let connection = null;
let close = null;

export class ConnectionFactory {

	constructor() {
		throw new Error("Não é possível criar instâncias de ConnectionFactory");
	}

	static getConnection() {
		return new Promise((resolve, reject) => {
			let openRequest = window.indexedDB.open(dbName, version);

			openRequest.onupgradeneeded = (e) => this._createStores(e.target.result);

			openRequest.onsuccess = (e) => {
				if (!connection) {
					connection = e.target.result;
					close = connection.close.bind(connection);
					connection.close = function () {
						throw new Error('Você não pode fechar diretamente a conexão')
					}
				}
				resolve(connection);
			}

			openRequest.onerror = (e) => {
				console.log(e.target.error);
				reject(e.target.error.name);
			};
		});
	}

	static closeConnection() {
		if (connection) {
			close();
			connection = null;
		}
	}

	static _createStores(conexao) {
		stores.forEach((store) => {
			if (conexao.objectStoreNames.contains(store)) {
				conexao.deleteObjectStore(store);
			}
			conexao.createObjectStore(store, { autoIncrement: true });
		});
	}
}
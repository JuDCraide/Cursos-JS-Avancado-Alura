//mas com uma função nomeada poderíamos chamar tmp o que não é ideal
//então vamos tornar ela em uma função anônima auto invocada e atribuir a ConnectionFactory
//colocando parêntesis ao redor da declaração função e um par de parentêsis no fim
//esse padrão de projeto é chamado de module pattern
//function tmp() {
var ConnectionFactory = (function () {
	//guardamos em constantes coisas que podemos querer mudar caso mudarmos a forma de armazenar
	//o problema é que essas constantes e variáveis tem escopo global
	//para evitar isso vamos botar todo o código dentro de uma função
	const dbName = "aluraframe";
	const stores = ["negociacoes"];
	const version = 4;
	
	//criamos a variável connection
	var connection = null;
	//criamos uma variável que guarda o connection.close
	var close=null

	//porém ao colocar a função ao redor de ConnectionFactory ela não pode ser alcançada
	//para driblar isso vamos tornar a classe o retorno da função
	//class ConnectionFactory {
	return class ConnectionFactory {

		constructor() {
			throw new Error("Não é possível criar instâncias de ConnectionFactory");
		}

		static getConnection() {
			return new Promise((resolve, reject) => {
				let openRequest = window.indexedDB.open(dbName, version);

				openRequest.onupgradeneeded = (e) => {
					//para tornar mais legível vamos passar isso para uma método createStores
					/*let conexao=e.target.result;
					stores.forEach(store => {
						if(conexao.objectStoreNames.contains(store))
							conexao.deleteObjectStore(store);
						
						conexao.createObjectStore(store, {autoIncrement: true});
					});*/
					this._createStores(e.target.result);
				};

				openRequest.onsuccess = (e) => {
					//o problema é que desse jeito toda vez retornamos uma connection diferente
					//por isso vamos criar uma variável connection
					//resolve(e.target.result);

					//atribui o resultado se connection está vazio
					if (!connection) {
						connection = e.target.result;
						//vamos fazer um Monkey Patch para impedir fechar a connection sem usar o método closeConnection
						//para isso vamos sobrescrever a função close com um erro
						//mas assim a função closeConnection não funciona também
						/*connection.close = function(){
							throw new Error('Você não pode fechar diretamente a conexão')
						}*/
						//então antes de sobrescrever a função vamos guardar ela em uma váriavel chamada close
						//close = connection.close;
						//mas não podemos esquecer de dar bind com a connection para manter o this 
						close = connection.close.bind(connection);
						connection.close = function(){
							throw new Error('Você não pode fechar diretamente a conexão')
						}
					}
					//envia connectoin como resultado
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
				//como sobrescrevemos a função close ela não funciona mais
				//connection.close();
				//então guardamos o método original na variável close e executamos ela
				close();
				//se não tivessemos feito o bind ao atribuir a função no close ainda poderiamos fazer
				//Reflect.apply(close, connection, []);
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

	//}
})();

//e vamos criar uma variável chamada ConnectionFactory que recebe a função
//assim a ConnectionFactory recebe a declaração da classe
//e apenas métodos dela podem acessar as variáveis que guarda o connection.close
//var ConnectionFactory = tmp();

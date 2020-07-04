class NegociacaoService {

  /*
  obterNegociacoesDaSemana(cb) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'negociacoes/semana');

    xhr.onreadystatechange = () => {

      if (xhr.readyState === 4) {

        if (xhr.status === 200) {


          cb(null, JSON.parse(xhr.responseText).map(
              objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
            )
          )
        } else {
          console.log(xhr.responseText);
          //cb('Erro, não foi possível obter as negociações do servidor.', null)
          //melhoramos qualidade das mensagens de erro
          cb('Erro, não foi possível obter as negociações da semana do servidor.', null)
        }
      }
    };

    xhr.send();
  }

  //copiamos o código de obterNegociacoesDaSemana mundando apenas o endereço
  //e criamos funções para semana anterior e a retrasada
  obterNegociacoesDaSemanaAnterior(cb) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'negociacoes/anterior');

    xhr.onreadystatechange = () => {

      if (xhr.readyState === 4) {

        if (xhr.status === 200) {


          cb(null, JSON.parse(xhr.responseText).map(
              objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
            )
          )
        } else {
          console.log(xhr.responseText);
          //cb('Erro, não foi possível obter as negociações do servidor.', null)
          //melhoramos qualidade das mensagens de erro
          cb('Erro, não foi possível obter as negociações da semana anterior do servidor.', null)
        }
      }
    };

    xhr.send();
  }

  obterNegociacoesDaSemanaRetrasada(cb) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'negociacoes/retrasada');

    xhr.onreadystatechange = () => {

      if (xhr.readyState === 4) {

        if (xhr.status === 200) {


          cb(null, JSON.parse(xhr.responseText).map(
              objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
            )
          )
        } else {
          console.log(xhr.responseText);
          //cb('Erro, não foi possível obter as negociações do servidor.', null)
          //melhoramos qualidade das mensagens de erro
          cb('Erro, não foi possível obter as negociações da semana retrasada do servidor.', null)
        }
      }
    };

    xhr.send();
  }
  */

  //vamos reescrever os 3 métodos como Promises, aí não vamos mais precisar do callback
  //a promisse recebe uma função com parâmetros resolve(o resultado) e um reject(o erro)
  /*
  obterNegociacoesDaSemana() {

    return new Promise((resolve, reject) => {

      let xhr = new XMLHttpRequest();
      xhr.open('GET', 'negociacoes/semana');

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText).map(
              objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
            ))
          } else {
            console.log(xhr.responseText);
            reject('Erro, não foi possível obter as negociações da semana do servidor.')
          }
        }
      };

      xhr.send();
    })
  }

  obterNegociacoesDaSemanaAnterior() {

    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', 'negociacoes/anterior');

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText).map(
              objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
            ))
          } else {
            console.log(xhr.responseText);
            reject('Erro, não foi possível obter as negociações da semana anterior do servidor.')
          }
        }
      };

      xhr.send();
    })
  }

  obterNegociacoesDaSemanaRetrasada() {

    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', 'negociacoes/retrasada');

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText).map(
              objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
            ))
          } else {
            console.log(xhr.responseText);
            reject('Erro, não foi possível obter as negociações da semana retrasada do servidor.')
          }
        }
      };

      xhr.send();
    })
    
  }*/

  constructor() {
    this._http = new HttpService();
  }

  //vamos usar o HttpService para fazer os gets da api
  /*obterNegociacoesDaSemana() {

    return new Promise((resolve, reject) => {

      this._http.get('negociacoes/semana')
        .then(negociacoes => resolve(negociacoes.map(
          objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
        ))).catch(erro => {
          console.log(erro);
          reject('Erro, não foi possível obter as negociações da semana do servidor.');
        });

    });

  }

  obterNegociacoesDaSemanaAnterior() {

    return new Promise((resolve, reject) => {

      this._http.get('negociacoes/anterior')
        .then(negociacoes => resolve(negociacoes.map(
          objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
        ))).catch(erro => {
          console.log(erro);
          reject('Erro, não foi possível obter as negociações da semana anterior do servidor.');
        });

    });
  }

  obterNegociacoesDaSemanaRetrasada() {

    return new Promise((resolve, reject) => {

      this._http.get('negociacoes/retrasada')
        .then(negociacoes => resolve(negociacoes.map(
          objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
        ))).catch(erro => {
          console.log(erro);
          reject('Erro, não foi possível obter as negociações da semana retrasada do servidor.');
        });

    });
  }*/

  //mas comoo HttpSrvice já retorna uma promise 
  //não precisamos retornar novas promises nos métodos
  //aí trocamos o reject por throw new Error
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

  //podemos criar um método para obter todas as negociações
  //pegando o Promise.all que usavamos em Negociação Controller
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
}
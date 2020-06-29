class NegociacaoService {

  //isolamos o código de obter negociação em uma classe
  //por isso temos que tirar atribuições em mensagem
  //a função recebe um mátodo chamado cb -> callback
  obterNegociacoesDaSemana(cb) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'negociacoes/semana');

    xhr.onreadystatechange = () => {

      if (xhr.readyState === 4) {

        if (xhr.status === 200) {

          //se der tudo certo não passamos nada no primeiro parametro
          //e passamos o resultado no segundo
          cb(null, JSON.parse(xhr.responseText).map(
              objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
            )
          )
        } else {
          //se der erro mostramos o erro feio no console
          //e retonramos uma mensagem de alto nível para ser exibida ao usuário
          console.log(xhr.responseText);
          cb('Erro, não foi possível obter as negociações do servidor.', null)
        }
      }
    };

    xhr.send();
  }
}
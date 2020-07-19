class HttpService {

  //vamos criar uma função para tratar os erros
  _handleErrors(res) {
    //a resposta do fatch tem o parâmetro ok se recebeu um código de sucesso(200-226)
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    return res;
  }

  //vamos usar o o fetch uma API de buscas em requisições Ajax
  get(url) {
    //testamos erro mudando a url
    //url = 'xxx'
    return fetch(url)
      .then(res => this._handleErrors(res))
      .then(res => res.json());
  }

  post(url, dado) {
    
    return fetch(url, {
      headers: { 'Content-type': 'application/json' },
      method: 'post',
      body: JSON.stringify(dado),
    }).then(res => this._handleErrors(res))
    
  }

}
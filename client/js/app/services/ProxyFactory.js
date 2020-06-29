//criamos uma fabrica que cria Proxys de um objeto e quando chama certas props executa uma ação
class ProxyFactory {
  static create(objeto, props, acao) {

    //copiamos o código de negociação controller
    //mas modificamos para ficar mais genérico
    return new Proxy(objeto, {

      get(target, prop, receiver) {

        //trocamos a expressão com os typeof por uma função 
        if (props.includes(prop) && ProxyFactory._ehFunction(target[prop]) /*typeof(target[prop]) == typeof(Function)*/){
          return function () {
            console.log(`interceptando ${prop}`);

            /*Reflect.apply(target[prop], target, arguments);
            acao(target);*/
            //esquecemos de retornar o reflect, o que pode causar erro em alguns exemplos
            //mas como precisamos fazer acao(target) após o reflect salvamos o reflect em uma variável
            let retorno = Reflect.apply(target[prop], target, arguments);
            acao(target)
            return retorno;
          }
        }

        return Reflect.get(target, prop, receiver);

      },

      //mas só o get não era suficiente
      //pq ele não intercepta prorpiedades só métodos
      set(target, prop, value, receiver) {     
        //mas assim ocorre um erro, pois precisavamos retornar o reflect
        /*Reflect.set(target, prop, value, receiver);
        acao(target);*/

        //por isso precisaremos de um if
        /*if(props.includes(prop)){
          console.log(`antigo ${target[prop]} novo ${value}`);
          target[prop]=value;
          acao(target);
        }
        return Reflect.set(target, prop, value, receiver);*/

        //mas nosso if anterior tem um problema de performace
        //pois atualizamos o objeto 2 vezes quando a propriedade é interceptada
        //por isso atualizamos para
        let retorno = Reflect.set(target, prop, value, receiver);
        if(props.includes(prop)){
          //console.log(`antigo ${target[prop]} novo ${value}`);
          acao(target);
        }
        return retorno;
        
      }

    });
  }

  //criamos uma função para ficar mais específico
  static _ehFunction(func){
    return typeof(func) == typeof(Function);
  }
}
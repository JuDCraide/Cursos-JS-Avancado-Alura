class Bind {

    //agora vamos usar o operador REST, que parece com o spreed operator
    //ele faz com q os parametro apartir do 3º caiam dentro de um array chamado props
    // o REST operator só pode ser usado no último parâmetro, por motivos óbvios
    constructor(model, view, ...props){
        
        //criamos uma proxy com as propriedades recebidas
        let proxy = ProxyFactory.create(
            model,
            props,
            (model) => view.update(model)
        );
        
        //e já faz um update inicial
        view.update(model);
        
        //retorna o proxy criado
        return proxy;
    }

}
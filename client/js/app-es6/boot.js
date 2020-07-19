//import {NegociacaoController} from './controllers/NegociacaoController';
import {currentInstance} from './controllers/NegociacaoController';
import {} from './polyfill/fetch';

//instanciamos o negociacaoController
//let negociacaoController = new NegociacaoController();
let negociacaoController = currentInstance();

//e usamos a maneira tradicional
document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController);
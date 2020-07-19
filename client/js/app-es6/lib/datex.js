//vamos supor que baixamor uma biblioteca da internet chamada datex
//dentro dela temos a definição de uma classe DataHelper
//se importarmos esse script assim com está no final index.js teremos um erro
//pois essa classe sobrescreverá o nosso DataHelper
// ** na verdade atualmente o Node.js já resolveu este problema adotando padrão CommonJS ao invés do AMD (Assincronous Module Definition) **
//mas vamos resolver isso usando o sistema de módulos do ECMAScript2015, ou seja usando export e import
//vamos precisar de uma biblioteca que funcione como loader, então vamos usar a famosa System JS, baixando pelo npm
class DataHelper {

    dataParaTexto(data) {/* faz algo */}

    textoParaData(texto) {/* faz algo */}

}
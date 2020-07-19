'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataHelper = function () {
    function DataHelper() {
        _classCallCheck(this, DataHelper);

        throw new Error('A classe DateHelper não pode ser instânciada');
    }

    _createClass(DataHelper, null, [{
        key: 'dataParaTexto',
        value: function dataParaTexto(data) {
            return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
        }
    }, {
        key: 'textoParaData',
        value: function textoParaData(texto) {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(texto)) {
                throw new Error('Deve estar no formato aaaa-mm-dd');
            }
            return new Date(texto.split('-'));
        }
    }]);

    return DataHelper;
}();
//# sourceMappingURL=DateHelper.js.map
"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, DataHelper;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            DataHelper = function () {
                function DataHelper() {
                    _classCallCheck(this, DataHelper);
                }

                _createClass(DataHelper, [{
                    key: "dataParaTexto",
                    value: function dataParaTexto(data) {/* faz algo */}
                }, {
                    key: "textoParaData",
                    value: function textoParaData(texto) {/* faz algo */}
                }]);

                return DataHelper;
            }();
        }
    };
});
//# sourceMappingURL=datex.js.map
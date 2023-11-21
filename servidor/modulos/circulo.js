var PI = Math.PI;

function dosPI(r) { return PI * r }

exports.area = function (r) { return dosPI(r) * r; };
exports.perimetro = function (r) {  return dosPI(r) * r; };
exports.dosPI = dosPI
exports.valor = Math.PI
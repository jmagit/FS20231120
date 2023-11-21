const circulo = require('./modulos/circulo')
const { area, perimetro } = require('./modulos/circulo')
const Cuadrado = require('./modulos/cuadrado')

console.log(circulo.area(10), circulo.perimetro(10), circulo.dosPI(10), circulo.valor)
console.log(area(10), perimetro(10))
let c = new Cuadrado(10)
console.log(c.area())

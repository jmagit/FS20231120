function clase(x, y) {
    this.x = x
    this.y = y
    this.metodo = () => 'algo'
}
clase.prototype.algo = () => 'del prototipo'
function clase3d(z) {
    this.z = z
}
clase3d.prototype = clase.prototype

class Clase {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    metodo() {
        return 'algo'
    }
}
let c = new clase(10, 20)
let d = new clase(20, 20)
c.z = 4
d.x = d.metodo
d.metodo = 4
let j = new Clase(20, 20)
//j.z = 5
console.log(c, d, j) 
console.log(c.algo(), d.algo(), j) 
//c.prototype.algo = () => 'otra cosa'
console.log(c.algo(), d.algo(), j) 

console.log(typeof(Clase), typeof(clase))

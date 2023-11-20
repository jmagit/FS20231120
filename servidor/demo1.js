const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola Mundo.\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

console.log('Aplicación arrancada ahora')

let t = [ 10, 20, 30 ]
//t = { x: 10, y: 20 }
for(let i in t) {
    console.log(`Valor ${i}`)
}
for(let i of t) {
    console.log(`Valor ${i}`)
}

let x = 10, y = 20
// t = { x: x, y: y}
t = { x, y }
// t = [x, y, ...t]
console.log(t)

x = 0
console.log(x && "Es verdadero")
console.log(x || "El valor si es falso")
console.log(x ?? "El valor si es nulo")
if(x) {
    
}
const dotenv = require('dotenv')
dotenv.config();
if (process.env.NODE_ENV !== 'production')
  dotenv.config({ path: './.env.dev', override: true, debug: true })
const http = require('http');

const hostname = '127.0.0.1';
const port = process.env.NODE_PORT ?? 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola Mundo.\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

console.log('Aplicación arrancada ahora')

let t = [10, 20, 30]
t[5]=22

t = { x: 10, y: 20 }
t['x']=20
t.z = 44
delete t.x
t.metodo = () => 'algo'

for (let i in t) {
  console.log(`Valor ${i}`)
}
for (let i of t) {
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

process.argv.slice(2).forEach((val, index) => {
  console.log(`${index}: ${val.includes('=') ? `name: ${val.split('=')[0]} value: ${val.split('=')[1]}` : val}`);
});

// const readline = require('readline').createInterface({
//   input: process.stdin, output: process.stdout,
// });
// readline.question(`Dame el puerto`, port => {
//   readline.close();
//   server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
//   });
// });

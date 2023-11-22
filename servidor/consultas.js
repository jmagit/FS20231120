const { sequelize, dbContext } = require('./models/db-context');
const { Op } = require('sequelize');

// (async () => {
//     let pag = 1, rows = 10
//     const options = {
//         attributes: ['id', ['first_Name','nombre']],
//         // attributes: { exclude: ['lastUpdate'] },
//         // where: { id: {[Op.lte]: 5}, firstName: {[Op.startsWith]: 'J'}} 
//         offset: pag * rows, limit: rows,
//         order: [['firstName']] 
//     }
//     const rslt = await dbContext.Actor.findAll(options);
//     //console.log(rslt)
//     rslt.forEach(element => {
//         console.log(element.toJSON())
//     });
//     let uno = await dbContext.Actor.findByPk(1);
//     uno = await dbContext.Actor.findOne(options);
//     console.log(uno?.toJSON())
    
//     console.log('ahora si')
// })();
// (async () => {
//     let uno = await dbContext.Actor.findByPk(1);
//     console.log(uno)
//     uno.getFilms().forEach(element => {
//                 console.log(element.toJSON())
//             });
        
//     console.log('ahora si')
// })();

(async () => {
    let pag = 1, rows = 10
    const options = {
        attributes: ['id', ['first_Name','nombre']],
        // attributes: { exclude: ['lastUpdate'] },
        // where: { id: {[Op.lte]: 5}, firstName: {[Op.startsWith]: 'J'}} 
        // offset: pag * rows, limit: rows,
        // order: [['firstName']] 
    }
    let uno = await dbContext.Actor.build({ firstName: "Pepe", lastName: "Illo" });
    await uno.save()
    console.log(uno?.toJSON())
    uno = await dbContext.Actor.create({ firstName: "Pepito", lastName: "Grillo" });
    console.log(uno?.toJSON())
    uno.firstName = "PEPITO"
    await uno.save()
    console.log(uno?.toJSON())
    
     const rslt = await dbContext.Actor.findAll(options);
    //console.log(rslt)
    rslt.forEach(element => {
        console.log(element.toJSON())
    });
   console.log('ahora si')
})();
console.log('parece que termine')
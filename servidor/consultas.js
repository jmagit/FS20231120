const { sequelize, dbContext } = require('./models/db-context');
const { Op, QueryTypes } = require('sequelize');

async function consultas() {
    let pag = 1, rows = 10
    const options = {
        attributes: ['id', ['first_Name', 'nombre']],
        // attributes: { exclude: ['lastUpdate'] },
        // where: { id: {[Op.lte]: 5}, firstName: {[Op.startsWith]: 'J'}} 
        offset: pag * rows, limit: rows,
        order: [['firstName']]
    }
    const rslt = await dbContext.Actor.findAll(options);
    //console.log(rslt)
    rslt.forEach(element => {
        console.log(element.toJSON())
    });
    let uno = await dbContext.Actor.findByPk(1);
    uno = await dbContext.Actor.findOne(options);
    console.log(uno?.toJSON())

    console.log('ahora si')
}
async function asociaciones() {
    let uno = await dbContext.Actor.findByPk(1, {include: 'filmIdFilms' });
    console.log(uno.toJSON())
    console.log(`Películas: ${await uno.countFilmActors()}`)
    uno.filmIdFilms.forEach(peli => console.log(peli.title));
    // let pelis = await uno.getFilmIdFilms()
    // pelis.forEach(peli => console.log(peli.title));
}
async function ultimos() {
    const rslt = await dbContext.Actor.findAll({ where: { id: { [Op.gt]: 200 } } });
    rslt.forEach(element => {
        console.log(element.toJSON())
    });
}
async function validar(row) {
    console.log(`validando ...`)
    try {
        await row.validate()
    } catch (error) {
        console.log({
            type: "https://tools.ietf.org/html/rfc7231#section-6.5.1",
            status: 400,
            title: 'One or more validation errors occurred.',
            errors: Object.assign({}, ...error.errors.map(item => ({ [item.path]: item.message })))
        })
        return;
    }
}

async function crud() {
    try {
        console.log('-------------- build')
        let uno = await dbContext.Actor.build({ firstName: "PPEP", lastName: "Illo" });
        await uno.save()
        await ultimos()
        console.log('-------------- create')
        let otro = await dbContext.Actor.create({ firstName: "PEPITO", lastName: "Grillo" });
        await ultimos()
        console.log('-------------- update')
        otro.firstName = "JOSE"
        await otro.save()
        await uno.set({ firstName: "TODO", lastName: "JUNTO" })
        await uno.save()
        await ultimos()
        console.log('-------------- delete')
        await uno.destroy()
        await otro.destroy()
        await ultimos()
    } catch (error) {
        console.log('400 Datos inválidos')
        console.log(error.errors)
        // formato https://datatracker.ietf.org/doc/html/rfc7807
        console.log({
            type: "https://tools.ietf.org/html/rfc7231#section-6.5.1",
            status: 400,
            title: 'One or more validation errors occurred.',
            errors: Object.assign({}, ...error.errors.map(item => ({ [item.path]: item.message })))
        })
        return;
    }
}

async function sql(id = 200) {
    try {
        // const [results, metadata] = await sequelize.query(`SELECT actor_id, first_name, last_name, last_update FROM dbo.actor WHERE actor_id >= ${id}`);
        // console.log(metadata)
        // const results = await sequelize.query(`SELECT actor_id, first_name, last_name, last_update FROM dbo.actor WHERE actor_id >= ${id}`, 
        //     { model: dbContext.Actor, mapToModel: true });
        // const results = await sequelize.query(`SELECT actor_id, first_name, last_name, last_update FROM dbo.actor WHERE actor_id >= ${id}`, 
        //     { type: QueryTypes.SELECT });
        // const results = await sequelize.query(`SELECT actor_id, first_name, last_name, last_update FROM dbo.actor WHERE actor_id >= ?`, 
        //     { replacements: [id], type: QueryTypes.SELECT });
        const results = await sequelize.query(`SELECT actor_id, first_name, last_name, last_update FROM dbo.actor WHERE actor_id >= :id`, 
            { replacements: { id }, type: QueryTypes.SELECT });
        console.log(results)
    } catch(err) {
        console.log(err)
    }
}
async function transaccionesManuales() {
    const t = await sequelize.transaction();
    try {
        await dbContext.Actor.create({ firstName: 'UNO', lastName: 'Simpson' },
            { transaction: t });
        await dbContext.Actor.create({ firstName: 'DOS', lastName: 'Simpson' },
            { transaction: t });
        const item = await dbContext.Actor.create({ firstName: 'TRES', lastName: 'Simpson' },
            { transaction: t });
        await item.addFilmIdFilm( 1, { transaction: t });
        await item.addFilmIdFilm( 2, { transaction: t });
        await item.addFilmIdFilm( 22222, { transaction: t });
        await t.commit();
    } catch (error) {
        await t.rollback();
    }
}
async function transaccionesAuto() {
    const result = await sequelize.transaction(async (t) => {
        await dbContext.Actor.create({ firstName: 'UNO', lastName: 'Simpson' },
            { transaction: t }
        );
        await dbContext.Actor.create({ firstName: 'DOS', lastName: 'Simpson' },
            { transaction: t }
        );
        const item = await dbContext.Actor.create({ firstName: 'TRES', lastName: 'Simpson' },
            { transaction: t }
        );
        await item.addFilmIdFilms( [1, 2, 22222], { transaction: t });
    });
    console.log(result)
}

console.log('parece que termine')
const resuelve = () => {
    console.log(`Termine ${new Date().toLocaleTimeString('es')}`);
    // process.exit(0) 
}
const rechaza = err => console.error(`ERROR ${new Date().toLocaleTimeString('es')}: `, err)

// consultas().then(resuelve, rechaza)
// asociaciones().then(resuelve, rechaza)
// crud().then(resuelve, rechaza)
// sql('199').then(resuelve, rechaza)
// sql('199 or 1=1').then(resuelve, rechaza)
// transaccionesManuales().then(resuelve, rechaza)
// transaccionesAuto().then(resuelve, rechaza)

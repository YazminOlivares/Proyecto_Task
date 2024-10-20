const request = require('supertest');
const chai = require('chai');
const sinon = require('sinon');

const app = require('../index');
const taskController = require('../controller/taskController');

const expect = chai.expect;

describe('GET /tasks', () => {

    it('1. Debería devolver todas las tareas con estatus 200 cuando hay tareas', async() => {
        const tasks = [
            {
                id: 1,
                title: "Tarea1",
                description: "Descripción de la tarea 1",
            },
            {
                id: 2,
                title: "Tarea2",
                description: "Descripción de la tarea 2",
            },
            {
                id: 3,
                title: "Tarea3",
                description: "Descripción de la tarea 3",
            }
        ];

        const res = await request(app).get('/tasks');

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(3);
        expect(res.body).to.deep.equal(tasks);
    });

});

describe('GET /tasks/1', () => {

    it('1. Debería devolver una tarea con status 200', async() => {
        const task = {
            id: 1,
            title: "Tarea1",
            description: "Descripción de la tarea 1",
        };

        const res = await request(app).get('/tasks/1');

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.deep.equal(task);
    });
});

describe('DELETE /tasks/2', () => {

    it('4. Debería actualizar una tarea y regresar un estatus 200', async() => {

        const tasks = [
            {
                id: 1,
                title: "Tarea1",
                description: "Descripción de la tarea 1",
            },
            {
                id: 3,
                title: "Tarea3",
                description: "Descripción de la tarea 3",
            }
        ];

        const res = await request(app).delete('/tasks/2');

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(tasks);
    });
});

describe('POST /tasks', () => {

    it('3. Debería agregar una tarea al arreglo y regresar un estatus 200', async() => {

        const task = {
            id: 4,
            title: "Tarea4",
            description: "Descripción de la tarea 4"
        };

        const res = await request(app).post('/tasks').send(task);

        expect(res.status).to.equal(200);
    });
});

describe('POST /tasks', () => {

    it('4. Debería actualizar una tarea y regresar un estatus 200', async() => {

        const task = {
            id: 2,
            title: "Tarea222",
            description: "Nueva descripción",
        };

        const res = await request(app).post('/tasks').send(task);

        expect(res.status).to.equal(200);
    });
});s
import express from "express";
import knex from "knex";
import path from "path";
import fetch from "cross-fetch";
import API from "../../backend/api";

const bodyParser = require("body-parser");

// initialize db from test folder
const personDb = knex({
    client: 'sqlite3',
    connection: { filename: path.join(__dirname, "personData.db") },
    useNullAsDefault: true
});

const activityDb = knex({
    client: 'sqlite3',
    connection: { filename: path.join(__dirname, "activityData.db") },
    useNullAsDefault: true
});

const dayDb = knex({
    client: 'sqlite3',
    connection: { filename: path.join(__dirname, "dayData.db") },
    useNullAsDefault: true
});


// initialize server with test db
const app = express();
app.use(bodyParser.json());
const server = app.listen(8079, "localhost");
API(app, { personDb, activityDb, dayDb });


afterAll(() => {
    return server.close();;
});


it('should req all persons', async () => {
    const req = await fetch(`http://localhost:123/getPersons`)
    const personData = await req.json();
    return expect(personData[0].personName).toEqual("Тест");
});


it('should add new person by code', async () => {
    const req = await fetch(`http://localhost:123/addNewPerson/1`)
    const person = await req.json();
    return expect(person[0].code).toEqual("1");
});

it('should req persons by code', async () => {
    const req = await fetch(`http://localhost:123/getProfile/1`)
    const person = await req.json();
    return expect(person[0].personName).toEqual("1");
});


it('should delete person by code', async () => {
    await fetch(`http://localhost:123/deleteProfile/1`)
    const person = await personDb('personData').where('code', "1").select('*')
    return expect(person).toEqual([]);
});


/** DAY */

it('should req day', async () => {
    const req = await fetch(`http://localhost:123/getDate/05-04-2020`)
    const dayData = await req.json();
    return expect(dayData[0].date).toEqual("05-04-2020");
});


/** ACTIVITIES  */


it('should add activity to day history', async () => {
    const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: "1", date: "05-04-2020", time: "12:01:00", amount: "" })
    };
    const req = await fetch(`http://localhost:123/addToVisits`, reqOptions);
    const dayData = await req.json();
    return expect(dayData[0].date).toEqual("05-04-2020");
});



it('should get activities by code', async () => {
    const req = await fetch(`http://localhost:123/getActivities/1`)
    const activities = await req.json();

    return expect(activities[0].code).toEqual("1");
});

it('should delete activity', async () => {
    const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: "1", date: "05-04-2020", time: "12:01:00", type: "Посещение", person: "", amount: "" })
    };
    const req = await fetch(`http://localhost:123/delActivity`, reqOptions);

    const person = await req.json();
    return expect(person).toEqual([]);
});

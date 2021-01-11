require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Pool = require('pg').Pool
const create = require('./common/create_table');
const insertQuery = require('./common/load_data');
const exphbs = require('express-handlebars');

const port = process.env.PORT;
const pool = new Pool({
    connectionString: process.env.DB_URL ? process.env.DB_URL : `postgres://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
});

const createQueries = create();
createQueries.forEach(query => {
    setTimeout(async () => {
        const a = await runQuery(query);
    }, 5000);
});

setTimeout(() => {
    const insertClients = insertQuery.insertClientRecord();
    const insertAppointment = insertQuery.insertVisitRecord();
    for (let index = 0; index < insertClients.length; index++) {
        try {
            runQuery(insertClients[index]).then(async () => {
                for (const i of insertAppointment[index].query) {
                    await runQuery(i);
                }
            }).catch((e) => console.log(e));
        } catch (error) {
            console.log(error);
        }
    }
}, 5000);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static('public'))

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: require('./common/helpers')
}));

app.set('view engine', 'hbs');

app.get('/', async (req, res) => {    
    const appointmentQuery = 'SELECT * FROM appointment';
    const appointments = await runQuery(appointmentQuery);

    const clientQuery = 'SELECT * FROM client';
    const clients = await runQuery(clientQuery);

    res.render('home', {
        title: 'Doctor',
        appointments: appointments.rows,
        appointmentCount: appointments.rowCount,
        clients: clients.rows,
        clientCount: clients.rowCount,
    });
}); 

app.get('/client/:id', async (req, res) => {    
    // const clientQuery = `SELECT fname, lname, phone, email, details, medication, FROM client LEFT JOIN appointment ON (client.id = appointment.client) WHERE client.id=${req.params.id}`;
    const appointmentQuery = 'SELECT * FROM appointment WHERE client = ' + req.params.id;
    const appointments = await runQuery(appointmentQuery);

    const clientQuery = 'SELECT * FROM client WHERE id = ' + req.params.id;
    const client = await runQuery(clientQuery);

    res.render('client', {
        title: 'Doctor - ' + client.rows[0].fname,
        appointments: appointments.rows,
        appointmentCount: appointments.rowCount,
        client: client.rows[0],
        clientCount: client.rowCount,
    });
}); 

app.get('/client/add/new', async (req, res) => {    
    res.render('upsert_client', {
        title: 'Doctor - Add Client'
    });
});

app.get('/client/edit/:id', async (req, res) => {   
    const clientQuery = 'SELECT * FROM client WHERE id = ' + req.params.id;
    const client = await runQuery(clientQuery);

    res.render('upsert_client', {
        title: 'Doctor - ' + client.rows[0].fname,
        client: client.rows[0],
    });
});

app.get('/client/delete/:id', async (req, res) => {   
    const {id} = req.body;
    const clientQuery = 'DELETE FROM client WHERE id = $1';
    const val = [id];
    const client = await pool.query(clientQuery, val);

    res.redirect('/');
});

app.post('/client/upsert/details', async (req, res) => {   
    const {fname, lname, address, email, phone, id} = req.body;
    let query = {};

    if (id){
        query.text = `UPDATE client
        SET fname=$1, lname=$2, phone=$3, address=$4
        WHERE id=$5 returning *`;

        query.value = [fname, lname, phone, address, id];
        await pool.query(query.text, query.value);

        res.redirect('/client/'+id);
    } else {
        query.text = `INSERT INTO client
        (fname, lname, email, phone, address)
        SELECT $1, $2, $3, $4, $5
        WHERE
        NOT EXISTS (
            SELECT email FROM client WHERE email = $6
        )`;

        query.value = [fname, lname, email, phone, address, email];
        await pool.query(query.text, query.value);

        res.redirect('/');
    }
});

app.get('/appointment/add/:id', async (req, res) => {  
    const {id} = req.params;
    const clientQuery = 'SELECT * FROM client WHERE id = ' + id;
    const client = await runQuery(clientQuery);

    res.render('upsert_appointment', {
        title: 'Doctor - Add Appointment',
        client: client.rows[0]
    });
});

app.get('/appointment/edit/:id', async (req, res) => {   
    const {id} = req.params;
    const clientQuery = 'SELECT appointment.id, date, details, medication, lname, fname, client FROM appointment INNER JOIN client ON appointment.client = client.id WHERE appointment.id = ' + id;
    const client = await runQuery(clientQuery);

    res.render('upsert_appointment', {
        title: 'Doctor - Edit Appointment',
        appointment: client.rows[0],
    });
});

app.post('/appointment/upsert/details', async (req, res) => {   
    const {client, details, medication, date, id} = req.body;
    let query = {};

    if (id){
        query.text = `UPDATE appointment
        SET details=$1, medication=$2, date=$3
        WHERE id=$4 returning *`;

        query.value = [details, medication, date, id];
        await pool.query(query.text, query.value);

        res.redirect('/client/'+client);
    } else {
        query.text = `INSERT INTO appointment
        (details, medication, client, date)
        VALUES ($1, $2, $3, $4)`;

        query.value = [details, medication, client, date];
        await pool.query(query.text, query.value);

        res.redirect('/client/'+client);
    }
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});

function runQuery(query) {
    return new Promise(async (resolve, reject) => {
        try{
            const res = await pool.query(query);
            resolve(res);
        }catch(e){
            reject(e);
        }
    })
}
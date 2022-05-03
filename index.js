const app = require('express')();


// import routes

const account = require('./routes/account');
const creditCard = require('./routes/creditCard');


// use routes

app.use('/account/', account);
app.use('/creditcard/', creditCard);


// start server

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${ port }`));
const express = require('express')


const authRouter = require('./routers/auth');

const port = process.env.PORT || 3000
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());


app.use(express.static('public'))

app.use('/auth/', authRouter);

app.listen(port, () => console.log(`server now running on port: ${port}`));
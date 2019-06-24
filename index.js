const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');

const taskRoutes = require('./routes/tasks');

const app = express();

app.use(bodyParser.json());

app.use('/api/v1', userRoutes);

app.listen(4000, () => {
    // eslint-disable-next-line no-console
    console.log('Server listening on port 4000');
});

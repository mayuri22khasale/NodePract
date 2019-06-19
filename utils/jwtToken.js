const jwt = require('jsonwebtoken');

// const token = jwt.sign({ id: 'id' }, 'shhhhh');
const privateKey = '12345';

jwt.sign({ foo: 'bar' }, privateKey, (err, token) => {
    console.log(token);
});

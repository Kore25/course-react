const jwt = require('jsonwebtoken');
const SEED = process.env.SCRET_JWT_SEED;

const generateJwt = ( uid, name ) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };
    jwt.sign( payload, SEED, {
      expiresIn: '2h'
    }, (err, token) => {
      if( err ) {
        console.log(err);
        reject('Wrong token');
      }

      resolve(token);
    });
  });
}

const getDataJwt = ( token ) => {
  return new Promise ((resolve, reject) => {
    const { uid, name } = jwt.verify( token, SEED );
    resolve({ uid, name });
  });
}

module.exports = {
  generateJwt,
  getDataJwt,
}
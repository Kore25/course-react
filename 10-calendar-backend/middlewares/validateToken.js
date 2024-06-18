const { respone } = require('express');
const { getDataJwt } = require('../helpers/jwt');

const validateToken = async (req, res = respone, next) => {

  const token = req.header('x-token');
  if(!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Token not exists',
    });
  }
  try {
    const { uid, name } = await getDataJwt( token );
    req.uid = uid;
    req.name = name;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Not valid token',
    });
  }

}

module.exports = {
  validateToken
}
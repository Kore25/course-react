const { response } = require('express');// para recuperar las anotaciones de las propiedades
const bcrypt = require('bcryptjs');

const UserModel = require('../models/UserModel');
const { generateJwt } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {

    let user = await UserModel.findOne({ email });
    if ( user ) {
      return res.status(400).json({
        ok: false,
        msg: 'The email already exists',
      });
    }

    user = new UserModel( req.body );

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );

    await user.save();

    const token = await generateJwt( user.id, user.name );

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please contact with your administrador.'
    });
  }
}

const loginUser = async (req, res = response ) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if ( !user ) {
      return res.status(400).json({
        ok: false,
        msg: 'The user and password doesnt exists.',
      });
    }

    const validPassword = bcrypt.compareSync( password, user.password );
    if( !validPassword ) {
      return res.status(400).json({
        ok: false,
        msg: 'Wrong password',
      });
    }

    const token = await generateJwt( user.id, user.name );

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please contact with your administrador.'
    });
  }
}

const tokenUser = async (req, res = response ) => {

  const { uid, name } = req;
  const token = await generateJwt( uid, name );

  res.json({
    ok: true,
    uid,
    name,
    token
  });
}

module.exports = {
  createUser,
  loginUser,
  tokenUser,
}
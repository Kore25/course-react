const { response } = require('express');
const Event = require('../models/EventModel');

const getEvents = async ( req, res = response ) => {
  try {
    const events = await Event.find()
      .populate('user', 'name');
    return res.json({
      ok: true,
      events
    });
  } catch (error) {
    console.log( error );
    res.status(500).json({
      ok: false,
      msg: 'Contact with your admin',
    });
  }
}

const createEvent = async ( req, res = response ) => {
  try {
    const event = new Event( req.body );
    event.user = req.uid;
    const newEvent = await event.save();
    return res.json({
      ok: true,
      newEvent
    });
  } catch (error) {
    console.log( error );
    res.status(500).json({
      ok: false,
      msg: 'Contact with your admin',
    });
  }

}

const updateEvent = async ( req, res = response ) => {
  try {
    const eventId = req.params.id;
    const uid = req.uid;
    const event = await Event.findById( eventId );
    if ( !event ){
      return res.status(404).json({
        ok: false,
        msg: 'Event not exists',
      });
    }

    if ( event.user.toString() !== uid ) {
      return res.status(401).json({
        ok: false,
        msg: 'Hasnt permission to edit this event',
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    }

    const eventUpdated = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

    return res.json({
      ok: true,
      event: eventUpdated
    });

  } catch (error) {
    console.log( error );
    res.status(500).json({
      ok: false,
      msg: 'Contact with your admin',
    });
  }

}

const deleteEvent = async ( req, res = response ) => {
  try {
    const eventId = req.params.id;
    const uid = req.uid;
    const event = await Event.findById( eventId );
    if ( !event ){
      return res.status(404).json({
        ok: false,
        msg: 'Event not exists',
      });
    }

    if ( event.user.toString() !== uid ) {
      return res.status(401).json({
        ok: false,
        msg: 'Hasnt permission to delete this event',
      });
    }

    await Event.findByIdAndDelete( eventId );

    return res.json({
      ok: true
    });

  } catch (error) {
    console.log( error );
    res.status(500).json({
      ok: false,
      msg: 'Contact with your admin',
    });
  }
}

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
}
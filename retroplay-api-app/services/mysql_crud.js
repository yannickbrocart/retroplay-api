const connection = require('./mysql_connection');
const config = require('../mysql_config');

async function getAllEvents(){
    const events_list = await connection.query(
        'SELECT types.event_type_name, events.event_name, events.event_date, persons.person_firstname, persons.person_lastname, ' +
        'locations.location_name, states.event_state_type_name, events.event_topic ' +
        'FROM t7h0_events AS events ' +
        'INNER JOIN t7h0_events_types AS types ON events.event_type_id = types.event_type_id ' +
        'INNER JOIN t7h0_persons AS persons ON persons.person_id = events.event_manager_id ' +
        'INNER JOIN t7h0_locations AS locations ON locations.location_id = events.event_location_id ' +
        'INNER JOIN t7h0_events_states_types AS states ON states.event_state_type_id = events.event_state_id'
    );
    return events_list;
}

async function getAllPersons(){
    const persons_list = await connection.query(
        'SELECT persons.person_firstname, persons.person_lastname, persons.person_surname, persons.person_email, ' +
        'persons.person_phone, types.person_type_name, persons.person_instrument, persons.person_character_cosplay ' +
        'FROM t7h0_persons AS persons ' +
        'INNER JOIN t7h0_persons_types AS types ON persons.person_type_id = types.person_type_id'
    );
    return persons_list;
}

async function createEvent(newEvent){
    const result = await connection.query(
        'INSERT INTO t7h0_events (event_type_id, event_name, event_date, event_manager_id, ' +
        'event_location_id, event_state_id, event_topic) VALUES ' +
        '(${newEvent.event_type_id}, ${newEvent.event_name}, ${newEvent.event_date}, ${newEvent.event_manager_id}, ' +
        '${newEvent.event_location_id}, ${newEvent.event_state_id}, ${newEvent.event_topic})'
    );
    let message = 'Erreur dans l\'enregistrement du nouvel évènement !';
    if (result.affectedRows) {
        message = 'Nouvel évènement enregistré !';
    }
    return message;
}

async function updateEvent(id, event){
    const result = await connection.query(
        'UPDATE t7h0_events ' +
        'SET event_type_id=event.event_type_id, event_name=event.event_name, event_date=event.event_date, ' +
        'event_manager_id=event.event_manager_id, event_location_id=event.event_location_id, ' +
        'event_state_id=event.event_state_id, event_topic=event.event_topic ' +
        'WHERE event_id = ${id}'
    );
    let message = 'Erreur dans la mise à jour de l\'évènement !';
    if (result.affectedRows) {
        message = 'Évènement mis à jour !';
    }
    return message;
}

module.exports = {
    getAllEvents,
    getAllPersons,
    createEvent,
    updateEvent
}
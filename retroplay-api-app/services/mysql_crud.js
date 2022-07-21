const connection = require('./mysql_connection');
const config = require('../mysql_config');

async function getEventById(id){
    const event = await connection.query(
        `SELECT events.event_id, types.event_type_name, events.event_name, events.event_date, persons.person_firstname, persons.person_lastname, ` +
        `locations.location_name, states.event_state_type_name, events.event_topic ` +
        `FROM t7h0_events AS events ` +
        `INNER JOIN t7h0_events_types AS types ON events.event_type_id = types.event_type_id ` +
        `INNER JOIN t7h0_persons AS persons ON persons.person_id = events.event_manager_id ` +
        `INNER JOIN t7h0_locations AS locations ON locations.location_id = events.event_location_id ` +
        `INNER JOIN t7h0_events_states_types AS states ON states.event_state_type_id = events.event_state_id ` +
        `WHERE events.event_id = ${id}`
    );
    return event;
}

async function getAllEvents(){
    const events_list = await connection.query(
        `SELECT events.event_id, types.event_type_name, events.event_name, events.event_date, persons.person_firstname, persons.person_lastname, ` +
        `locations.location_name, states.event_state_type_name, events.event_topic ` +
        `FROM t7h0_events AS events ` +
        `INNER JOIN t7h0_events_types AS types ON events.event_type_id = types.event_type_id ` +
        `INNER JOIN t7h0_persons AS persons ON persons.person_id = events.event_manager_id ` +
        `INNER JOIN t7h0_locations AS locations ON locations.location_id = events.event_location_id ` +
        `INNER JOIN t7h0_events_states_types AS states ON states.event_state_type_id = events.event_state_id`
    );
    return events_list;
}

async function createEvent(newEvent){
    const result = await connection.query(
        `INSERT INTO t7h0_events ` +
        `(event_type_id, event_name, event_date, event_manager_id, event_location_id, event_state_id, event_topic) VALUES ` +
        `('${newEvent.event_type_id}', '${newEvent.event_name}', '${newEvent.event_date}', '${newEvent.event_manager_id}', ` +
        `'${newEvent.event_location_id}', '${newEvent.event_state_id}', '${newEvent.event_topic}')`
    );
    let message = `Erreur dans l\'enregistrement du nouvel évènement !`;
    if (result.affectedRows) {
        message = 'Nouvel évènement enregistré !';
    }
    return message;
}

async function updateEvent(id, event){
    const resultUpdate = await connection.query(
        `UPDATE t7h0_events ` +
        `SET event_type_id='${event.event_type_id}', event_name='${event.event_name}', event_date='${event.event_date}', ` +
        `event_manager_id='${event.event_manager_id}', event_location_id='${event.event_location_id}', ` +
        `event_state_id='${event.event_state_id}', event_topic='${event.event_topic}' ` +
        `WHERE event_id = ${id}`
    );
    let message = 'Erreur dans la mise à jour de l\'évènement !';
    if (resultUpdate.affectedRows) {
        message = 'Évènement mis à jour !';
    }
    return message;
}

async function deleteEvent(id){
    const resultDelete = await connection.query(
        `DELETE FROM t7h0_events WHERE event_id = ${id}`
    );
    let message = 'Erreur dans la suppression de l\'évènement !';
    if (resultDelete.affectedRows) {
        message = 'Évènement supprimé !';
    }
    return message;
}

async function deleteAllEvents(id){
    const resultDelete = await connection.query(
        `DELETE FROM t7h0_events`
    );
    let message = 'Erreur dans la suppression des évènements !';
    if (resultDelete.affectedRows) {
        message = 'Évènements supprimés !';
    }
    return message;
}
module.exports = {
    getEventById,
    getAllEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    deleteAllEvents
}
export default class Event {
    event_id;
    event_name;
    event_date;
    event_manager;
    event_location;
    event_state_id;
    constructor(event_id, event_name, event_date, event_manager, event_location, event_state_id) {
        this.event_id = event_id;
        this.event_name = event_name;
        this.event_date = event_date;
        this.event_manager = event_manager;
        this.event_location = event_location;
        this.event_state_id = event_state_id;
    }
}

export default class Concert extends Event {
    concert_participants = [];
    constructor(event_id, event_name, event_date, event_manager, event_location, event_state_id, concert_participants) {
        super(event_id, event_name, event_date, event_manager, event_location, event_state_id);
        this.concert_participants = concert_participants;
    }
}

export default class Contest extends Event {
    contest_participants = [];
    contest_ranking = [];
    contest_gifts = [];
    constructor(event_id, event_name, event_date, event_manager, event_location, event_state_id, contest_participants, contest_ranking, contest_gifts) {
        super(event_id, event_name, event_date, event_manager, event_location, event_state_id);
        this.contest_participants = contest_participants;
        this.contest_ranking = contest_ranking;
        this.contest_gifts = contest_gifts;
    }
}

export default class Conference extends Event {
    conference_participants = [];
    constructor(event_id, event_name, event_date, event_manager, event_location, event_state_id, conference_participants) {
        super(event_id, event_name, event_date, event_manager, event_location, event_state_id);
        this.conference_participants = conference_participants;
    }
}

class Location{
    location_id;
    location_name;
    location_capacity;
    constructor(location_id, location_name, location_capacity) {
        this.location_id = location_id;
        this.location_name = location_name;
        this.location_capacity = location_capacity;
    }
}

class Gift{
    gift_id;
    gift_event_id;
    gift_name;
    gift_event_place;
    constructor(gift_id, gift_event_id, gift_name, gift_event_place) {
        this.gift_id = gift_id;
        this.gift_event_id = gift_event_id;
        this.gift_name = gift_name;
        this.gift_event_place = gift_event_place;
    }
}

class Ranking{
    ranking_id;
    ranking_person_id;
    ranking_place;
    ranking_score;
    constructor(ranking_id, ranking_person_id, ranking_place, ranking_score) {
        this.ranking_id = ranking_id;
        this.ranking_person_id = ranking_person_id;
        this.ranking_place = ranking_place;
        this.ranking_score = ranking_score;
    }
}

class Person{
    person_id;
    person_lastname;
    person_firstname;
    person_surname;
    person_email;
    person_phone;
    constructor(person_id, person_lastname, person_firstname, person_surname, person_email, person_phone) {
        this.person_id = person_id;
        this.person_lastname = person_lastname;
        this.person_firstname = person_firstname;
        this.person_surname = person_surname;
        this.person_email= person_email;
        this.person_phone = person_phone;
    }
}

class Musician extends Person {
    person_instrument;
    constructor(person_id, person_lastname, person_firstname, person_surname, person_email, person_phone, person_instrument) {
        super(person_id, person_lastname, person_firstname, person_surname, person_email, person_phone);
        this.person_instrument = person_instrument;
    }
}

class Cosplayer extends Person {
    person_character_cosplay;
    constructor(person_id, person_lastname, person_firstname, person_surname, person_email, person_phone, person_character_cosplay) {
        super(person_id, person_lastname, person_firstname, person_surname, person_email, person_phone);
        this.person_character_cosplay = person_character_cosplay;
    }
}

class Gamer extends Person {
    constructor(person_id, person_lastname, person_firstname, person_surname, person_email, person_phone) {
        super(person_id, person_lastname, person_firstname, person_surname, person_email, person_phone);
    }
}

class Public extends Person {
    constructor(person_id, person_lastname, person_firstname, person_surname, person_email, person_phone) {
        super(person_id, person_lastname, person_firstname, person_surname, person_email, person_phone);
    }
}

class Team{
    team_id;
    team_type_id;
    team_name;
    team_biography;
    team_persons = [];
    constructor(team_id, team_type_id, team_name, team_biography, team_persons) {
        this.team_id = team_id;
        this.team_type_id = team_type_id;
        this.team_name = team_name;
        this.team_biography = team_biography;
        this.team_persons = team_persons;
    }
}
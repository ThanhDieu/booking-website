import moment from "moment"

const defaultDateFetchAll = {
    arrival: moment().clone().add(24, 'hours').unix(),
    departure: moment().clone().add(4, 'weeks').unix(),
}

const defaultDaysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

const defaultParamsSearch = {
    adults: 1,
    children: 0,
    rooms: 1,
}



export {
    defaultDateFetchAll,
    defaultDaysOfWeek,
    defaultParamsSearch
}
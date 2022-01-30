//const SERVER = "http://localhost:5150/project1"; // development
const SERVER = "/project1"; // production
module.exports = {
    COUNTRIESURL: `${SERVER}/countries`,
    ALERTSETUPURL: `${SERVER}/alertsetup`,
    ADDADVISORYURL: `${SERVER}/advisory`,
    ADVISORYBYNAMEURL: `${SERVER}/advisory/`,
    UNIQUENAMESURL: `${SERVER}/advisory/unique/names`
};
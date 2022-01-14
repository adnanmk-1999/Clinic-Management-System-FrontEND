function getDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today
}

function childLabour(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var yyyy18 = yyyy - '18'
    var validDate = yyyy18 + '-' + mm + '-' + dd;

    return validDate
}
 
var dates = {
    getDate : getDate,
    childLabour : childLabour
}

module.exports = dates;
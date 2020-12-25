const moment = require('moment');

const isDate = ( value ) => {

    const fecha = moment(value);
    if(fecha.isValid()){
        return true;
    }else{
        return false;
    }

}

module.exports = {
    isDate
}
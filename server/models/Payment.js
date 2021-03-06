const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = mongoose.Schema({
    user : {
        type : Array,
        defualt : [],
    },
    data : {
        type : Array,
        default : [],
    },
    product : {
        type : Array,
        defualt : [],
    }

}, { timestamps : true })

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = { Payment }
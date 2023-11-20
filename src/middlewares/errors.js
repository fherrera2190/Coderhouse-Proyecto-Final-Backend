const EErrors = require('../utils/CustomErrors/EErrors')

function errorHandler(error, req, res, next){

    switch (error.code) {
        case EErrors.INVALID_TYPE_ERROR: 
            res.status(400).send({status: "error", error: error.message});
            break;
        default: 
            res.status(500).send({status: "error", error: "Unhandled error!"});
    }
};

module.exports = errorHandler
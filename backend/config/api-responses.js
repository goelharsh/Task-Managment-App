exports.successResponse = (res, msg) => {
    var data = {
        status: 1,
        message: msg
    };
    return res.status(200).json(data);
}
exports.actionResponseWithData = (res, msg, data) => {
    var data = {
        status: 2,
        message: msg,
        data: data
    };
    return res.status(200).json(data);
}

exports.successResponseWithData = (res, msg, data) => {
    var data = {
        status: 1,
        message: msg,
        data: data
    };
    return res.status(200).json(data);
}
exports.successResponseWithDataExtra = (res, msg, data, list) => {
    var data = {
        status: 1,
        message: msg,
        data: data,
        toolsList: list
    };
    return res.status(200).json(data);
}

exports.errorResponse = (res, msg) => {
    var data = {
        status: 0,
        message: msg
    };
    return res.status(200).json(data);
}


exports.notVerifiedErrorRespose = (res, msg) => {
    var data = {
        status: 0,
        message: msg
    };
    return res.status(200).json(data);
}


exports.emailErrorRespose = (res, msg) => {
    var data = {
        status: 0,
        message: msg
    };
    return res.status(200).json(data);
}

exports.emailErrorResposeWithData = (res, msg, data) => {
    var data = {
        status: 0,
        message: msg,
        data: data
    };
    return res.status(200).json(data);
}

exports.errorResposeWithData = (res, msg, data) => {
    var data = {
        status: 0,
        message: msg,
        data: data
    };
    return res.status(200).json(data);
}

exports.validationError = (res, msg) => {
    var data = {
        status: 0,
        // 422
        message: msg
    };
    return res.status(200).json(data);
}

exports.validationErrorWithData = (res, msg, data) => {
    var data = {
        status: 0,
        // 422
        message: msg,
        data: data
    };
    return res.status(200).json(data);
}

exports.catchErrorResponse = (res, msg) => {
    var data = {
        status: 0,
        message: msg,
    };

    res.status(200).json(data);
    return;
}

exports.unAuthorizedResponse = (res, msg) => {
    var data = {
        status: 10,
        // 401
        message: msg,
    };
    return res.status(200).json(data);
}

exports.noRecordFoundResponse = (res, msg) => {
    var data = {
        status: 404,
        message: msg,
    };
    return res.status(404).json(data);
}


exports.successResposeWithExtraData = (res, msg, data) => {
    var data = {
        status: 1,
        message: msg,
        data: data
    };
    return res.status(200).json(data);
}

exports.successResposeWithExtraData2 = (res, msg, data, userDetails, extraData) => {
    var data = {
        status: 200,
        message: msg,
        data: data,
        userDetails: userDetails,
        extraData: extraData
    };
    return res.status(200).json(data);
}

exports.successResposeWithMany = (res, msg, data1, data2, data3, data4) => {
    var data = {
        status: 200,
        message: msg,
        totalUserCount: data1,
        totalProfileCount: data2,
        totalCategoryCount: data3,
        totalDeactiveProfileCount: data4
    };
    return res.status(200).json(data);
}

exports.logoutFromAppResponse = (res, msg) => {
    var data = {
        status: 200,
        message: msg,
    };
    return res.status(200).json(data);
}
exports.logMessage = (message, type = 'log') => {
    switch (type) {
        case 'log':
            console.log(message);
            break;
        case 'warn':
            console.warn(message);
            break;
        case 'error':
            console.error(message);
            break;
        case 'alert':
            alert(message);
            break;
        default:
            console.log(message);
    }
};
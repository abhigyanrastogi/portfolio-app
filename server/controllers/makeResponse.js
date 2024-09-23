const makeResponse = (res, message, status, data=null) => {
    const payload = {
        message: message,
        status: `${status?'Accepted':'Denied'}`,
        data: data
    }
    res.status(200).json(payload);
    return res;
}

module.exports = makeResponse;
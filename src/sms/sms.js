var request = require("request");

const sendsms = async (number, randomCode) => {
    request({ method: 'POST',
    url: 'https://api.ghasedak.io/v2/verification/send/simple',
    headers:
    {
        'cache-control': 'no-cache',
        apikey: 'f4104ff119eda6940bee565bfad209daffa034baabdd39251ebc66db09605b16',
        'content-type': 'application/x-www-form-urlencoded' },
    form:
    {
        receptor: number,
        template: 'verification',
        type: '1',
        param1: randomCode
    }
    }, function (error, response, body) {
        if (error) throw new Error(error)
        })
}

module.exports = sendsms

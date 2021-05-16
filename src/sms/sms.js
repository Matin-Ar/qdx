var request = require("request");

const sendsms = async (number) => {
    request({ method: 'POST',
    url: 'https://api.ghasedak.io/v2/sms/send/simple',
    headers:
    {
        'cache-control': 'no-cache',
        apikey: 'f4104ff119eda6940bee565bfad209daffa034baabdd39251ebc66db09605b16',
        'content-type': 'application/x-www-form-urlencoded' },
    form:
    {
        message: 'کد فعال سازی حساب کاربری: 1234',
        receptor: number,
        linenumber: '10008566'
    }
    }, function (error, response, body) {
        if (error) throw new Error(error)
            console.log(body)
        })
}

module.exports = sendsms
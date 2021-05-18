const adminAuth = async (req, res, next) => {
    try {
        if(req.user.role != 'Admin'){
            throw new Error()
        }
        next()
    } catch (e) {
        res.status(401).send({ error: 'You have to be admin !' })
    }
}

module.exports = adminAuth
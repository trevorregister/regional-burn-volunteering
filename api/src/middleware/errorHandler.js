module.exports = function returnError (err, req, res, next) {
    console.log(err.code || 500, err)
    res.status(err.code || 500).send(err)
   }
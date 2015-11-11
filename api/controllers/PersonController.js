
module.exports = {
  list: list,
};

function list(req, res) {
    sails.log("running list...");
    Person.find({}, function (err, results){
        res.json(results);
    });
};
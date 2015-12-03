
module.exports = {
  list: list,
};

function list(req, res) {
    sails.log("running list of Vips...");
    var crit = {};
    if (req.swagger.params.name.value)
        crit = {name: req.swagger.params.name.value}
    Person.find(crit, function (err, results){
        res.json(results);
    });
};
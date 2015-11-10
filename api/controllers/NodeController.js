/**
 * NodeController
 *
 * @description :: Server-side logic for managing nodes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  list: function (req, res) {
    Node.find().exec(function (err, nodes){
        res.json(nodes);
    });
  },
};


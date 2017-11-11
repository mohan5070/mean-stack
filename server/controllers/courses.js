var Course = require('mongoose').model('Course');

exports.getCourses = function(req, res) {
  Course.find({}).exec(function(err, collection) {
    res.send(collection);
  })
};

exports.getCoursesById = function(req, res) {
  debugger;
  Course.findOne({_id:req.params.id}).exec(function(err, course) {
    debugger;
    res.send(course);
  })
};
//course model

var mongoose = require('mongoose')
var courseSchema = require('./schemas/course')
var Course = mongoose.model('Course', courseSchema);


module.exports = Course;

//计算course总数
//fn:计算完总数后执行的回调函数，目前是供分页中间件调用
Course.counter = function(fn){
  Course.count({}, fn);
};

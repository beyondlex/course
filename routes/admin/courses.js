//import course model
var Course = require('../../lib/course');


exports.list = function(req, res, next) {

	var page = req.page;
	console.log(page);
	Course
	.find({})
	.skip(page.from)
	.limit(page.perpage)
	.exec(function(err, courses) {
		if (err) {
			console.log(err);
			return handleError(err);
		}
		console.log('course list page');
		res.locals.courses = courses;
		res.render('admin/course/list', {'title': '课程列表'} );
	});

	// Course.find({}, function(err, courses) {
	// 	if (err) {
	// 		console.log(err);
	// 		return handleError(err);
	// 	}
	// 	console.log('course list page');
	// 	res.locals.courses = courses;
	// 	res.render('admin/course/list', {'title': '课程列表'} );
	// });

	
};

exports.form = function(req, res) {
	console.log('course form page');
	res.render('admin/course/form', {'title': 'add course'});
};

exports.submit = function(req, res, next) {
	console.log('course submit')

	var data = req.body.course;

	console.log(req.body);

	var course = new Course({
		name: data.name, 
	});
	
	course.save(function(err, course) {
		console.log('course saved');
		console.log(course);
		res.redirect('/admin/courses')
	});
};

exports.edit = function(req, res, next) {
	var id = req.params.id;
	if (id) {
		Course.findOne({_id: id}, function(err, course) {
			if (err) return handleError(err);
			res.locals.course = course;
			res.render('admin/course/edit', {'title': 'course edit'});
		});
		
	}
};

exports.update = function(req, res, next) {
	var data = req.body.course;
	var id = data.id;
	if (id) {
		Course.findOne({_id: id}, function(err, course) {
			if (err) return handleError(err);
			if (course) {
				var _ = require('underscore');
				course = _.extend(course, {
					name: data.name
				});

				course.save(function(err, course) {
					if (err) return handleError(err);
					res.redirect('/admin/courses')
				});
			}
		});
	}
};

exports.del = function(req, res, next) {
	console.log('course delete');
	var id = req.params.id;
	if (id) {
	
		Course.remove({ _id: id }, function(err, course) {
			if (err) {
				console.log(err);
				return handleError(err);
			}
			res.json({success:1});
		});
	}
};





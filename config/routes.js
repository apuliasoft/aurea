module.exports = function(app, passport, auth) {
    //User Routes
    /*var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);

    //Setting up the users api
    app.post('/users', users.create);

    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: 'Invalid email or password.'
    }), users.session);

    app.get('/users/me', users.me);

    //Finish with setting up the userId param
    app.param('userId', users.user);

    //Article Routes
    var articles = require('../app/controllers/articles');
    app.get('/articles', articles.all);
    app.post('/articles', auth.requiresLogin, articles.create);
    app.get('/articles/:articleId', articles.show);
    app.put('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.update);
    app.del('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.destroy);

    //Finish with setting up the articleId param
    app.param('articleId', articles.article);*/

    //School Routes
    var school = require('../app/controllers/school');
    app.get('/school', school.all);
    app.get('/school/:schoolId', school.show);
    app.post('/school', school.create);
    app.put('/school/:schoolId', school.update);
    app.del('/school/:id', school.delete);

    //Finish with setting up the schoolId param
    app.param('schoolId', school.school);

    //Teacher Routes
    var teacher = require('../app/controllers/teacher');
    app.get('/teacher', teacher.all);
    app.get('/teacher/:teacherId', teacher.show);
    app.post('/teacher', teacher.create);
    app.put('/teacher/:teacherId', teacher.update);
    app.del('/teacher/:id', teacher.delete);

    //Finish with setting up the teacherId param
    app.param('teacherId', teacher.teacher);

    //Student Routes
    var student = require('../app/controllers/student');
    app.get('/student', student.all);
    app.get('/student/:studentId', student.show);
    app.post('/student', student.create);
    app.put('/student/:studentId', student.update);
    app.del('/student/:id', student.delete);

    //Finish with setting up the studentId param
    app.param('studentId', student.student);

    //Academic Year Routes
    var academicYear = require('../app/controllers/academicYear');
    app.get('/academicYear', academicYear.all);
    app.get('/academicYear/:academicYearId', academicYear.show);
    app.post('/academicYear', academicYear.create);
    app.put('/academicYear/:academicYearId', academicYear.update);
    app.del('/academicYear/:id', academicYear.delete);

    //Finish with setting up the academicYearId param
    app.param('academicYearId', academicYear.academicYear);


    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

};

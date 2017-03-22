/*global require, module*/
var ApiBuilder = require('claudia-api-builder'),
    api = new ApiBuilder(),
    fs = require('fs'),
    superb = require('superb'),
    denodeify = require('denodeify')
    MongoClient = require('mongodb').MongoClient,
    //express = require('express'),
        url = 'mongodb://localhost:27017/mydb',
    //   api = express();
    module.exports = api;


api.get('/hello', function () {
    'use strict';
    return '<html>hello world</html>';
});

api.get('/echo', function (request) {
    'use strict';
    return request;
});

// use request.queryString for query arguments
api.get('/greet', function (request) {
    'use strict';
    return request.queryString.name + ' is ' + superb();
});

// use {} for dynamic path parameters
api.get('/people/{name}', function (request) {
    'use strict';
    return request.pathParams.name + ' is ' + superb();
});

// Return a promise for async processing
api.get('/fullName', function () {
    'use strict';
    return "Bhaskar Mannava"
});

// use .post to handle a post; or .delete, .patch, .head, .put
api.post('/echo', function (request) {
    'use strict';
    return request;
});

api.get('/connection',function(request){
    MongoClient.connect(url, function (err, db) {
        if (err) {
            return console.dir(err);
        }

        db.collection('test').find().toArray(function (err, results) {
            console.log(results);
        })

    });
});

api.get('/start.html', function () {
    'use strict';
    return '<ul>' +
        '<li><a href="search?name=mike">Valid search</a></li>' +
        '<li><a href="search">Invalid search (will return 403)</a></li>' +
        '<li><a href="redirect">Redirect to GitHub</a></li>' +
        '</ul>';
}, { success: { contentType: 'text/html'}});


// to test on local machine.
/*
api.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});*/

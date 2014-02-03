grunt-mocha-html
================

generate html for mocha browser test.


## sample Gruntfile

```javascript:Gruntfile.js
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        mocha_html: {
            all: {
                src   : [ 'js/lib/*.js', 'js/*.js' ],
                test  : [ 'test/*-test.js' ],
                assert : 'chai',
                checkLeaks : false,
                template: 'path/to/custom/template.html.ejs',
                html: 'path/to/output/html.html'
            }
        },
        mocha_phantomjs: {
            all: ['test/*.html']
        }
    });

    grunt.loadNpmTasks('grunt-mocha-phantomjs');
    grunt.loadNpmTasks('grunt-mocha-html');

    grunt.registerTask('test', ['mocha_html', 'mocha_phantomjs']);
    grunt.registerTask('default', ['test']);
};
```

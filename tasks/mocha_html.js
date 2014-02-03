'use strict';

module.exports = function (grunt) {
    var path = require('path'),
        ejs  = require('ejs');

    var _ = grunt.util._;

    var taskName        = 'mocha_html',
        taskDescription = 'generate html for mocha browser test.',
        taskDir         = 'node_modules/grunt-mocha-html';

    grunt.file.defaultEncoding = 'utf8';

    grunt.registerMultiTask(taskName, taskDescription, function () {
        var target = this.target,
            template,
            config = grunt.config(taskName)[target],

            checkLeaks = config.checkLeaks !== false,

            autoClean = config.autoClean || false,

            htmlPath = config.html || 'test/' + target + '.html',
            dirname  = path.dirname(htmlPath),

            assert     = config.assert || 'assert',
            assertPath = 'node_modules/' + assert + '/' + assert + '.js',

            srcPaths = config.src.length ? _.flatten(_.map(
                config.src, function (pattern) {
                    return grunt.file.expand(pattern);
                }
            )) : [],

            testPaths = config.test.length ? _.flatten(_.map(
                config.test, function (pattern) {
                    return grunt.file.expand(pattern);
                }
            )) : [];

        if (config.template && !grunt.file.exists(config.template)) {
            throw new Error('invalid template path.');
        }
        template = grunt.file.read(config.template || path.join(taskDir, '/template/runner.html.ejs'));

        if (!htmlPath) {
            throw new Error('invalid html path.');
        }
        if (!grunt.file.exists(assertPath)) {
            throw new Error('assert module is not found. [' + assertPath + ']');
        }

        var html = ejs.render(template, {
            title      : config.title || target,
            checkLeaks : checkLeaks,
            cssPath    : path.relative(dirname, 'node_modules/mocha/mocha.css'),
            mochaPath  : path.relative(dirname, 'node_modules/mocha/mocha.js'),
            assertPath : path.relative(dirname, assertPath),
            srcPaths   : _.map(srcPaths, function (srcPath) {
                return path.relative(dirname, srcPath);
            }),
            testPaths   : _.map(testPaths, function (testPath) {
                return path.relative(dirname, testPath);
            })
        });

        grunt.file.write(htmlPath, html);

        if (autoClean) {
            grunt.file.write(htmlPath);
        }
    });
};

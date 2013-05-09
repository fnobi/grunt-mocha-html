module.exports = function (grunt) {
    grunt.registerMultiTask(
        'mocha_html',
        'generate html for mocha browser test.',
        function () {
            var target = this.target;
            var done = this.async();

            var koko = new Koko(process.cwd(), grunt.config('koko')[target]);
            koko.start();
        }
    );
};
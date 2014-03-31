module.exports = function (grunt) {
    var bannerTemplate = '' +
        '// <%= pkg.name %> version <%= pkg.version %>\n' +
        '// <%= pkg.repository.url %>\n' +
        '// (<%= pkg.license %>) <%= grunt.template.today("dd-mm-yyyy") %>\n' +
        '// <%= pkg.author %>\n';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        preprocess : {
            options: {
                context : {
                    DEBUG: true
                }
            },
            test : {
                src : 'test/index.pre.html',
                dest : 'test/index.html'
            },
            index: {
                src: 'index.pre.html',
                dest: 'index.html'
            }
        },

        // concat: {
        //     options: {
        //         separator: '\n',
        //         banner: bannerTemplate
        //     },
        //     dist: {
        //         src: [
        //             'src/intro.js',

        //             'src/outro.js'
        //         ],
        //         dest: '<%= pkg.name %>.js'
        //     }
        // },

        // uglify: {
        //     options: { banner: bannerTemplate },
        //     dist: {
        //         files: { '<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>'] }
        //     }
        // },

        qunit: {
            all: ['test/index.html']
        },

        watch: {
            scripts: {
                files: ['**/*'],
                tasks: ['preprocess', 'qunit'],
                options: { spawn: true }
            }
        }

    });

    grunt.loadNpmTasks('grunt-preprocess');
    // grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('default', ['preprocess', 'qunit']);
};

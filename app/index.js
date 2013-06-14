'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
 

var MoGenerator = module.exports = function MoGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(MoGenerator, yeoman.generators.Base);

MoGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'projectName',
    message: 'Would you like to name your project?'
  }];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;

    cb();
  }.bind(this));
};

MoGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');
  this.mkdir('app/css');
  this.mkdir('app/css/sass');
  this.mkdir('app/img');
  this.mkdir('app/js');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

MoGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};

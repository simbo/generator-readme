const Generator = require('yeoman-generator');
const mergeOptions = require('merge-options');
const path = require('path');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('generateInto', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Relocate the location of the generated files.'
    });

    this.option('projectName', {
      type: String,
      required: false,
      desc: 'Project name'
    });

    this.option('projectDescription', {
      type: String,
      required: false,
      desc: 'Project description'
    });

    this.option('authorName', {
      type: String,
      required: false,
      desc: 'Author’s name'
    });

    this.option('license', {
      type: String,
      required: false,
      desc: 'License'
    });

    this.option('licenseYear', {
      type: String,
      required: false,
      desc: 'License year'
    });

    this.option('content', {
      type: String,
      required: false,
      desc: 'Content'
    })

    this.option('toc', {
      type: String,
      required: false,
      desc: 'Table of contents'
    });

  }

  initializing() {
    this.props = {
      projectName: this.options.projectName,
      projectDescription: this.options.projectDescription,
      authorName: this.options.authorName,
      license: this.options.license,
      licenseYear: this.options.licenseYear,
      content: this.options.content,
      toc: this.options.toc
    };
  }

  async prompting() {
    const prompts = [{
        name: 'projectName',
        message: 'Project name',
        when: () => !this.props.projectName,
        default: () => this.options.env.cwd.split(path.sep).pop(),
      },
      {
        name: 'projectDescription',
        message: 'Project description',
        when: () => !this.props.projectDescription,
        default: 'This project is awesome!'
      },
      {
        name: 'authorName',
        message: 'Author’s name',
        when: () => !this.props.authorName,
        default: () => this.user.git.name()
      },
      {
        name: 'license',
        message: 'License',
        when: () => !this.props.license,
        default: () => 'MIT'
      },
      {
        name: 'licenseYear',
        message: 'License year',
        when: () => !this.props.licenseYear,
        default: () => (new Date()).getFullYear()
      }
    ];

    for (let prompt of prompts) {
      this.props = mergeOptions(this.props, await this.prompt(prompt));
    }
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath(this.options.generateInto, 'README.md'),
      this.props
    );
  }
};

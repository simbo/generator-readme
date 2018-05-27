const fs = require('fs');
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const testApp = () =>
  helpers.run(require.resolve('../generators/app')).withPrompts({
    projectName: 'foo',
    projectDescription: 'bar',
    authorName: 'baz',
    license: 'MIT',
    licenseYear: '2018'
  });

describe('generator-readme:app', () => {
  it('creates `README.md`', () =>
    testApp().then(() => {
      assert.fileContent(
        'README.md',
        fs.readFileSync(path.join(__dirname, 'fixtures', 'README.md'), 'utf8').toString()
      );
    }));

  describe('with option `content`', () => {
    it('creates `README.md` without content', () =>
      testApp()
        .withOptions({
          content: false
        })
        .then(() => {
          assert.noFileContent('README.md', '## About');
        }));

    it('creates `README.md` with custom content', () =>
      testApp()
        .withOptions({
          content: 'my custom content'
        })
        .then(() => {
          assert.noFileContent('README.md', '## About');
          assert.fileContent('README.md', 'my custom content');
        }));
  });

  describe('with option `toc`', () => {
    it('creates `README.md` without table of contents', () =>
      testApp()
        .withOptions({
          toc: false
        })
        .then(() => {
          assert.noFileContent('README.md', '<!-- TOC');
        }));

    it('creates `README.md` with custom table of contents', () =>
      testApp()
        .withOptions({
          toc: 'my custom toc'
        })
        .then(() => {
          assert.noFileContent('README.md', '<!-- TOC');
          assert.fileContent('README.md', 'my custom toc');
        }));
  });

  describe('with option `generateInto`', () => {
    it('creates `README.md` in desired path', () =>
      testApp()
        .withOptions({
          generateInto: 'foo'
        })
        .then(() => {
          assert.file(['foo/README.md']);
        }));
  });
});

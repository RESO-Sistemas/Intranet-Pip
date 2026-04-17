require('@syncfusion/ej2-build-test');

'use strict';
var common = require('@syncfusion/ej2-build-test/src/utils/common.js');
var gulp = require('gulp');
var isCompiled = true;
gulp.task('styles', function(done) {
  console.log(`Starting 'ci-compile'`);
  var gutil = require('gulp-util');
  const sass = require('gulp-sass')(require('sass'));
  var autoPrefixer = require('gulp-autoprefixer');
  return gulp
    .src('./styles/*.scss')
    .pipe(
      sass({
        outputStyle: 'expanded'
      }).on('error', function(error) {
        isCompiled = false;
        gutil.log(
          new gutil.PluginError('sass', error.messageFormatted).toString()
        );
        this.emit('end');
      })
    )
    .pipe(autoPrefixer({ browsers: ['last 2 versions', 'ie >= 11'] }))
    .pipe(gulp.dest('./styles/'))
    .on('end', function() {
      if (!isCompiled) {
        process.exit(1);
      }
      console.log(`Finished 'ci-compile'`);
      done();
    });
});

gulp.task('ci-publish', function(done) {
  var publish = common.isMasterBranch || common.isReleaseBranch || common.isHotfixBranch ? 'publish-production' : 'publish';
  var registry;
  if (common.isRemoteServer) {
    registry = common.isMasterBranch ? 'production-registry' : 'dev-registry';
    registry = (common.isReleaseBranch || common.isHotfixBranch) ? 'release-registry' : registry;
  } else {
    registry = common.isMasterBranch ? 'local-production-registry' : 'local-dev-registry';
  }
  runSequence(publish, registry, 'publish-resources', 'umd-deploy', 'publish-icons', 'publish-themes', done);
});


gulp.task('publish-icons', function(done) {
  var cdn = require('@syncfusion/ej2-build-test/src/publish/cdn.js');
  var gzip = require('gulp-gzip');
  var ispublic = (common.isReleaseBranch || common.isHotfixBranch) ? true : false;
  var location = common.isMasterBranch ? 'packages/production/icons/' : 'packages/development/icons';
  location = (common.isReleaseBranch || common.isHotfixBranch) ? 'products/icons/' : location;
  gulp.src(['./resources/**/*.{html,css}'])
    .pipe(gzip({ append: false }))
    .pipe(gulp.dest('./icons-samples'))
    .on('end', function() {
      cdn.publish('./icons-samples', ispublic, location, done);
    })
    .on('error', function(e) {
      done(e);
    });
});

// Publish the icons to theme studio repo
gulp.task('publish-themes', function (done) {
  // clone components repository  
  var user = 'SyncfusionAutomation';
  var token = process.env.GiteaBuildAutomation_Autocommit_PrivateToken;
  var ej2Repo = 'https://' + user + ':' + token + '@gitea.syncfusion.com/essential-studio/ej2-theme-studio.git';
  var branchName = process.env.githubSourceBranch;
  simpleGit().clone(ej2Repo, './themestudio', function (err) {
    if (err) {
      done(err);
      return;
    }
  }).exec(function () {
    simpleGit('./themestudio').checkout(branchName, function (err) {
      if (err) {
        done(err);
        return;
      }
      shelljs.cp('-r', `./styles/*.scss`, `./themestudio/styles/icons`);
      // get commit message
      simpleGit('./themestudio').init()
        .add('./*')
        .commit('Latest icon changes published')
        .pull(branchName)
        .push(ej2Repo, branchName, function () {
          console.log('icons updated in themestudio');
          done();
        });
    });
  });
});

function checkout() {
  // clone components repository  
  var user = 'SyncfusionAutomation';
  var token = process.env.GiteaBuildAutomation_Autocommit_PrivateToken;
  var ej2Repo = 'https://' + user + ':' + token + '@gitea.syncfusion.com/essential-studio/ej2-theme-studio.git';
  simpleGit().clone(ej2Repo, './themestudio', function (err) {
    if (err) {
      done(err);
      return;
    }
  }).exec(function () {
    simpleGit('./themestudio').checkout(branchName, function (err) {
      if (err) {
        done(err);
        return;
      }
      shelljs.cp('-r', `./styles/*`, `./themestudio/styles/icons`);
      // get commit message
      simpleGit('./themestudio').init()
        .add('./*')
        .commit('Latest icon changes published')
        .pull(branchName)
        .push(ej2Repo, branchName, function () {
          console.log('icons updated in themestudio');
          done();
        });
    });
  });
}

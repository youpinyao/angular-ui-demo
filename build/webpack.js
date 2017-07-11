const type = process.argv[2];
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const util = require('./util/util.js');
const config = require('./config/config.js');
const zip = require('./util/zip.js');
const opn = require('opn');

const clearConsole = require('./util/clearConsole.js');

const configs = {
  build: require('./build.config.js'),
  dev: require('./dev.config.js'),
  dll: require('./dll.config.js'),
};

let webpackConfig = configs[type];

let isFirst = true;

switch (type) {
  case 'dll':

    util.delDll();
    webpack(webpackConfig()).run((err, stats) => {
      if (runCallback(err, stats)) {
        console.log(chalk.green('\r\nbuild dll complete \r\n'));
      }
    });

    break;
  case 'build':

    util.delDist();
    webpack(webpackConfig()).run((err, stats) => {
      if (runCallback(err, stats)) {
        console.log(chalk.green('\r\nbuild dist complete \r\n'));
        // zip();

      }
    });

    break;
  case 'dev':
    {
      util.delDll();

      const dllCompiler = webpack(configs.dll());

      dllCompiler.run((err, stats) => {
        if (runCallback(err, stats)) {
          console.log(chalk.green('\r\nbuild dll complete \r\n'));
          runDev();
        }
      });
    }
    break;
  case 'zip':
    zip();
    break;
  default:
}

function runDev() {
  webpackConfig = webpackConfig();
  const compiler = webpack(webpackConfig);
  let cDate = +new Date();

  compiler.run(runCallback);

  compiler.plugin('invalid', function() {
    clearConsole();
    cDate = +new Date();
    console.log(chalk.green('Compiling'));
  });

  // "done" event fires when Webpack has finished recompiling the bundle.
  // Whether or not you have warnings or errors, you will get this event.
  compiler.plugin('done', function(stats) {
    clearConsole();
    const ncDate = +new Date();
    const href = `http://${config.host}:${config.port}`;

    console.log(chalk.green(`Compiled ${ncDate - cDate}ms`));
    console.log(chalk.green(href));

    if (isFirst) {
      opn(href);
      isFirst = false;
    }
  });

  const devServer = new WebpackDevServer(compiler, webpackConfig.devServer);

  devServer.listen(webpackConfig.devServer.port, webpackConfig.devServer.host, function(serr) {
    if (serr) {
      console.log(serr);
      return;
    }
    clearConsole();
    console.log(chalk.cyan('\r\n\r\nStarting the development server...\r\n'));
  });
}


function runCallback(err, stats) {
  if (err) {
    console.error(chalk.red(err.stack || err));
    if (err.details) {
      console.error(chalk.red(err.details));
    }
    return false;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(chalk.red(info.errors));
  }

  if (stats.hasWarnings()) {
    console.warn(chalk.yellow(info.warnings));
  }

  return true;
}

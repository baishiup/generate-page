exports.getArgs = function() {
  let argvs;
  try {
    argvs = JSON.parse(process.env.npm_config_argv).original;
  } catch (ex) {
    argvs = process.argv;
  }
  console.log(argvs);
  return argvs;
};

exports.isDev = this.getArgs()[1] === 'dev';

exports.isAppoint = !!this.getArgs().filter(x => x.indexOf('--') >= 0).length;

exports.proList = function() {
  return this.getArgs()
    .filter(x => x.indexOf('--') >= 0)
    .map(x => x.split('--')[1]);
};

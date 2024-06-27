const { codegen } = require('swagger-axios-codegen');

const args = require('args-parser')(process.argv);

const { swagger, outputDir } = args;


codegen({
  methodNameMode: 'operationId',
  source: require(swagger),
  outputDir
});

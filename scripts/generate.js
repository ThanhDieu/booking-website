
const fs = require("fs");
const { codegen } = require('swagger-axios-codegen');
const args = require('args-parser')(process.argv);

const { model, name, folderPage } = args;

function uppercaseFirstChar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function generatePage(pageName) {
  const pageTemplateSrc = 'templates/page';
  const typeTemplateSrc = 'templates/types/page.type.ts';
  const targetPageDest = `src/pages/${pageName}`;
  const targetTypeDest = `src/types/${pageName}Page.ts`;


  fs.cpSync(pageTemplateSrc, targetPageDest, { overwrite: true, recursive: true });
  fs.cpSync(typeTemplateSrc, targetTypeDest, {overwrite: true, recursive: true});

  const pageIndexContent = fs.readFileSync(`${targetPageDest}/index.txt`, 'utf8');
  const typeIndexCotent = fs.readFileSync(`${targetTypeDest}`, 'utf-8');

  fs.writeFileSync(`${targetPageDest}/index.txt`, pageIndexContent.replaceAll('Page', `${pageName}Page`));
  fs.writeFileSync(`${targetTypeDest}`,typeIndexCotent.replaceAll('Page', `${pageName}Page`));

  fs.renameSync(`${process.cwd()}/src/pages/${pageName}/index.txt`, `${process.cwd()}/src/pages/${pageName}/index.tsx`, (err) => {
    if(err) console.log(err)
  })
};

function generatePageParam(pageName, folderPage) {
  const pageTemplateSrc = 'templates/[page]';
  const typeTemplateSrc = 'templates/types/page.type.ts';
  const targetPageDest = `src/pages/${folderPage}/[${pageName}]`;
  const targetTypeDest = `src/types/${pageName}.ts`;


  fs.cpSync(pageTemplateSrc, targetPageDest, { overwrite: true, recursive: true });
  fs.cpSync(typeTemplateSrc, targetTypeDest, {overwrite: true, recursive: true});

  const pageIndexContent = fs.readFileSync(`${targetPageDest}/index.txt`, 'utf8');
  const typeIndexCotent = fs.readFileSync(`${targetTypeDest}`, 'utf-8');

  fs.writeFileSync(`${targetPageDest}/index.txt`, pageIndexContent.replaceAll('Page', pageName));
  fs.writeFileSync(`${targetTypeDest}`,typeIndexCotent.replaceAll('Page', pageName));

  fs.renameSync(`${process.cwd()}/src/pages/${folderPage}/[${pageName}]/index.txt`, `${process.cwd()}/src/pages/${folderPage}/[${pageName}]/index.tsx`, (err) => {
    if(err) console.log(err)
  })
};

function generateSlice(modelName) {
  const baseTemplateSrc = 'templates/slice/index.txt';
  const targetModelDest = `src/store/slice/${modelName}.ts`;
  const rootSliceDest = `src/store/index.ts`;
  
  fs.copyFileSync(baseTemplateSrc, targetModelDest);
  const modelSliceContent = fs.readFileSync(`${targetModelDest}`, 'utf8');
  fs.writeFileSync(targetModelDest, modelSliceContent
    .replaceAll('sample', modelName)
    .replaceAll('Sample', uppercaseFirstChar(modelName)));

  const appRootSliceContent = fs.readFileSync(rootSliceDest, 'utf8');
  fs.writeFileSync(rootSliceDest, appRootSliceContent
    .replace('//_import', `import ${modelName} from './${modelName}'\n//_import`)
    .replace('//_slice', `${modelName},\n//_slice`))
}


function generateComponent(compName) {

  const baseTemplatePath = 'templates/component';
  const targetModelPath = `src/components/${compName}`;

  fs.cpSync(baseTemplatePath, targetModelPath, {overwrite: true, recursive: true});

  const indexComponentContent = fs.readFileSync(`${targetModelPath}/index.txt`, 'utf-8');
  const indexTypeContent = fs.readFileSync(`${targetModelPath}/@types/index.txt`, 'utf-8');
  fs.writeFileSync(`${targetModelPath}/index.txt`, indexComponentContent.replaceAll('Component', compName) )
  fs.writeFileSync(`${targetModelPath}/@types/index.txt`, indexTypeContent.replaceAll('Component', compName) )

  fs.renameSync(`${targetModelPath}/index.txt`,`${targetModelPath}/index.tsx`);
  fs.renameSync(`${targetModelPath}/@types/index.txt`,`${targetModelPath}/@types/index.ts`);

  const indexComponentsPath = `src/components/index.ts`;

  const indexCompContentFile = fs.readFileSync(`${indexComponentsPath}`, 'utf-8');
  fs.writeFileSync(indexComponentsPath, `${indexCompContentFile}\nexport * from './${compName}';`);

  fs.renameSync(`${targetModelPath}/Component.module.scss`,`${targetModelPath}/${compName}.module.scss`);

};

function generateComponentGlobal(compName) {

  const baseTemplatePath = 'templates/component';
  const targetModelPath = `src/components/global/${compName}`;

  fs.cpSync(baseTemplatePath, targetModelPath, {overwrite: true, recursive: true});

  const indexComponentContent = fs.readFileSync(`${targetModelPath}/index.txt`, 'utf-8');
  const indexTypeContent = fs.readFileSync(`${targetModelPath}/@types/index.txt`, 'utf-8');
  fs.writeFileSync(`${targetModelPath}/index.txt`, indexComponentContent.replaceAll('Component', compName) )
  fs.writeFileSync(`${targetModelPath}/@types/index.txt`, indexTypeContent.replaceAll('Component', compName) )

  fs.renameSync(`${targetModelPath}/index.txt`,`${targetModelPath}/index.tsx`);
  fs.renameSync(`${targetModelPath}/@types/index.txt`,`${targetModelPath}/@types/index.ts`);

  fs.renameSync(`${targetModelPath}/Component.module.scss`,`${targetModelPath}/${compName}.module.scss`);

  const indexComponentsPath = `src/components/index.ts`;

  const indexCompContentFile = fs.readFileSync(`${indexComponentsPath}`, 'utf-8');
  fs.writeFileSync(indexComponentsPath, `${indexCompContentFile}\nexport * from './global/${compName}/index';`)

};


function generateApiPath(pathName) {

  const baseTemplateFilePath = `templates/api/apiPath.txt`;
  const targetModelPath = `src/pages/api/${pathName}.ts`;

  fs.cpSync(baseTemplateFilePath, targetModelPath,{overwrite: true, recursive: true});  
};

function generate() {
  switch (model) {
    case 'page':
      generatePage(name);
      break;
    case 'pageParam':
      generatePageParam(name, folderPage);
      break;
    case 'slice':
      generateSlice(name);
      break;
    case 'component':
      generateComponent(name);
      break;
    case 'componentGlobal':
      generateComponentGlobal(name);
      break;
    case 'apiPath':
      generateApiPath(name);
      break;
    default:
      break;
  }
};

generate();

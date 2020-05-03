'use strict'
import { join } from 'path';
import * as readline from 'readline';
import * as fs from 'fs';
import * as url from 'url';

const FILE = `file://${join(__dirname, 'angular/index.html')}`;


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const prompt = (question) => new Promise(res => rl.question(question, r => res(r)))

// const args0 = require('minimist')(process.env)
// const args = process.env.PARAM;
// process.env.npm_package_args_p1_p2


async function main() {
  // await prompt('cest dj ? \n')
  // await prompt('ccccc ? \n')
  // await prompt('dddddd ? \n')
  // await prompt('yyyyyy ? \n')

  // const r = fs.readFileSync('./models.ts')
  // console.log(r)
  // rl.close();


  const serviceA = require('./models.ts');
  const keys = Object.keys(serviceA);
  // console.log(Object.keys(serviceA))
  keys.forEach(e => {

    const f = serviceA[e] as Function
    console.log(f)
  })

}

// console.log(process.env.npm_package_args_p1_p2)


// launch the programme
// main();
// const ts = require('typescript');
import * as ts from 'typescript';
let file = fs.readFileSync('./models.ts');
//
const program = ts.createProgram(['./models.ts'], {
  module: ts.ModuleKind.ES2015,
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
  target: ts.ScriptTarget.Latest
});

const typeChecker = program.getTypeChecker();


program.getSourceFiles()
  .filter(sourceFile => sourceFile.fileName.includes('models'))
  .forEach(node => {
    
    const statements = node.statements.filter(s => ts.isClassDeclaration(s));

    statements.forEach(statement => {
      const type = typeChecker.getTypeAtLocation(statement);

      console.log(JSON.stringify((statement as any).name.escapedText, null, '\t'));

      for (const property of type.getProperties()) {
        const propertyType = typeChecker.getTypeOfSymbolAtLocation(property, statement);
        console.log("Name:", property.name, "Type:", typeChecker.typeToString(propertyType));
      }
    });
  })


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


// console.log(process.env.npm_package_args_p1_p2)

import { ClassReader } from './class-reader';

const cr = new ClassReader();

// cr.methode();
const oldName = 'region';
const newName = 'test';
const oldCap = oldName.charAt(0).toUpperCase() + oldName.slice(1);
const newCap = newName.charAt(0).toUpperCase() + newName.slice(1);
const dir = `./${oldName}`;
const newdir = `./generation/${newName}`;
const files = fs.readdirSync(dir);

if (!fs.existsSync(newdir)){
  fs.mkdirSync(newdir);
}

// console.log(files)
files.filter(f => !fs.lstatSync(`${dir}/${f}`).isDirectory()).forEach(file => {
    const filePath = join(dir, file);
    // const newFilePath = join(newDir, newDir);

    // const i = file.indexOf('-') !== -1 ? file.indexOf('-') : file.indexOf('.');
    var content = fs.readFileSync(`${dir}/${file}`, 'utf8');

    let newContent = content.replace(new RegExp(oldName, 'g'), newName);
    newContent = newContent.replace(new RegExp(oldCap, 'g'), newCap);
    // console.log(oldName, newName, oldCap, newCap)
    const fileName = file.replace(oldName, newName);
    // console.log(fileName, content.substring(0, 20))

    fs.writeFileSync(`${newdir}/${fileName}`, newContent)
    // fs.renameSync(filePath, newFilePath);
  });

  console.log('done')
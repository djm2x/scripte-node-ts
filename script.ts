'use strict'
import * as path from 'path';
import * as readline from 'readline';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as url from 'url';
import { Generate } from './generate';
import { ClassReader } from './class-reader';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const prompt = (question) => new Promise(res => rl.question(question, r => res(r)))

const g = new Generate();

// g.methode();
// console.log(process.env.npm_package_args_p1_p2)

// function myFirstCallBack(x: number, y: number, callback: (s: number) => void) {
//   return callback(x+y);
// }

// myFirstCallBack(5, 6, (e) => {
//   console.log(e);
// })
const convert = (from, to) => str => Buffer.from(str, from).toString(to)
// const utf8ToHex = convert('utf8', 'hex')
// const hexToUtf8 = convert('hex', 'utf8')


// console.log(utf8ToHex('EL'));

const test = (state) => ({ do: () => console.log(state) });
const test2 = (state) =>  () => console.log(state);

// test('me & you').do();
test2('me & you');

const files = fse.readdirSync('source');


files.forEach((e, i) => {
  if (i === 0) {
    console.log(`
      if (file === '${e}') {
                  
      }
    `)
  } else {
    console.log(`
      else if (file === '${e}') {
                  
      }
    `)
  }
  
})
// console.log(files, files.length)

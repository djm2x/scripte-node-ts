'use strict'
import * as path from 'path';
import * as readline from 'readline';
import * as fs from 'fs';
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

g.methode();
// console.log(process.env.npm_package_args_p1_p2)

// function myFirstCallBack(x: number, y: number, callback: (s: number) => void) {
//   return callback(x+y);
// }

// myFirstCallBack(5, 6, (e) => {
//   console.log(e);
// })
// const convert = (from, to) => str => Buffer.from(str, from).toString(to)
// const utf8ToHex = convert('utf8', 'hex')
// const hexToUtf8 = convert('hex', 'utf8')


// console.log(utf8ToHex('EL'));



const pug = require('pug')
const fs = require('fs')
const inputs = require('../src/inputs')

const fKernels = fs.readdirSync('./src/kernels')
const fNative = fs.readdirSync('./src/glFunctions')

let functions = 'const nativeFunctions = {'
for (let f of fNative) {
	let fname = f.split('.')[0]
	let fn = fs.readFileSync(`./src/glFunctions/${f}`).toString('utf-8').replaceAll(/(\n|\t|\r)/g, '')
	functions += `${fname}: "${fn}",`
}
functions += '};'


let kernels = 'const availableKernels = {'
for (let kernel of fKernels) {
	let fname = kernel.split('.')[0]
	/**@type {Function} */
	let f = require(`../src/kernels/${kernel}`)
	kernels += `${fname}: ${f.toString().replaceAll(/(\n|\t|\r)/g, '')},`
}
kernels += '};'

let contents = pug.renderFile('./src/index.pug', {
	inputList: inputs,
	ak: fKernels.map(s => s.split('.')[0]),
	kernelFunctions: kernels + functions
})

fs.writeFileSync('./src/index.html', contents)

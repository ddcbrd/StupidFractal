const fs = require('fs')
const { join } = require('path')
const fPath = './src/glFunctions'
const kPath = './src/kernels'

let availableFunctions = {}

let availableKernels = fs.readdirSync(join(__dirname, kPath))
	.filter((s) => (s.endsWith('.js') && s !== 'index.js'))
	.map((s) => s.split('.')[0])
	.map((s) => `export {default as ${s}} from "./${s}.js";`)
	.join('\n')

let arrF = fs.readdirSync(join(__dirname, fPath))
	.filter((s) => s.endsWith('.glsl'))
	.map((s) => s.split('.')[0])

for (let f of arrF) {
	let body = fs.readFileSync(join(__dirname, `${fPath}/${f}.glsl`)).toString()
	body.replace(/[\n||\r|\t]/gi, '')
	availableFunctions[f] = body
	// gpu.addNativeFunction(f, body)
}

fs.writeFileSync(join(__dirname, kPath, 'index.js'), availableKernels)
fs.writeFileSync(join(__dirname, fPath, 'functions.js'), 'export default ' + JSON.stringify(availableFunctions))

// const PNG = require('fast-png')
/// <reference path="../node_modules/gpu.js/src/index.js" />

/**
 * @typedef FractalOptions
 * @property {number} imageWidth
 * @property {number} imageHeight
 * @property {number} widthRange
 * @property {number} xOff
 * @property {number} yOff
 * @property {number} sides
 * @property {string} fractalName
 * @property {*} constants
 */

const gpu = new GPU()

// let form = $('<form></form>')
let form = $('#genForm')

// let sendBtn = $('<input type="button" value="Send" class="form-control form-control-sm">')
let sendBtn = $('#sendBtn')
let downloadBtn = $('#downloadBtn')

for (let f in nativeFunctions) gpu.addNativeFunction(f, nativeFunctions[f])

/**
 * @param {string} options.fractalName 
 * @param {Range} range 
 * @param {FractalOptions} options
 * @returns {HTMLCanvasElement}
 */
const generate = (range, options) => {
	if (!availableKernels[options.fractalName]) return undefined
	/** @type {IKernelRunShortcut}*/
	let kernel = availableKernels[options.fractalName](gpu, options.constants)
		.setLoopMaxIterations(options.constants.maxit)
		.setOutput([options.imageWidth, options.imageHeight])
		.setGraphical(true)
	kernel(range.x, range.y)
	return kernel.canvas
}

sendBtn.on('click', () => {
	/** @type {FractalOptions} */
	let data = {
		constants: {
			initialZre: 0.1,
			initialZim: 0.2
		}
	}
	$('.form-input').each(function () {
		let val = $(this).val()
		let name = $(this).attr('name')
		let isGenConst = ($(this).attr('isgenconst') === 'true')
		if (!isGenConst) data[name] = (name === 'fractalName') ? val : parseFloat(val)
		else data.constants[name] = parseFloat(val)
	})
	data.constants.imageHeight = data.imageHeight
	data.constants.imageWidth = data.imageWidth

	// let canvases = []

	let aspectRatio = data.imageWidth / data.imageHeight

	let range = new Range(
		aspectRatio,
		data.widthRange,
		data.sides,
		data.xOff,
		data.yOff
	)

	$('#imgFrame').empty()

	let maxWidth = $('#imgFrame').width()
	let renderWidth = data.imageWidth

	if (renderWidth * data.sides > maxWidth) {
		renderWidth = Math.floor(
			(maxWidth - 20) / data.sides
		)
	}

	let renderHeight = renderWidth / aspectRatio
	// let maxHeight = $('#imgFrame').height()

	for (let i = 0; i < data.sides * data.sides; i++) {
		// console.log('generatin ', i)
		let rowNumber = Math.floor(i / data.sides)
		let colNumber = i % data.sides
		if (colNumber === 0) $('#imgFrame').append(`<div class="row justify-content-md-center" id="imgRow-${rowNumber}"></div>`)
		range.calcOffset(i)
		let canvas = generate(range, data)
		$(`#imgRow-${rowNumber}`).append(
			$(`<div class="col col-md-auto mx-o my-0 px-0 py-0"></div>`).append(
				$('<img class="img-fluid outputImage">')
					.attr('src', canvas.toDataURL())
					.attr('id', `img-${i}`)
					.attr('width', renderWidth)
					.attr('height', renderHeight)
			)
		)
	}

	downloadBtn.removeAttr('disabled')
	// console.log(data)
	//generate fractal accordingly
})

downloadBtn.on('click', () => {
	$('.outputImage').each(function () {
		let href = $(this).attr('src')
		let download = `${$(this).attr('id')}.png`
		$('<a class="dlink"></a>')
			.attr('href', href)
			.attr('download', download)
			.appendTo('.dl')
	})

	document.querySelectorAll('a.dlink').forEach((element) => element.click())
	$('.dl').empty()
})
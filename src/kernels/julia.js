
/**
 * 
 * @param {GPU} gpu 
 * @param {*} constants 
 * @returns 
 */
module.exports = (gpu, constants) => {
	return gpu.createKernel(function (xRange, yRange) {
		let a = ((xRange[1] - xRange[0]) * this.thread.x / (this.constants.imageWidth - 1)) + xRange[0];
		let b = ((yRange[1] - yRange[0]) * this.thread.y / (this.constants.imageHeight - 1)) + yRange[0];
		let z = [a, b];
		let c = [this.constants.initialZre, this.constants.initialZim];
		let iterations = 0;
		while (complexAbsSq(z) < (this.constants.boundary * this.constants.boundary) && iterations < this.constants.maxit) {
			let sq = complexSq(z);
			z = [sq[0] + c[0], sq[1] + c[1]];
			iterations++;
		}
		let mod = Math.sqrt(complexAbsSq(z));
		let gs = (iterations / this.constants.maxit) - Math.log2(Math.max(1.0, Math.log2(mod)));
		this.color(gs, gs, gs);
	}, { constants: constants });
}
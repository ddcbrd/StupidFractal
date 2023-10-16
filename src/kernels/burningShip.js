module.exports = (gpu, constants) => {
	return gpu.createKernel(function (xRange, yRange) {
		let a = ((xRange[1] - xRange[0]) * this.thread.x / (this.constants.imageWidth - 1)) + xRange[0];
		let b = ((yRange[1] - yRange[0]) * this.thread.y / (this.constants.imageHeight - 1)) + yRange[0];
		let z = [0, 0];
		let c = [a, b];
		let iterations = 0;
		for (let n = 0; n < this.constants.maxit; n++) {
			let zre = Math.abs(z[0]);
			let zim = Math.abs(z[1]);
			let sq = complexSq([zre, zim]);
			z = [sq[0] + c[0], sq[1] + c[1]];
			iterations = n;
			if (complexAbsSq(z) > (this.constants.boundary * this.constants.boundary)) break;
		}
		let gs = iterations / this.constants.maxit;
		gs += 1 / complexAbsSq(z);
		gs = Math.min(gs, 1.0);
		this.color(gs, gs, gs);
	}, {
		constants: constants
	});
}
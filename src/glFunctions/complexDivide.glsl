vec2 complexDivide(vec2 num, vec2 den) {
	vec2 o;
	float opDen = den[0] * den[0] + den[1] * den[1];
	float re = (num[0] * den[0] + num[1] * den[1]) / opDen;
	float im = (num[1] * den[0] - num[0] * den[1]) / opDen;
	o[0] = re;
	o[1] = im;
	return o;
}
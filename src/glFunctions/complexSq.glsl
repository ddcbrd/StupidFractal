vec2 complexSq(vec2 z) {
	vec2 o;
	float re = z[0] * z[0] - z[1] * z[1];
	float im = 2.0 * z[0] * z[1];
	o[0] = re;
	o[1] = im;
	return o;
}
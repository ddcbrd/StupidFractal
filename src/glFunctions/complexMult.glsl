vec2 complexMult(vec2 z1, vec2 z2) {
	vec2 o;
	float re = (z1[0] * z2[0]) - (z1[1] * z2[1]);
	float im = (z1[0] * z2[1]) + (z2[0] * z1[1]);
	o[0] = re;
	o[1] = im;
	return o;
}
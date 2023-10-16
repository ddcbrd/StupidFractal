vec2 complexAdd(vec2 z1, vec2 z2) {
	vec2 o;
	float re = z1[0] + z2[0];
	float im = z1[1] + z2[1];
	o[0] = re;
	o[1] = im;
	return o;
}
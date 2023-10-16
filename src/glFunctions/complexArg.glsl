float complexArg(vec2 z) {
	float arg = atan2(z[1], z[0]);
	if ((z[0] < 0.0 && z[1] >= 0.0) || (z[0] < 0.0 && z[1] < 0.0)) arg += 3.141592653589793;
	else if (z[0] >= 0.0 && z[1] < 0.0) arg += 6.283185307179586;
	return arg;
}
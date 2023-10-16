vec3 hsvtorgb(float h, float s, float v){
        float c = s * v;
        float x = c * (1.0 - abs(mod((h / 60.0), 2.0) - 1.0));
        float m = v - c;
        vec3 color;
        if (0.0 <= h && h < 60.0)           color = vec3(c, x, 0.0);
        else if (60.0 <= h && h < 120.0)    color = vec3(x, c, 0.0);
        else if (120.0 <= h && h < 180.0)   color = vec3(0.0, c, x);
        else if (180.0 <= h && h < 240.0)   color = vec3(0.0, x, c);
        else if (240.0 <= h && h < 300.0)   color = vec3(x, 0.0, c);
        else if (300.0 <= h && h < 360.0)   color = vec3(c, 0.0, x);
        color.r = (color.r + m);
        color.g = (color.g + m);
        color.b = (color.b + m);
        return color;
    }
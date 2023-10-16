class Range {
    constructor(ar, widthRange, sides, centerX, centerY) {
        this.aspectRatio = ar;
        this.sides = sides;
        this.widthRange = widthRange;       //this is half of the actual widthRange
        this.heightRange = widthRange / ar; //this is half of the actual heightRange
        this.centerX = centerX;
        this.centerY = centerY;
        this.recalc(0, 0)
    }

    calcOffset(n) {
        if (this.sides === 1) return
        if (n >= this.sides * this.sides) throw new Error(`Cannot calculate offset of image number ${n}: too many images (?)`)
        let x = (n % this.sides);
        // let y = Math.floor((this.sides - n - 1) / this.sides);
        let y = Math.floor(n / this.sides);
        if (this.sides % 2 === 0) {
            x += (x - this.sides / 2 < 0) ? -this.sides / 2 : - (this.sides / 2) + 1;
            y += (y - this.sides / 2 < 0) ? -this.sides / 2 : - (this.sides / 2) + 1;
            y *= -1
            x = x * this.widthRange + Math.sign(x) * (Math.abs(x) - 1) * this.widthRange;
            y = y * this.heightRange + Math.sign(y) * (Math.abs(y) - 1) * this.heightRange;
            // console.log('second: ', n, x, y)

        } else {
            x = Math.ceil(x - this.sides / 2);
            y = Math.ceil(y - this.sides / 2);
            x = (x * this.widthRange * 2);
            y = (-1 * y * this.heightRange * 2);
        }
        this.recalc(x, y);

    }

    recalc(xOff, yOff) {
        this.x = [
            -this.widthRange + this.centerX + xOff,
            this.widthRange + this.centerX + xOff
        ]

        this.y = [
            -this.heightRange + this.centerY + yOff,
            this.heightRange + this.centerY + yOff
        ]
    }

    offSet(x, y) {
        this.x[1] += x
        this.x[0] += x

        this.y[0] += y
        this.y[1] += y
    }
}

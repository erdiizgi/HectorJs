/*
* Copyright (c) 2014 Erdi Izgi
*
* Project homepage and documentation: http://erdiizgi.github.io/HectorJs/
*
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
*
* The above copyright notice and this permission notice shall be included
* in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
* OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
* IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM,
* DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
* OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
* THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var Vector2d = (function () {
    // ** cconstructor gives the initial values of the vector **
    function Vector2d(a, b) {
        // ** Properties **
        this.ab = new Float32Array(2);
        this.a = a; //sets a value of the vector
        this.b = b; //sets b value of the vector
    }
    Object.defineProperty(Vector2d.prototype, "a", {
        // *************
        // ** Methods **
        // *************
        // ******************************
        // ** Property listing methods **
        // ******************************
        //accessor method for a
        get: function () {
            return this.ab[0];
        },
        //mutator method for a
        set: function (value) {
            this.ab[0] = value;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Vector2d.prototype, "b", {
        //accessor method for b
        get: function () {
            return this.ab[1];
        },
        //mutator method for b
        set: function (value) {
            this.ab[1] = value;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Vector2d.prototype, "magnitude", {
        //accessor method to get magnitude of this vector
        get: function () {
            return Math.sqrt(this.ab[0] * this.ab[0] + this.ab[1] * this.ab[1]);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Vector2d.prototype, "squareMagnitude", {
        //accessor method to get square magnitude of this vector
        get: function () {
            return this.ab[0] * this.ab[0] + this.ab[1] * this.ab[1];
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Vector2d.prototype, "angle", {
        //accessor method for angle beetween x-axis
        get: function () {
            return (0.5 + (Math.atan2(this.ab[1], this.ab[0]) * (180 / Math.PI))) << 0;
        },
        enumerable: true,
        configurable: true
    });



    // ********************************************************************
    // ** Methods that changes the state of this vector (state-altering) **
    // ********************************************************************
    //sets this vector
    Vector2d.prototype.Set = function (a, b) {
        this.ab.set([a, b]);
        return this;
    };

    //sets this vector to the given vector
    Vector2d.prototype.SetVector = function (vector2) {
        this.ab.set([vector2.a, vector2.b]);
        return this;
    };

    //inverts (negates) this vector
    Vector2d.prototype.Invert = function () {
        this.a *= -1;
        this.b *= -1;
        return this;
    };

    //rounds this vector with an efficient way
    //JsPerf -> 778,136,300 ops/sec
    Vector2d.prototype.Round = function () {
        this.a = (0.5 + this.a) << 0;
        this.b = (0.5 + this.b) << 0;
        return this;
    };

    //makes the vector values absolute
    Vector2d.prototype.Abs = function () {
        this.a = Math.abs(this.a);
        this.b = Math.abs(this.b);
        return this;
    };

    //adds the given vector to this vector
    Vector2d.prototype.Add = function (vector2) {
        this.a += vector2.a;
        this.b += vector2.b;
        return this;
    };

    //adds the given vector to this vector, scaled by the given
    Vector2d.prototype.AddScaled = function (vector2, scale) {
        this.a += (vector2.a * scale);
        this.b += (vector2.b * scale);
        return this;
    };

    //subtracts the given vector from this vector
    Vector2d.prototype.Subtract = function (vector2) {
        this.a -= vector2.a;
        this.b -= vector2.b;
        return this;
    };

    //subracts the given vector from this vector, scaled by the given
    Vector2d.prototype.SubtractScaled = function (vector2, scale) {
        this.a -= (vector2.a * scale);
        this.b -= (vector2.b * scale);
        return this;
    };

    //multiplies this vector by the given scalar value, or values respectively
    Vector2d.prototype.Multiply = function (scale, scaleY) {
        this.a *= scale;
        this.b *= scaleY || scale;
        return this;
    };

    //divides this vector by the given scalar value
    Vector2d.prototype.Divide = function (scale, scaleY) {
        this.a *= scale;
        this.b *= scaleY || scale;
        return this;
    };

    //rotates this vector by given angle a in degrees
    Vector2d.prototype.Rotate = function (angle) {
        var sine = Math.sin(angle);
        var cosine = Math.cos(angle);
        this.a = this.a * cosine - this.b * sine;
        this.b = this.a * sine + this.b * cosine;
        return this;
    };

    //sets this vector to the projection of this vector onto vector2
    Vector2d.prototype.Project = function (vector2) {
        var scalar = this.Dot(vector2) / Math.pow(vector2.magnitude, 2);
        this.Set(vector2.ab[0], vector2.ab[1]);
        this.Multiply(scalar);
        return this;
    };

    //sets this vector to the reflection of this vector over vector2
    Vector2d.prototype.Reflect = function (vector2) {
        var vector = new Vector2d(vector2.b, -vector2.a);
        var rotationAngle = 2 * this.GetAngleBetween(vector2);
        if (this.GetAngleBetweenCos(vector) <= 0)
            rotationAngle *= -1;
        this.Rotate(rotationAngle);
        return this;
    };

    //swaps the values of this vector and vector2
    Vector2d.prototype.Swap = function (vector2) {
        var tempX = this.ab[0];
        var tempY = this.ab[1];
        this.a = vector2.ab[0];
        this.b = vector2.ab[1];
        vector2.ab[0] = tempX;
        vector2.ab[1] = tempY;
        return this;
    };

    // ***********************************************************************
    // ** Methods that doesn't change the state of this vector (state-safe) **
    // ***********************************************************************
    //clones this vector and returns it
    Vector2d.prototype.Clone = function (out) {
        var clone = new Vector2d(this.a, this.b);
        return clone;
    };

    //returns a copy of the unit vector
    Vector2d.prototype.Normalize = function () {
        var length = Math.sqrt(this.a * this.a + this.b * this.b);
        length = 1 / length; //Edge trimming
        var n = new Vector2d(this.a * length, this.b * length);
        return n;
    };

    //returns the distance from another vector
    Vector2d.prototype.Distance = function (vector2) {
        var x = this.a - vector2.a;
        var y = this.b - vector2.b;
        return Math.sqrt((x * x) + (y * y));
    };

    //returns dot products of this vector and the given vector
    Vector2d.prototype.Dot = function (vector2) {
        return this.a * vector2.a + this.b * vector2.b;
    };

    //returns the z-axis of the cross products for this vector and the given vector
    Vector2d.prototype.Cross = function (vector2) {
        return this.a * vector2.b - this.b * vector2.a;
    };

    //returns the angle between this vector and vector2
    Vector2d.prototype.GetAngleBetween = function (vector2) {
        return (0.5 + (Math.acos(this.Dot(vector2) / (this.magnitude * vector2.magnitude)) * (180 / Math.PI))) << 0;
    };

    //returns the cosine of the angle between this vector and vector2
    Vector2d.prototype.GetAngleBetweenCos = function (vector2) {
        return (0.5 + (this.Dot(vector2) / (this.magnitude * vector2.magnitude))) << 0;
    };

    //returns the sine of the angle between this vector and vector2
    Vector2d.prototype.GetSinAngleBetweenSin = function (vector2) {
        return (0.5 + (this.Cross(vector2) / (this.magnitude * vector2.magnitude))) << 0;
    };

    //returns a new vector which is left hand normal to this vector
    Vector2d.prototype.GetLeftNormal = function () {
        var leftN = new Vector2d(-this.ab[1], this.ab[0]);
        return leftN;
    };

    //returns a new vector which is right hand normal to this vector
    Vector2d.prototype.GetRightNormal = function () {
        var rightN = new Vector2d(this.ab[1], -this.ab[0]);
        return rightN;
    };

    // ************************
    // ** Comparison methods **
    // ************************
    //returns true if equality test is successful between this vector and vector2
    Vector2d.prototype.IsEqualTo = function (vector2) {
        return this.ab[0] == vector2.ab[0] && this.ab[1] == vector2.ab[1];
    };

    //returns true if normality test is successful beetween this vector and vector2
    Vector2d.prototype.IsNormalTo = function (vector2) {
        return this.Dot(vector2) === 0;
    };

    //returns true if parallelity test is successful beetween this vector and vector2
    Vector2d.prototype.IsParallelTo = function (vector2) {
        return this.Cross(vector2) == 0;
    };

    //returns true if this vector perpendicular to the vector2
    Vector2d.prototype.IsPerpendicular = function (vector2) {
        return this.Dot(vector2) == 0;
    };

    //returns true if this vector is in line with the vector2 (either in the same or the opposite direction)
    Vector2d.prototype.IsOnline = function (vector2) {
        return (this.ab[0] * vector2.b - this.ab[1] * vector2.a == 0);
    };

    //returns true if this vector is collinear with the vector2
    Vector2d.prototype.IsCollinear = function (vector2) {
        return (this.IsOnline(vector2) && this.Dot(vector2) > 0);
    };

    //returns true if this vector is opposite collinear with the vector2
    Vector2d.prototype.IsOppositeCollinear = function (vector2) {
        return (this.IsOnline(vector2) && this.Dot(vector2) < 0);
    };

    //returns true if this vector has similar direction compared to the vector2.
    Vector2d.prototype.HasSameDirection = function (vector2) {
        return this.Dot(vector2) > 0;
    };

    //returns true if this vector has opposite direction compared to the vector2.
    Vector2d.prototype.HasOppositeDirection = function (vector2) {
        return this.Dot(vector2) < 0;
    };

    // *******************
    // ** Query methods **
    // *******************
    //returns true if this vector is unit vector (normalized or normalised)
    Vector2d.prototype.IsUnit = function () {
        return this.magnitude == 1;
    };

    //returns true if all values of this vector is 0
    Vector2d.prototype.IsZero = function () {
        return this.ab[0] == 0 && this.ab[1] == 0;
    };

    //returns true if this vector is valid
    Vector2d.prototype.IsValid = function () {
        return !(Number.NaN == this.ab[0] || Number.NaN == this.ab[1]);
    };

    // ***********************
    // ** Debugging methods **
    // ***********************
    //logs this vector to the console
    Vector2d.prototype.Debug = function () {
        console.log(this.toString());
    };

    //draws the vector to the screen
    Vector2d.prototype.DrawDebug = function (ctx, color, x, y) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + this.a, y + this.b);
        ctx.lineWidth = 5;
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();
    };

    //overrides the toSting method
    Vector2d.prototype.toString = function () {
        return "[" + this.a + ":" + this.b + "]";
    };

    // ********************
    // ** static methods **
    // ********************
    //zeros the given vector
    Vector2d.Zero = function (vector2) {
        vector2.ab.set([0, 0]);
        return vector2;
    };

    //returns the magnitude of this vector
    Vector2d.Magnitude = function (vector2) {
        return Math.sqrt(vector2.a * vector2.a + vector2.b * vector2.b);
    };

    //returns the square of this magnitude
    Vector2d.SquareMagnitude = function (vector2) {
        return vector2.a * vector2.a + vector2.b * vector2.b;
    };

    //returns the angle in degrees between from and to.
    Vector2d.Angle = function (vector1, vector2) {
        return (0.5 + (Math.acos(vector1.Dot(vector2) / (vector1.magnitude * vector2.magnitude)) * (180 / Math.PI))) << 0;
    };

    //returns a copy of vector with its magnitude clamped to maxLength.
    Vector2d.ClampMagnitude = function (vector1, maxLength) {
        var coefficient = maxLength / Math.sqrt(vector1.a * vector1.a + vector1.b * vector1.b);
        return new Vector2d(vector1.a * coefficient, vector1.b * coefficient);
    };

    //returns the distance between vector1 and vector2.
    Vector2d.Distance = function (vector1, vector2) {
        return vector1.Subtract(vector2).magnitude;
    };

    //dot Product of two vectors.
    Vector2d.DotProduct = function (vector1, vector2) {
        return vector1.Dot(vector2);
    };

    //z-axis of cross product of two vectors.
    Vector2d.CrossProduct = function (vector1, vector2) {
        return vector1.Cross(vector2);
    };
    return Vector2d;
})();


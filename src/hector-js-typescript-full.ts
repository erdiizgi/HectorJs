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
    class Vector2d {
        
        // ** Properties **  
        private ab = new Float32Array(2); //Most optimal way to kept the values
       
        // ** cconstructor gives the initial values of the vector **  
        constructor(a: number, b: number) {
            this.a = a; //sets a value of the vector 
            this.b = b; //sets b value of the vector
        }

        // *************
        // ** Methods **
        // *************

        // ******************************
        // ** Property listing methods **
        // ******************************

        //accessor method for a
        get a(): number {
            return this.ab[0];
        }

        //accessor method for b
        get b(): number {
            return this.ab[1];
        }

        //accessor method to get magnitude of this vector
        get magnitude(): number {
            return Math.sqrt(this.ab[0] * this.ab[0] + this.ab[1] * this.ab[1]);
        }

        //accessor method to get square magnitude of this vector
        get squareMagnitude(): number {
            return this.ab[0] * this.ab[0] + this.ab[1] * this.ab[1];
        }

        //accessor method for angle beetween x-axis
        get angle(): number {
            return (0.5 + (Math.atan2(this.ab[1], this.ab[0]) * (180 / Math.PI))) << 0;
        }

        //mutator method for a
        set a(value: number) {
            this.ab[0] = value;
        }

        //mutator method for b
        set b(value: number) {
            this.ab[1] = value;
        }

        // ********************************************************************
        // ** Methods that changes the state of this vector (state-altering) ** 
        // ********************************************************************

        //sets this vector
        Set(a: number, b: number): Vector2d {
            this.ab.set([a, b]);
            return this;
        }

        //sets this vector to the given vector
        SetVector(vector2: Vector2d): Vector2d {
            this.ab.set([vector2.a, vector2.b]);
            return this;
        }

        //inverts (negates) this vector
        Invert(): Vector2d {
            this.a *= -1;
            this.b *= -1;
            return this;
        }

        //rounds this vector with an efficient way
        //JsPerf -> 778,136,300 ops/sec
        Round(): Vector2d {
            this.a = (0.5 + this.a) << 0;
            this.b = (0.5 + this.b) << 0;
            return this;
        }

        //makes the vector values absolute
        Abs(): Vector2d {
            this.a = Math.abs(this.a);
            this.b = Math.abs(this.b);
            return this;
        }

        //adds the given vector to this vector
        Add(vector2: Vector2d): Vector2d {
            this.a += vector2.a;
            this.b += vector2.b;
            return this;
        }

        //adds the given vector to this vector, scaled by the given 
        AddScaled(vector2: Vector2d, scale: number): Vector2d {
            this.a += (vector2.a * scale);
            this.b += (vector2.b * scale);
            return this;
        }

        //subtracts the given vector from this vector
        Subtract(vector2: Vector2d): Vector2d {
            this.a -= vector2.a;
            this.b -= vector2.b;
            return this;
        }

        //subracts the given vector from this vector, scaled by the given 
        SubtractScaled(vector2: Vector2d, scale: number): Vector2d {
            this.a -= (vector2.a * scale);
            this.b -= (vector2.b * scale);
            return this;
        }

        //multiplies this vector by the given scalar value, or values respectively 
        Multiply(scale: number, scaleY?: number): Vector2d {
            this.a *= scale;
            this.b *= scaleY || scale;
            return this;
        }

        //divides this vector by the given scalar value
        Divide(scale: number, scaleY?: number): Vector2d {
            this.a *= scale;
            this.b *= scaleY || scale;
            return this;
        }

        //rotates this vector by given angle a in degrees
        Rotate(angle: number): Vector2d {
            var sine = Math.sin(angle);
            var cosine = Math.cos(angle);
            this.a = this.a * cosine - this.b * sine;
            this.b = this.a * sine + this.b * cosine;
            return this;
        }

        //sets this vector to the projection of this vector onto vector2
        Project(vector2: Vector2d): Vector2d {
            var scalar: number = this.Dot(vector2) / Math.pow(vector2.magnitude, 2); //the size scalar after the projection
            this.Set(vector2.ab[0],vector2.ab[1]);
            this.Multiply(scalar);
            return this;
        }

        //sets this vector to the reflection of this vector over vector2
        Reflect(vector2: Vector2d): Vector2d {
            var vector: Vector2d = new Vector2d(vector2.b, -vector2.a); //Horizontal Reflection of the given vector
            var rotationAngle: number = 2 * this.GetAngleBetween(vector2); 
            if (this.GetAngleBetweenCos(vector) <= 0)
                rotationAngle *= -1;
            this.Rotate(rotationAngle);
            return this;
        }

        //swaps the values of this vector and vector2
        Swap(vector2: Vector2d): Vector2d {
            var tempX: number = this.ab[0]; 
            var tempY: number = this.ab[1];
            this.a = vector2.ab[0];
            this.b = vector2.ab[1];
            vector2.ab[0] = tempX;
            vector2.ab[1] = tempY;
            return this;
        }
        
        // ***********************************************************************
        // ** Methods that doesn't change the state of this vector (state-safe) **
        // ***********************************************************************

        //clones this vector and returns it
        Clone(out?: Vector2d): Vector2d {
            var clone: Vector2d = new Vector2d(this.a, this.b);
            return clone;
        }

        //returns a copy of the unit vector
        Normalize(): Vector2d {
            var length = Math.sqrt(this.a * this.a + this.b * this.b); //calculating the length of this vector
            length = 1 / length; //Edge trimming
            var n: Vector2d = new Vector2d(this.a * length, this.b * length); //Normalize Vector
            return n; 
        }

        //returns the distance from another vector
        Distance(vector2: Vector2d): number {
            var x = this.a - vector2.a;
            var y = this.b - vector2.b;
            return Math.sqrt((x * x) + (y * y));
        }

        //returns dot products of this vector and the given vector
        Dot(vector2: Vector2d): number {
            return this.a * vector2.a + this.b * vector2.b;
        }

        //returns the z-axis of the cross products for this vector and the given vector
        Cross(vector2: Vector2d): number {
            return this.a * vector2.b - this.b * vector2.a;
        }

        //returns the angle between this vector and vector2
        GetAngleBetween(vector2: Vector2d): number {
            return  (0.5 + (Math.acos(this.Dot(vector2) / (this.magnitude * vector2.magnitude)) * (180 / Math.PI))) << 0;
        }

        //returns the cosine of the angle between this vector and vector2
        GetAngleBetweenCos(vector2: Vector2d): number {
            return (0.5 + (this.Dot(vector2) / (this.magnitude * vector2.magnitude))) << 0;
        }

        //returns the sine of the angle between this vector and vector2
        GetSinAngleBetweenSin(vector2: Vector2d): number {
            return (0.5 + (this.Cross(vector2) / (this.magnitude * vector2.magnitude))) << 0;
        }

        //returns a new vector which is left hand normal to this vector
        GetLeftNormal(): Vector2d {
            var leftN = new Vector2d(-this.ab[1], this.ab[0]);
            return leftN;
        }

        //returns a new vector which is right hand normal to this vector
        GetRightNormal(): Vector2d {
            var rightN = new Vector2d(this.ab[1], -this.ab[0]);
            return rightN;
        }

        // ************************
        // ** Comparison methods **
        // ************************

        //returns true if equality test is successful between this vector and vector2
        IsEqualTo(vector2: Vector2d): boolean {
            return this.ab[0] == vector2.ab[0] && this.ab[1] == vector2.ab[1];
        }

        //returns true if normality test is successful beetween this vector and vector2
        IsNormalTo(vector2: Vector2d): boolean {
            return this.Dot(vector2) === 0;  
        }

        //returns true if parallelity test is successful beetween this vector and vector2
        IsParallelTo(vector2: Vector2d): boolean {
            return this.Cross(vector2) == 0;
        }

        //returns true if this vector perpendicular to the vector2
        IsPerpendicular(vector2: Vector2d): boolean {
            return this.Dot(vector2) == 0;
        }

        //returns true if this vector is in line with the vector2 (either in the same or the opposite direction)
        IsOnline(vector2: Vector2d): boolean {
            return (this.ab[0] * vector2.b - this.ab[1] * vector2.a == 0);
        }

        //returns true if this vector is collinear with the vector2
        IsCollinear(vector2: Vector2d): boolean {
            return (this.IsOnline(vector2) && this.Dot(vector2) > 0);
        }

        //returns true if this vector is opposite collinear with the vector2
        IsOppositeCollinear(vector2: Vector2d): boolean {
            return (this.IsOnline(vector2) && this.Dot(vector2) < 0);
        }

        //returns true if this vector has similar direction compared to the vector2.
        HasSameDirection(vector2: Vector2d): boolean
        {
            return this.Dot(vector2) > 0;    
        }

        //returns true if this vector has opposite direction compared to the vector2.
        HasOppositeDirection(vector2: Vector2d): boolean
        {
            return this.Dot(vector2) < 0;
        }

        // *******************
        // ** Query methods **
        // *******************

        //returns true if this vector is unit vector (normalized or normalised)
        IsUnit(): boolean {
            return this.magnitude == 1;
        }
        
        //returns true if all values of this vector is 0
        IsZero(): boolean {
            return this.ab[0] == 0 && this.ab[1] == 0;
        }

        //returns true if this vector is valid
        IsValid(): boolean {
            return !(Number.NaN == this.ab[0] || Number.NaN == this.ab[1]);
        } 

        // ***********************
        // ** Debugging methods **
        // *********************** 

        //logs this vector to the console
        Debug(): void {
            console.log(this.toString());
        }

        //draws the vector to the screen
        DrawDebug(ctx: CanvasRenderingContext2D, color: string, x: number, y: number) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + this.a, y + this.b);
            ctx.lineWidth = 5;
            ctx.strokeStyle = color;
            ctx.stroke();
            ctx.closePath();
        }

        //overrides the toSting method
        toString(): string {
            return "[" + this.a + ":" + this.b + "]";
        }

        // ********************
        // ** static methods **
        // ********************

        //zeros the given vector
        public static Zero(vector2: Vector2d): Vector2d {
            vector2.ab.set([0, 0]);
            return vector2;
        }

        //returns the magnitude of this vector
        public static Magnitude(vector2: Vector2d): number {
            return Math.sqrt(vector2.a * vector2.a + vector2.b * vector2.b);
        }

        //returns the square of this magnitude
        public static SquareMagnitude(vector2: Vector2d): number {
            return vector2.a * vector2.a + vector2.b * vector2.b;
        }

        //returns the angle in degrees between from and to.
        public static Angle(vector1: Vector2d, vector2: Vector2d): number {
            return (0.5 + (Math.acos(vector1.Dot(vector2) / (vector1.magnitude * vector2.magnitude)) * (180 / Math.PI))) << 0;
        }

        //returns a copy of vector with its magnitude clamped to maxLength.
        public static ClampMagnitude(vector1: Vector2d, maxLength: number): Vector2d {
            var coefficient: number = maxLength / Math.sqrt(vector1.a * vector1.a + vector1.b * vector1.b);
            return new Vector2d(vector1.a * coefficient, vector1.b * coefficient);
        }

        //returns the distance between vector1 and vector2.
        public static Distance(vector1: Vector2d, vector2: Vector2d): number {
            return vector1.Subtract(vector2).magnitude;
        }

        //dot Product of two vectors.
        public static DotProduct(vector1: Vector2d, vector2: Vector2d): number {
            return vector1.Dot(vector2);
        }

        //z-axis of cross product of two vectors.
        public static CrossProduct(vector1: Vector2d, vector2: Vector2d): number {
            return vector1.Cross(vector2);
        }
    } 

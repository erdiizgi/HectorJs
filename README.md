<img width="350px" src="http://erdiizgi.github.io/HectorJs/assets/img/logo.png" alt="HectorJs; Javascript and Typescript Vector2d Library">

###[Documentation](http://erdiizgi.github.io/HectorJs/ "Documentation of HectorJs Class") 

##HectorJs

HectorJs is a JavaScript vector class which is typed in Typescript thus; you can use it with both Typescript and JavaScript. HectorJs is specialized for 2D world and it has everything that you may need working with vectors.

####Why I have made it?

As you may know there are bunch of Vector2d Javascript Libraries. Why do I add one? Answer is simple; they are not adequate. 
I was preparing for a game jam that restricts the participants with 13kb. I mean the games could be only 13kb. With this reason, I needed a Vector2d Class -which can handle projections, normals and so on- instead of a physics engine. Like most of you, I don't like reinventing the wheel. When I searched for it, I couldn't find any beneficial one. Almost every library dedicated itself to define Vector addition and multiplication. So I wrote my own in the end.

####It is simple

There are TypeScript version,JavaScript version and JavaScript minified version in the sources.I mean this is just a class. So you can choose the most appropreite one from the sources/ directory and add it to your project basicly. 

####Usage

After you have added the file to your project, immediately you can create instances;

######Creating an instance:
```
var velocity = new Vector2d(); //velocity vector is [0:0] now
velocity.Set(5, 13); //velocity vector is [5,13] now
```
######OR
```
var velocity = new Vector2d(5, 13); //velocity vector is [5,13] now
```
######There are some static functions, too.
```
Vector2d.ClampMagnitude(velocity, 5); //It set the velocity vector as clamped with 5
```

On the [Documentation](http://erdiizgi.github.io/HectorJs/), you can find much more. Every function usage is explained there.

######Feel free to use this code as you wish, Have Fun!
######Please send bug reports to erdiizgi@gmail.com (You can send praise or gripes, too)

# Droplets

## Global Properties:

- *life*: how many frames a droplet has before it is instantly deleted
- *delay*: how many frames a droplet waits before beginning movement
- *dec*: is droplet decorative (if so, do not draw white core and remove from collision detection)

## Movements:

- **Still**: always at position *(x, y)*, without moving. Typically for warnings
- **Linear**: moves linearly from *(x, y)* to *(xf, yf)* in *length* amount of time
- **Kinematic**: starts at *(x, y)* and has velocity *<vx, vy>* and acceleration *<ax, ay>*, following normal kinematic motion
- **Parametric**: motion defined by function *para* that takes in argument *t* and outputs position *(x, y)*
- **Path**: motion defined by *path* of type Phaser.Curves.Path
- **Homing**: directed at player, with speed *speed*, strength *strength*, and time until homing stops *time*
- **Piecewise**: adding different movement objects, each with time *length*
- **Follow**: typically reserved for patterns, follows other droplets. Sometimes the followed droplet is invisible

## Trails:
- **None**: no trail
- **Follow**: trail of droplets that follow the path of the main droplet, with *length* number of droplets
- **Falling**: trail of droplets that fall as the main droplet drops them, with a *density* deteriming how frequently trailing droplets drop and *random* possible velocity and *grav* gravity
- **Fade**: trail of decorative droplets that stay in place and fade away over *easetime* time, at *density* determining how frequently these trailing droplets appear  

## Shape/Mechanics:

- **Plain**: simple circular droplet, radius *r* and glow color *col*
- **Ellipse**: elliptical droplet, major radius *r1*, minor radius *r2*, glow color *col*, and rotation *rot* (in radians, from horizontal major axis)
- **Star**: star-shaped droplet, radius *r* and glow color *col*. Typically 5 points
- **Invisible**: droplet with no collision or appearance, typically used for **Follow** movement
- **Pulsar**: circular droplet that pulses to the music, minimum radius *rmin*, maximum radius *rmax*, glow color *col*, and (optional) ease time *easetime*
- **Beam**: linear beam starting from *(x, y)* to *(xf, yf)*, with width *width*, glow color *col*, time on screen *length*, and ease time *easetime* (may implement curved beams?)
  - **Laser**: laser that grows with width *width*, glow color *col*, time on screen *length*, and follows either **Parametric** or **Path** movement (may remove if collision too difficult)
- **Text**: text that appears with value *text*, font size *size*, width *width*, color *col*, time on screen *length*, and fade time *easetime*

## Warnings:
- **Circle Warning**: circular glow-only droplet that fades in and out at position *(x, y)*, time *length*, delay *delay*, and fade time *easetime*, almost always **Still** motion
- **Line Warning**: slightly transparent line that fades in and out from positions *(x, y)* to *(xf, yf)*, with width *width*, time *length*, delay *delay* and fade time *easetime*, almost always **Still** motion.
- **Parametric Warning**: made of multiple line warnings with positions according to a function *para* that that takes in argument *t* and outputs position *(x, y)*. All line warnings have the same time *length*, delay *delay* and fade time *easetime* (might add sequentially fading in?)
- **Path Warning**: continuous path defined by *path* of type Phaser.Curves.Path, with time *length*, delay *delay*, and fade time *easetime*

## Patterns/Droplet Groups:
- **Burst**: single explosion of droplets from a point source *(x, y)*, can follow radial function patterns or have random velocities scattered along a range of angles (or a full circle). Typically follows a circle warning at the point source. 
  - **Firework**: **Burst** that comes after a droplet moving to the point source. Typically linear movement
  - **Pulsing Burst**: multiple explosions in sequence to the beat, appearing from a single pulsar droplet at the point source
- **Falling**: droplet falling at specific *x* value down, has associated y-velocity *vy* and gravity *grav*. Typically has a circle warning at the top of the screen at the *x* value
  - **Rain**: multiple **Falling** droplets that fall randomly for a specific period of time *length*. Typically has less gravity than a regular **Falling** droplet
  - **Scatter**: multiple **Falling** droplets that appear in sequence with a single "scatter droplet" appearing to drop them by moving to a random x-position at a specific *y*. 
- **Spinner**: droplets originating outward from a point source *(x, y)* in sequence with a specific step *angle*, creating a spinning effect
  - **Multi Spinner**: spinner, but each "spoke" can have multiple lines of droplets beside it
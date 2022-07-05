# Droplets

## Global Properties:

- *life*: how many frames a bullet has before it is instantly deleted
- *delay*: how many frames a bullet waits before beginning movement
- *dec*: is bullet decorative (if so, do not draw white core and remove from collision detection)

## Movements:

- Still: always at position *(x, y)*, without moving. Typically for warnings
- Linear: moves linearly from *(x1, y1)* to *(x2, y2)* in *length* amount of time
- Kinematic: starts at *(x, y)* and has velocity *<vx, vy>* and acceleration *<ax, ay>*, following normal kinematic motion
- Parametric: motion defined by function *para* that takes in argument *t* and outputs position *(x, y)*
- Path: motion defined by *path* of type Phaser.Curves.Path
- Homing: directed at player, with speed *speed*, strength *strength*, and time until homing stops *time*

## Trails:
- None: no trail
- Follow: trail of bullets that follow the path of the main bullet, with *length* number of bullets
- Falling: trail of bullets that fall as the main bullet drops them, with a *density* deteriming how frequently trailing bullets drop and *random* possible velocity and *grav* gravity
- Fade: trail of decorative bullets that stay in place and fade away over *easetime* time, at *density* determining how frequently these trailing bullets appear  

## Shape/Mechanics:

- Circle: simple circular droplet, radius *r* and glow color *col*
- Ellipse: elliptical droplet, major radius *r1*, minor radius *r2*, glow color *col*, and rotation *rot* (in radians, from horizontal major axis)
- Pulsar: circular droplet that pulses to the music, minimum radius *rmin*, maximum radius *rmax*, glow color *col*, and (optional) ease time *easetime*
- Beam: beam starting from *(x1, y1)* to *(x2, y2)*, with width *width*, glow color *col*, time on screen *length*, and ease time *easetime*
- Laser: laser that grows with width *width*, glow color *col*, time on screen *length*, and follows either **Parametric** or **Path** movement
- Text: text that appears with value *text*, font size *size*, width *width*, color *col*, time on screen *length*, and fade time *easetime*

## Warnings:
- Circle Warning: circular glow-only droplet that fades in and out at position *(x, y)*, time *length*, delay *delay*, and fade time *easetime*, almost always **Still** motion
- Line Warning: slightly transparent line that fades in and out from positions *(x1, y1)* to *(x2, y2)*, with time *length*, delay *delay* and fade time *easetime*, almost always **Still** motion.
- Parametric Warning: made of multiple line warnings with positions according to a function *para* that that takes in argument *t* and outputs position *(x, y)*. All line warnings have the same time *length*, delay *delay* and fade time *easetime* (might add sequentially fading in?)
- Path Warning: continuous path defined by *path* of type Phaser.Curves.Path, with time *length*, delay *delay*, and fade time *easetime*
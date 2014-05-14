[![view on npm](http://img.shields.io/npm/v/handbrake-js.svg)](https://www.npmjs.org/package/handbrake-js)
![npm module downloads per month](http://img.shields.io/npm/dm/handbrake-js.svg)
[![Build Status](https://travis-ci.org/75lb/handbrake-js.svg?branch=master)](https://travis-ci.org/75lb/handbrake-js)
[![Dependency Status](https://david-dm.org/75lb/handbrake-js.svg)](https://david-dm.org/75lb/handbrake-js)
![Analytics](https://ga-beacon.appspot.com/UA-27725889-6/handbrake-js/README.md?pixel)

#handbrake-js
Handbrake-js is a [node.js](http://nodejs.org) module wrapping [Handbrake](http://handbrake.fr) (v0.9.9) with a Javascript API, documented below.

Tested on Mac OSX, Ubuntu 14, Windows XP, Windows 8.1.

##Installation
###System Requirements
Just [node.js](http://nodejs.org). Every else is installed automatically.

###As a library 
Move into your project directory then run: 
```sh
$ npm install handbrake-js --save
```
*Mac / Linux users may need to run with `sudo`*.

Now you can begin encoding from your app. 

```js
var hbjs = require("handbrake-js");

hbjs.spawn({ input: "dope shit.avi", output: "dope shit.m4v", preset: "Android" })
  .on("error", function(err){
    // handle exception (invalid user input, no video found etc)
  })
  .on("progress", function(progress){
    console.log(
      "Percent complete: %s, ETA: %s", 
      progress.percentComplete, 
      progress.eta
    );
  });
```
###As a command-line app
From any directory run the following:
```sh
$ npm install -g handbrake-js
```
*Mac / Linux users may need to run with `sudo`*.

Now, you can call `handbrake` as you would HandbrakeCLI, using all the usual [options](https://trac.handbrake.fr/wiki/CLIGuide). This command will transcode an AVI to the more universal H.264 (mp4):
```sh
$ handbrake --input "some episode.avi" --output "some episode.mp4" --preset Normal
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


#handbrake-js API Documentation
handbrake-js package API



###hbjs.spawn(options, mocks)
Spawns a HandbrakeCLI process with the supplied [options](https://trac.handbrake.fr/wiki/CLIGuide), returning an instance of `Handbrake` which you can monitor for events.

All errors are delivered via the "error" event.

options { Object|Array } - [Options](https://trac.handbrake.fr/wiki/CLIGuide) to pass directly to HandbrakeCLI
mocks { Object } - mocks - Optional mock objects, for testing




##class: Handbrake

##hbjs.run()
begin the encode.. attach desired listeners before running



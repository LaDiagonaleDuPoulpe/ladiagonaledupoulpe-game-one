# ladiagonaledupoulpe-game-one
Game one, with js coding
m install -D typescript webpack webpack-cli ts-loader phaser live-server 

Reminder : 
See semver for more details about specifying version ranges.

version Must match version exactly
>version Must be greater than version
>=version etc
<version
<=version
~version “Approximately equivalent to version” See semver
^version “Compatible with version” See semver
1.2.x 1.2.0, 1.2.1, etc., but not 1.3.0
http://... See ‘URLs as Dependencies’ below
* Matches any version
"" (just an empty string) Same as *
version1 - version2 Same as >=version1 <=version2.
range1 || range2 Passes if either range1 or range2 are satisfied.
git... See ‘Git URLs as Dependencies’ below
user/repo See ‘GitHub URLs’ below
tag A specific version tagged and published as tag See npm-dist-tag
path/path/path See Local Paths below

## 2. creation main class and custom game class
two class to start with phaser 
adding config, and resize event

## 3. creating logger, environment class, searching to use a di injector with typescript
environment class is ready
searching for di motor 
trying: https://github.com/microsoft/tsyringe
needs : https://www.npmjs.com/package/reflect-metadata
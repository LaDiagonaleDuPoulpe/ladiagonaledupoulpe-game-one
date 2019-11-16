const cbDirection = document.getElementById('cbdirection');



var config = {
    type: Phaser.WEBGL,
    width: 1960,
    height: 1080,
    backgroundColor: '#ababab',
    parent: 'la-diagonale-du-poulpe',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var anims = {
    walk: {
        startFrame: 0,
        endFrame: 4,
        speed: 0.15
    }
};

var directions = {
    west: { offset: 4, x: 0, y: 0, opposite: 'east' },
    northWest: { offset: 32, x: -2, y: -1, opposite: 'southEast' },
    north: { offset: 12, x: 0, y: 0, opposite: 'south' },
    northEast: { offset: 96, x: 2, y: -1, opposite: 'southWest' },
    east: { offset: 8, x: 0, y: 0, opposite: 'west' },
    southEast: { offset: 160, x: 2, y: 1, opposite: 'northWest' },
    south: { offset: 0, x: 0, y: 0, opposite: 'north' },
    southWest: { offset: 224, x: -2, y: 1, opposite: 'northEast' }
};

var octopuses = [];

function preload() {
    this.load.spritesheet('octopus', 'images/octo-8-0.png', { frameWidth: 322, frameHeight: 361 });
}

function create() {
    const scene = this;
    
    var Octopus = new Phaser.Class({
        
        Extends: Phaser.GameObjects.Image,
        
        initialize:
        
        function Octopus (scene, x, y, motion, direction, distance)
        {
            this.startX = x;
            this.startY = y;
            this.distance = distance;
            
            this.motion = motion;
            this.anim = anims[motion];
            this.direction = directions[direction];
            this.speed = 1;
            this.f = this.anim.startFrame;
            
            Phaser.GameObjects.Image.call(this, scene, x, y, 'octopus', this.direction.offset + this.f);
            
            this.depth = y + 64;
            
            scene.time.delayedCall(this.anim.speed * 1000, this.changeFrame, [], this);
        },
        changeFrame: function() {
            this.f++;

            var delay = this.anim.speed;

            if (this.f === this.anim.endFrame)
            {
                switch (this.motion)
                {
                    case 'walk':
                        this.f = this.anim.startFrame;
                        this.frame = this.texture.get(this.direction.offset + this.f);
                        scene.time.delayedCall(delay * 1000, this.changeFrame, [], this);
                        break;
                }
            } else {
                this.frame = this.texture.get(this.direction.offset + this.f);
                
                scene.time.delayedCall(delay * 1000, this.changeFrame, [], this);
            }

        },
        changeDirection: function(newDirection) {
            this.direction = directions[newDirection];
            this.update();
        },
        update: function ()
        {
            if (this.motion === 'walk')
            {
                this.x += this.direction.x * this.speed;
                
                if (this.direction.y !== 0)
                {
                    this.y += this.direction.y * this.speed;
                    this.depth = this.y + 64;
                }
                
                // //  Walked far enough?
                if (Phaser.Math.Distance.Between(this.startX, this.startY, this.x, this.y) >= this.distance)
                {
                    this.direction = directions[this.direction.opposite];
                    this.f = this.anim.startFrame;
                    this.frame = this.texture.get(this.direction.offset + this.f);
                    this.startX = this.x;
                    this.startY = this.y;
                }
            }
        }
    });
    
    octopuses.push(this.add.existing(new Octopus(this, 400, 500, 'walk', 'east', 100)));
    
    this.cameras.main.setSize(1600, 800);
}

function update() {
    octopuses.forEach(function (octopus) {
        octopus.update();
    });
}


cbDirection.onchange = function() {
    octopuses.forEach(octo => {
        octo.changeDirection(cbDirection.value);
    }, this);
}

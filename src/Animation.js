class Animation {

    constructor(
        container,
        map,
        res,
        background_color

    ){
        this.w = container.getBoundingClientRect().width;
        this.h = container.getBoundingClientRect().height;

        this.map = map
        this.res = res

        this.background_color = background_color
    }

    // blackhole(
    //     callBack
    // ){

    //     // Using arrow functions to maintain the context of 'this'
    //     new p5(p => {
    //         p.setup = () => {
    //             p.createCanvas(this.w, this.h).parent(container);
    //         }
            
    //         p.draw = () => {
    //             p.background(this.background_color);
                
    //             for (let i = 0; i < this.map.length; i++) {
    //                 let cell = this.map[i];
    //                 p.fill(cell.color);
    //                 p.noStroke();
    //                 p.rect(cell.x, cell.y, this.res, this.res);
    //             }

    //         }
    //     }, container);
    // }

    // blackhole(callBack) {
    //     let blackHole = { x: this.w / 2, y: this.h / 2 };
    //     let blackHoleStrength = 10000;
    //     let blackHoleRadius = 50;
    //     let maxForce = 1000; // Maximum force to apply to cells
        
    //     new p5(p => {
    //         p.setup = () => {
    //             p.createCanvas(this.w, this.h).parent(container);
    //         };
    
    //         p.draw = () => {
    //             p.background(this.background_color);
    
    //             for (let i = 0; i < this.map.length; i++) {
    //                 let cell = this.map[i];
    
    //                 // Calculate the force vector towards the black hole
    //                 let force = p.createVector(blackHole.x - cell.x, blackHole.y - cell.y);
    
    //                 // Apply a threshold to avoid division by zero
    //                 let distance = p.max(1, force.mag());
    
    //                 // Normalize the force vector and scale it by the black hole strength
    //                 force.normalize().mult(p.min(blackHoleStrength / distance, maxForce));
                    
    //                 // Update cell position
    //                 cell.x += force.x;
    //                 cell.y += force.y;
    
    //                 // Remove cell if it is within the black hole radius
    //                 if (p.dist(cell.x, cell.y, blackHole.x, blackHole.y) < blackHoleRadius) {
    //                     this.map.splice(i, 1);
    //                     i--;
    //                 }
    
    //                 p.fill(cell.color);
    //                 p.noStroke();
    //                 p.rect(cell.x, cell.y, this.res, this.res);
    //             }
    
    //             if (this.map.length === 0) {
    //                 callBack();
    //                 p.noLoop(); // Stop the draw loop
    //             }
    //         };
    //     }, container);
    // }
    

    blackhole(callBack) {
        let blackHole = { x: this.w / 2, y: this.h / 2 };
        let blackHoleStrength = 10000;
        let blackHoleRadius = 50;
        let maxForce = 1000; // Maximum force to apply to cells
        
        new p5(p => {
            p.setup = () => {
                p.createCanvas(this.w, this.h).parent(container);
            };
    
            p.draw = () => {
                p.background(this.background_color);
    
                for (let i = 0; i < this.map.length; i++) {
                    let cell = this.map[i];
    
                    // Calculate the force vector towards the black hole
                    let force = p.createVector(blackHole.x - cell.x, blackHole.y - cell.y);
    
                    // Apply a threshold to avoid division by zero
                    let distance = p.max(1, force.mag());
    
                    // Normalize the force vector and scale it by the black hole strength
                    force.normalize().mult(p.min(blackHoleStrength / distance, maxForce));
                    
                    // Update cell position
                    cell.x += force.x;
                    cell.y += force.y;
    
                    // Remove cell if it is within the black hole radius
                    if (p.dist(cell.x, cell.y, blackHole.x, blackHole.y) < blackHoleRadius) {
                        this.map.splice(i, 1);
                        i--;
                    }
    
                    p.fill(cell.color);
                    p.noStroke();
                    p.rect(cell.x, cell.y, this.res, this.res);
                }
    
                if (this.map.length === 0) {
                    callBack();
                    p.noLoop(); // Stop the draw loop
                }
            };
        }, container);
    }
    

    dmt(callBack) {
        let ripples = [];
        let maxRipples = 10;
        let rippleSpeed = 2;
    
        new p5(p => {
            p.setup = () => {
                p.createCanvas(this.w, this.h).parent(container);
                for (let i = 0; i < this.map.length; i++) {
                    let cell = this.map[i];
                    ripples.push({ pos: p.createVector(cell.x, cell.y), radius: 0, alpha: 255, color: cell.color});
                }                
            };
    
            p.draw = () => {
                p.background(this.background_color);
                for (let i = ripples.length - 1; i >= 0; i--) {
                    let ripple = ripples[i];
                    ripple.radius += rippleSpeed;
                    ripple.alpha -= 50;
                    p.stroke(ripple.color);
                    p.noFill();
                    p.ellipse(ripple.pos.x, ripple.pos.y, ripple.radius * 2);
                    if (ripple.alpha <= 0) {
                        ripples.splice(i, 1);
                    }
                }
                if (ripples.length === 0) {
                    callBack();
                    p.noLoop();
                }
            };
        }, container);
    }
        
    
    
   
    particleSwarm(callBack) {
        let particles = [];
        let attractors = [];
        let attractorChangeInterval = 10; // frames (1 second at 60 FPS)
        let frameCount = 0;
        let animationDuration = 60; // 1 second at 60 FPS
        let speedMultiplier = 30; // Increase the speed of particles
    
        new p5(p => {
            p.setup = () => {
                p.createCanvas(this.w, this.h).parent(container);
                for (let i = 0; i < this.map.length; i++) {
                    let cell = this.map[i];
                    particles.push({
                        pos: p.createVector(cell.x, cell.y),
                        vel: p.createVector(0, 0),
                        color: cell.color
                    });
                }

                // attractors.push(p.createVector(p.mouseX, p.mouseY));

                cs(attractors)
            };
    
            p.draw = () => {
                p.background(this.background_color);
                frameCount++;
                if (frameCount % attractorChangeInterval === 0) {
                    attractors[0] = p.createVector(p.random(this.w), p.random(this.h));
                }
                for (let i = 0; i < particles.length; i++) {
                    let particle = particles[i];
                    let force = p5.Vector.sub(attractors[0], particle.pos);
                    force.setMag(0.1 * speedMultiplier);
                    particle.vel.add(force);
                    particle.vel.limit(2 * speedMultiplier);
                    particle.pos.add(particle.vel);
                    p.fill(particle.color);
                    p.noStroke();
                    p.ellipse(particle.pos.x, particle.pos.y, 4);
                }
                if (frameCount > animationDuration) {
                    callBack();
                    p.noLoop();
                }
            };
        }, container);
    }
    
    
    meteorShower(callBack) {
        let meteors = [];
    
        new p5(p => {
            p.setup = () => {
                p.createCanvas(this.w, this.h).parent(container);
                for (let i = 0; i < this.map.length; i++) {
                    let cell = this.map[i];
                    meteors.push({
                        pos: p.createVector(cell.x, p.random(-100, -10)),
                        vel: p.createVector(p.random(-2, 2), p.random(2, 5)),
                        color: cell.color
                    });
                }
            };
    
            p.draw = () => {
                p.background(this.background_color);
                for (let i = meteors.length - 1; i >= 0; i--) {
                    let meteor = meteors[i];
                    meteor.pos.add(meteor.vel);
                    p.fill(...meteor.color);
                    p.noStroke();
                    p.ellipse(meteor.pos.x, meteor.pos.y, 4);
                    p.stroke(...meteor.color);
                    p.line(meteor.pos.x, meteor.pos.y, meteor.pos.x - meteor.vel.x * 10, meteor.pos.y - meteor.vel.y * 10);
                    if (meteor.pos.y > this.h) {
                        meteors.splice(i, 1);
                    }
                }
                if (meteors.length === 0) {
                    callBack();
                    p.noLoop();
                }
            };
        }, container);
    }
    

    growingTree(callBack) {
        let branches = [];
        let maxDepth = 8;
        let branchAngle = p.PI / 4;
        let branchLength = 100;
    
        function branch(start, depth, angle, length, color, p) {
            if (depth === 0) return;
            let end = p.createVector(
                start.x + length * p.cos(angle),
                start.y + length * p.sin(angle)
            );
            branches.push({ start, end, color });
            branch(end, depth - 1, angle - branchAngle, length * 0.67, color, p);
            branch(end, depth - 1, angle + branchAngle, length * 0.67, color, p);
        }
    
        new p5(p => {
            p.setup = () => {
                p.createCanvas(this.w, this.h).parent(container);
                for (let i = 0; i < this.map.length; i++) {
                    let cell = this.map[i];
                    branch(p.createVector(cell.x, cell.y), maxDepth, -p.PI / 2, branchLength, cell.color, p);
                }
            };
    
            p.draw = () => {
                p.background(this.background_color);
                for (let i = 0; i < branches.length; i++) {
                    let branch = branches[i];
                    p.stroke(...branch.color);
                    p.line(branch.start.x, branch.start.y, branch.end.x, branch.end.y);
                }
                if (branches.length === 0) {
                    callBack();
                    p.noLoop();
                }
            };
        }, container);
    }
    

}
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
    


}
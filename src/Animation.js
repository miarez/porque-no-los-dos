class Animation {

    static render(
        map_object,
        callBack
    ){

        let animationStarted = false;
        let blackHole = { x: window.innerWidth / 2, y: window.innerHeight / 2, radius: 50 };
        let blackHoleStrength = 10;
        let res = 10;
        let wiggleDecayFactor = 0.99; // Decay factor for wiggle

        let height = map_object.height 
        let width = map_object.width 
        let map = map_object.map 
        new p5(p => {
            p.setup = function() {
                p.createCanvas(width, height);
                animationStarted = true;
            }
            
            p.draw = function() {

                if (animationStarted) {
                    p.background(50);

                    blackHoleStrength += 0.9;

                    // Apply gravitational force toward the black hole with decaying wiggle
                    for (let i = 0; i < map.length; i++) {
                        let cell = map[i];
                
                        if(cell.wiggleX ==undefined){
                            cell.wiggleX = Math.random() * 10 - 5
                        }

                        if(cell.wiggleY ==undefined){
                            cell.wiggleY = Math.random() * 10 - 5
                        }


                        let forceX = blackHole.x - cell.x;
                        let forceY = blackHole.y - cell.y;

                        // Normalize the force to make it a unit vector
                        let distance = p.dist(cell.x, cell.y, blackHole.x, blackHole.y);
                        forceX /= distance;
                        forceY /= distance;

                        // Apply the force with added wiggle effect and black hole strength
                        cell.x += (forceX * blackHoleStrength) + cell.wiggleX;
                        cell.y += (forceY * blackHoleStrength) + cell.wiggleY;

                        // Decay the wiggle over time
                        cell.wiggleX *= wiggleDecayFactor;
                        cell.wiggleY *= wiggleDecayFactor;

                        // Check if the cell is close enough to the black hole to be considered swallowed
                        if (p.dist(cell.x, cell.y, blackHole.x, blackHole.y) < blackHole.radius) {
                            // Remove the cell from the map when it reaches the event horizon
                            map.splice(i, 1);
                            i--; // Adjust the loop counter after removing an element
                        }

                        // Display the pixel at the updated position
                        p.fill(cell.color);

                        p.noStroke();
                        p.rect(cell.x, cell.y, res, res);
                    }

                    // Check if all cells have been sucked into the black hole
                    if (map.length === 0) {
                        callBack()
                        p.noLoop(); // Stop the draw loop
                    }
                }
            }
        }, container);
    }

}
// step 2 : creating the component, create init and shootenemybullet function
// attaching to the entity in the index.html file
AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        /*
      step 4:   we will be using the setInterval() method so that we can call the
function to shoot enemy bullets continuously.
        */
        setInterval(this.shootEnemyBullet, 2000)
    },
    shootEnemyBullet: function () {

        //step 6: get all enemies using className
        // we will get 2 enemies for els variable
        var els = document.querySelectorAll(".enemy");

   // step 7: loop through all the elements to create the bullet entity for each one of them.

        for (var i = 0; i < els.length; i++) {           

            //enemyBullet entity
            var enemyBullet = document.createElement("a-entity");

            enemyBullet.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.1,
            });

            enemyBullet.setAttribute("material", "color", "#282B29");

            var position = els[i].getAttribute("position")

            enemyBullet.setAttribute("position", {
                x: position.x + 1.5,
                y: position.y + 3.5,
                z: position.z,
            });

            var scene = document.querySelector("#scene");
            scene.appendChild(enemyBullet);

     // step 9: We need two THREE.Vector3() variables in which we can store the
        //position of the enemy object and the player object.
            var position1 = new THREE.Vector3();
            var position2 = new THREE.Vector3();
            
     // step 8: We are going to use the Three.js method to find the direction vector.
        // For this first we will be getting the position as a Three.js object.

            //shooting direction
            var enemy = els[i].object3D;
            var player = document.querySelector("#weapon").object3D;
    // step 10: We can use the getWorldPosition() method of the three.js library to store
        //the value of player position and enemy position as vectors.


            player.getWorldPosition(position1);
            enemy.getWorldPosition(position2);
    // step 11: (refer doc before this explain diagram)
    // Now to get the direction vector from any two players, we need to use
     //subVectors() method which gives the result after subtracting two vectors.
            //set the velocity and it's direction
            var direction = new THREE.Vector3();
        // We use .normalize() to get the unit vector that is the direction vector of length 1.

            direction.subVectors(position1, position2).normalize();

            enemyBullet.setAttribute("velocity", direction.multiplyScalar(10));
     // step 12: Set dynamic-body attribute of the enemy bullet entity.
            enemyBullet.setAttribute("dynamic-body", {
                shape: "sphere",
                mass: "0",
            });
     // step 13: Select the countLife text to update the player life count.
            var element = document.querySelector("#countLife");
            var playerLife = parseInt(element.getAttribute("text").value);
    // step 14 : Add the collide event listener to check if the weapon element has been hit.
            //collide event on enemy bullets
            enemyBullet.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon") {
    // step 15 : Decrease the player’s life and update the text attribute.
                    if (playerLife > 0) {
                        playerLife -= 1;
                        element.setAttribute("text", {
                            value: playerLife
                        });
                    }
    // step 17: Once the player life is zero, we can show the over text and remove all the
                // tank elements from the scene.
                    if (playerLife <= 0) {
                        //show text
                        var txt = document.querySelector("#over");
                        txt.setAttribute("visible", true);

                        //remove tanks                        
                        var tankEl = document.querySelectorAll(".enemy")

                        for (var i = 0; i < tankEl.length; i++) {
                            scene.removeChild(tankEl[i])

                        }
                    }

                }
            });
            
        }
    },

});



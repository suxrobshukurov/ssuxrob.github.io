let view = {
    displayMessage: function(msg) {
        let messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayMiss: function(location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    },
    displayHit: function(location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    }
};

let model = {
    boardSize: 7,
    numShips: 3,
    shipsSunk: 0,
    shipLength: 3,

    ships: [
        { locations: [0, 0, 0], hits: ["", "", ""] },
        { locations: [0, 0, 0], hits: ["", "", ""] },
        { locations: [0, 0, 0], hits: ["", "", ""] }
    ],
    fire: function(guess) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            let index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("Вы попали по кораблю!");
                controller.guesses++;
                if (this.isShunk(ship)) {
                    view.displayMessage("Вы уничтожали корабль!")
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("Вы промахнулись.");
        controller.guesses++;
        return false;
    },

    isShunk: function(ship) {
        for (let i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    },

    generateShipLocations: function() {
        let locations;
        for (let i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            } while (this.collision(locations));
            this.ships[i].locations = locations
        }
        console.log("Ships array: ");
        console.log(this.ships);
    },

    generateShip: function() {
        let direction = Math.floor(Math.random() * 2);
        let row, col;

        if (direction === 1) { // horizontal
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
        } else { // vertical
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
            col = Math.floor(Math.random() * this.boardSize);
        }

        let newShipLocations = [];
        for (let i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i));
            } else {
                newShipLocations.push((row + i) + "" + col);
            }
        }
        return newShipLocations;
    },

    collision: function(locations) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            for (let j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    }
};

let controller = {
        guesses: 0,
        processGuess: function(guess) {
            // let location = parseGuess(guess);
            let location = guess;
            if (location) {

                // this.guesses++;
                let hit = model.fire(location);
                if (hit && model.shipsSunk === model.numShips) {
                    view.displayMessage("Вы потопили все коробли за " + this.guesses + " выстрелов");
                }
            }
        }
    }
    /*
    function parseGuess(guessUser) {
        let guess = guessUser.toUpperCase();
        let alphabet = ["A", "B", "C", "D", "E", "F", "G"];
        if (guess === null || guess.length !== 2) {
            alert("Ой, пожалуйста, введите букву и цифру на доске.");
        } else {
            let firstChar = guess.charAt(0);
            let row = alphabet.indexOf(firstChar);
            let column = guess.charAt(1);

            if (isNaN(row) || isNaN(column)) {
                alert("Упс, этого нет на доске.");
            } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
                alert("Упс, ваши кординаты не помешаются в доску.");
            } else {
                return row + column;
            }
        }
        return null;
    }

    function init() {
        let fireButton = document.getElementById("fireButton");
        fireButton.onclick = handleFireButton;
        let guessInput = document.getElementById("guessInput");
        guessInput.onkeydown = handleKeyPress;
    }

    function handleFireButton() {
        let guessInput = document.getElementById("guessInput");
        let guess = guessInput.value;

        controller.processGuess(guess);
        guessInput.value = "";
    }

    function handleKeyPress(e) {
        let fireButton = document.getElementById("fireButton");
        if (e.keyCode === 13) {
            fireButton.click();
            return false;
        }
    }
    */

function init() {
    model.generateShipLocations();
}

function parseGuessOnClick() {
    let guessId = String(event.target.id);
    controller.processGuess(guessId);
}
window.onload = init;
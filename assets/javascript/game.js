$(document).ready(function() {

    $("#restart").hide();
    $("#feedback").text("Click a crystal to guess a number!");

    // Random number generator: It will be used for the crystals' values and the goal number.
    function getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // Get random number for the target number
    var numGoal = getRandom(19, 120);

    function clearGame() {
        hasWon = false;
        counter = 0;
        var numGoal = getRandom(19, 120);
        $("#feedback").text("Click a crystal to guess a number!");
        $("#feedback-score").text(" ");
        $("#number-to-guess").text(numGoal);
        $("#crystals").empty();
    }

    function makeCrystals() {
        // Tell the game how many crystals we want 
        var crystalQuantity = 4;

        // Next we create a for loop to create crystals for every numberOption.
        for (var i = 0; i < crystalQuantity; i++) {

            // For each iteration, we will create an image and container
            var imageCrystal = $("<img>");
            var divCrystalContainer = $("<div>")
            var divCrystal = $("<div>");

            // Get random number for each crystal value
            var numCrystal = getRandom(1, 12);

            // First each crystal container will be given the class ".crystal"
            // This will allow the CSS to take effect.
            divCrystalContainer.addClass("crystal-container")
            divCrystal.addClass("crystal");

            // Each crystal will be given a src link to the crystal image, and the container gets a corresponding id
            imageCrystal.attr("src", "assets/images/crystal" + i + ".gif");
            divCrystal.attr("id", "crystal" + i);

            // Each imageCrystal will be given a data attribute called data-crystalValue.
            // This data attribute will be set equal to the array value.
            divCrystal.attr("data-crystalvalue", numCrystal);
            divCrystalContainer = divCrystalContainer.append(divCrystal);

            // Lastly, each crystal image (with all its classes and attributes) will get added to the page, inside of its associated container.
            $("#crystals").append(divCrystalContainer);
            $("#crystal" + i).append(imageCrystal);
        }

        // this initiates the css animation effects for crystal image. The containers' animations are handled by css :hover
        $(".crystal").hover(function() {
            $(this).children("img").toggleClass("crystal-focus");
        });
    }

    function takeTurn(thisCrystal) {
        if (hasWon) {
            return;
        };
        // Determining the crystal's value requires us to extract the value from the data attribute.
        // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
        // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
        // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter
        // We then add the crystalValue to the user's "counter" which is a global variable.
        // Every click, from every crystal adds to the global counter.
        counter += thisCrystal;
        console.log("takeTurn, counter: " + counter + ", this data-crystalvalue " + thisCrystal);
        // All of the same game win-lose logic applies. So the rest remains unchanged.
        //$("#feedback").text("New score: " + counter);
        $("#feedback").text("Your Score:");
        $("#feedback-score").text(counter);

        if (counter === numGoal) {
            $(".crystal").off("click");
            $("#feedback-score").text("You win!");
            $("#restart").show();
            hasWon = true;
        } else if (counter >= numGoal) {
            $(".crystal").off("click");
            $("#feedback-score").text("You lose! Good day sir!");
            $("#restart").show();
        }
    }

    function activate() {
        $(".crystal").on("click", function() {
            var thisCrystal = $(this);
            var crystalValue = (thisCrystal.attr("data-crystalvalue"));
            crystalValue = parseInt(crystalValue);
            takeTurn(crystalValue);
            console.log("crystalValue: " + crystalValue + ", click event counter: " + counter);
        });
    }

    clearGame();
    makeCrystals();
    activate();

    // reset variables and feedback to start a new game.
    $("#restart").mousedown(function() {
        $(this).addClass("btn-down");
    });
    $("#restart").mouseup(function() {
        $(this).removeClass("btn-down");
        $(this).hide();
        clearGame();
        makeCrystals();
        activate();
    });

});

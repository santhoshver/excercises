var rl = require("readline");

function CalculateReading (givenVal) {

    // Makes sure that the given reading is greater than 0 and within range of 5 digits
    if(givenVal > 0 && givenVal < 99999){

        // Tracks the actual reading and dummy reading
        var actualVal = 1, wrongVal = 1;

        // Looping through the actual reading to reach out the current reading
        for(wrongVal=1; wrongVal<givenVal; actualVal++){
            var value = wrongVal + 1;

            // Check if the value contains the digit '4'
            var str = value.toString();
            if(str.indexOf('4') >= 0){
                // Replaces the '4' by '5'
                wrongVal = parseInt(str.replace(/4/g, '5'));
            } else {
                // Else, keeps the value unchanged
                wrongVal = value;
            }
        }
        console.log(`If odometer shows \x1b[31m ${givenVal}, \x1b[37m actual reading is \x1b[32m ${actualVal} \x1b[37m`);
    } else {
        console.error('\x1b[31mThe range should be from 1 to 99999\x1b[37m');
    }
};

// Asked in problem
CalculateReading(56287);

// Let's try any other reading value.
var prompts = rl.createInterface(process.stdin, process.stdout);
prompts.question("Enter another one...", function (reading) {
    CalculateReading(reading);
    process.exit();
});

// File system library is needed to fetch the development.log file
var fs = require('fs');

// Fetch the file from local server
function GetFile() {
    fs.readFile('development.log', 'utf8', function (err, data) {
        ParseFile(data);
    });
};

function ParseFile(rawTxt) {

    var data = [];
    // I found this word "Processing by" is a common one, so I am using this.
    var textArr = rawTxt.split("Processing by");

    for (var i = 0; i <= textArr.length; i++) {
        // First item will be an empty text, so I don't need it.
        if (i > 0 && textArr[i]) {
            var str = textArr[i].trim();
            // A sample log entry will be like this: "Processing by StoriesController#show as JSONAPI"
            // Here by splitting '#', I am guessing the controller name and its action
            var logger = str.slice(0, str.indexOf(' ')).split('#');
            (logger && logger.length) ? ProcessTheLog(data, logger) : null;

        }
    }
     // Sort the logs in alphabetical order */
     data.sort(function (a, b) {
        if (a.ctrlName < b.ctrlName) return -1;
        if (a.ctrlName > b.ctrlName) return 1;
        return 0;
    });

    LogOutput(data);
};

function LogOutput(data) {
    var str = '';
    data.forEach(function (obj, index) {
        str += ('\n \x1b[32m' + obj.ctrlName + '\x1b[37m => \x1b[31m' + (obj.actionTaken.toUpperCase()) + '\x1b[37m action ran \x1b[32m' + obj.times + '\x1b[37m times. \n');
    });
    // Logs out the output
    console.log(str);
}

function CheckIfControllerExists(data, logger) {
    return data.findIndex(function (obj) {
        return obj.ctrlName === logger[0] && obj.actionTaken === logger[1];
    });
}

function ProcessTheLog(data, logger) {
    var isExists = CheckIfControllerExists(data, logger);
    if (isExists >= 0) {
        data[isExists].times++;
    } else {
        data.push({
            ctrlName: logger[0],
            actionTaken: logger[1],
            times: 1
        });
    }
}

GetFile();
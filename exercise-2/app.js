
var rl = require('readline');
var fs = require('fs');

// Rx is needed to handle the aysnc events
var rx = require('rx');


// Initializes the indices, will be filled later while reading the file line by line
var list = [];
for(var i=0; i<=99; i++){
    list[i] = 0;
}

/** Instead of reading the whole file at once,  
 * creating a stream of interface to read the file line by line. */
var reader = rl.createInterface({
    input: fs.createReadStream('numbers.txt')
});
console.log('Begins the file read...');

// Capture the async events through observables
var lineReadEvent = rx.Observable.fromEvent(reader, 'line');
var eventEnds = rx.Observable.fromEvent(reader, 'close');
var fileReader$ = lineReadEvent.takeUntil(eventEnds);

// Increases the occurrences at their current index
function updateCount(number){
    list[number]++;
}

// Err handler for file reading
function errHanlder(){
    console.log('An unknown error occured!');
}

// Writes the sorted values into the file
function write(){
    console.log('Begins the file write...');
    // Creates a stream to write into a file, without opening the file at once
    var sortedFile = fs.createWriteStream('sorted.txt');
        for(var index=0; index<list.length; index++){
            for(var count=0; count<list[index]; count++){
                sortedFile.write(index + ' \n');
            }
        }
        // End of the stream
        sortedFile.end();
        console.log('Check the output file', '\x1b[32m', 'sorted.txt', '\x1b[37m');
}

// Subscribing for the event when each line readed, and writes into the file
fileReader$.subscribe(updateCount, errHanlder, write);
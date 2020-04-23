$(document).ready(function () {
    const socket = io();
    socket.on('connect', function () {
        console.log("Socket connected");
    });

    let currentEntry = ''
    // TODO: Move the solution checking portion to server side
    let solution = '111111111111'
    // let solution = '314101894245'

    addEntry = function(submittedNumber) {
        if (currentEntry.length < 12) {
            currentEntry += submittedNumber;
            updateDisplay();
        }
    }

    removeEntry = function() {
        if (currentEntry.length > 0) {
            currentEntry = currentEntry.substr(0, currentEntry.length - 1)
            updateDisplay();
        }
    }

    submitEntry = function() {
        
        if(currentEntry.length == 12) {
            if(currentEntry == solution) {
                escape();
            } else {
                console.log('wrong answer')
                for (let i = 0; i < currentEntry.length; i++) {
                    if (currentEntry[i] == solution[i]) {
                        $(`#entry-${i + 1}`).removeClass('btn-danger');
                        $(`#entry-${i + 1}`).addClass('btn-success');
                    }
                }
                setTimeout(clearDisplay, 150);
            }            
        } else {
            alert("You idiot, the number isn't event filled up")
        }
    }

    updateDisplay = function(entry) {
        if(!entry) entry = currentEntry
        for (let i = 0; i < 12; i++) {
            $(`#entry-${i + 1}`).removeClass('btn-success');
            $(`#entry-${i + 1}`).addClass('btn-danger');
            if (entry[i]) {
                $(`#entry-${i + 1}`).html(`${entry[i]}`);
            } else {
                $(`#entry-${i + 1}`).html('_');
            }
        }
    }

    clearDisplay = function() {
        currentEntry = ''
        updateDisplay();
    }

    escape = function() {
        window.alert("You did it! You're all out of the room. Congrats! \nNow go out and inform the world of the professor's atrocities!")
        socket.emit('command', 'ESCAPE');
    }


});


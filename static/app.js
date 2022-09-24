const $form = $("add-word");
const $timer = $("timer");

async function post_word(evt) {
    evt.preventDefault();
    button = evt.target;
    let word = $('.word').val()
    
    await axios.post("localhost:5000/", {word});
    console.log('DONE!')
}

$form.on('submit', post_word);

function timer() {
    //time 
}

function timeUp() {
    //reset timer
}
setTimeout(timeUp, 60000)
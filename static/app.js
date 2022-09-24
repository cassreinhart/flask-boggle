const $form = $(".add-word");
const $timer = $(".timer");

async function post_word(evt) {
    evt.preventDefault();
    button = evt.target;
    let word = $('.word').val()
    
    let response = await axios.post("http://127.0.0.1:5000/check-word", {word});
    console.log('DONE!', response)
}

$form.on('submit',  post_word);

function timer() {
    //time 
}

function timeUp() {
    //reset timer
}
setTimeout(timeUp, 60000)
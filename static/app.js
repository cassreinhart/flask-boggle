const $form = $(".add-word");
const $timer = $(".timer");

function handleSubmit(evt) {
    evt.preventDefault();
    button = evt.target;
    let word = $('.word').val()
    
    post_word(word);
    
}

async function post_word(word) {
    $('.messages').innerText('');

    let response = await axios.post("/check-word", {word});
    console.log('DONE!', response)

    $('.messages').innerText(response.data.result); //is there a better way?
    if (response.data.result === 'ok') {
        let score = word.length;
        post_score(score);
        $('.list').append(word);
        
    }
    // timer();
}

$form.on('submit', handleSubmit);

async function post_score(score) {
    
    let response = await axios.post('/update-score', {score}); 
    console.log('done', response)

}

// class BoggleGame {
//     constructor(boardId, seconds = 60) {
//         this.seconds = seconds;
//         this.showTimer();
//         this.timer = setInterval(this.tick.bind(this), 1000);
//         this.score = 0;
//         this.words = new Set();
//         this.board = $("#" + boardId)

//         $(".add-word", this.board).on('submit', this.handleSubmit.bind(this));
//     }

//     showPlayedWord(word) {
//         $
//     }
// }
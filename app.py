from boggle import Boggle
from flask import Flask, session, flash, render_template, request, jsonify
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = 'bogglerocks123'

debug = DebugToolbarExtension(app)
boggle_game = Boggle()

@app.route('/')
def show_home_page():
    """show home page and store data to sessions"""
    board = boggle_game.make_board();
    session['board'] = board
    highscore = session.get('highscore', 0)
    num_plays = session.get('num_plays', 0)

    return render_template('index.html', board=board, highscore=highscore, num_plays=num_plays) #not passing in board since it is in session dict


@app.route('/check-word', methods=['POST'])
def check_word():
    """handle submission of word"""
    word = request.json['word']
    board = session['board']
    result = boggle_game.check_valid_word(board, word)
    
    return jsonify({'result': result})

@app.route('/update-score', methods=['POST'])
def update_score():
    """receive score, update scoreboard"""
    score = request.json['score']
    highscore = session.get('highscore', 0)
    num_plays = session.get('num_plays', 0)

    session["num_plays"] = num_plays + 1
    session['highscore'] = max(score, highscore)

    return jsonify(newHighScore = score > highscore)
from boggle import Boggle
from flask import Flask, session, flash, render_template, request
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = 'bogglerocks123'

debug = DebugToolbarExtension(app)
boggle_game = Boggle()

@app.route('/')
def show_home_page():
    board = boggle_game.make_board();
    session['board'] = board

    return render_template('board.html', board=board) #not passing in board since it is in session dict

@app.route('/board-session') #do I need to do a separate view fn for adding to session????????
def handle_sessions_board():
    """save board to session"""

    session['board'] = board


@app.route('/submit-guess', methods=['POST'])
def submit_guess():
    """handle submission of user guess"""
    if boggle_game.check_valid_word == 'ok':
        return redirect('/')
    else:
        msg = boggle_game.check_valid_word
        flash(msg, error)

@app.route('/redirect') #not sure where to go with this....
def redirect_to_something():
    """need to redirect after submission????"""
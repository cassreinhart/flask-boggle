from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    def test_board(self):
        with app.text_client() as client:
            res = client.get('/')
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn('<table class="main">')
            self.assertIsNone(session['highscore'])
            self.assertIsNone(session['num_plays'])
    
    def test_session_num_plays(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['num_plays']= 999
            
            res = client.get('/update-score')

            self.assertEqual(res.status_code, 200)
            self.assertEqual(session['num_plays'], 1000)

    def test_valid_word(self):
        with app.test_client() as client:
            with client.session_transaction() as sess:
                sess['board'] = [["B","A","R","R","R"],
                                ["B","A","R","R","R"],
                                ["B","A","R","R","R"],
                                ["B","A","R","R","R"],
                                ["B","A","R","R","R"]]
                response = self.client.get('/check-word?word=bar')
                self.assertEqual(response.json['result'], 'ok')

        def test_invalid_word(self):
            with app.test_client() as client:
                self.client.get('/')
                response = self.client.get('/check-word?word=fool')
                self.assertEqual(response.json['result'], 'not-on-board')

        def test_not_a_word(self):
            with app.test_client() as client:
                self.client.get('/')
                response = self.client.get('/check-word?word=awvrvwai')
                self.assertEqual(response.json['result'], 'not-word')
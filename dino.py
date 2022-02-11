 # -*- coding: utf-8 -*-

from __future__ import print_function, unicode_literals
from pprint import pprint
from PyInquirer import style_from_dict, Token, prompt, Separator
from PyInquirer import Validator, ValidationError
import json
import subprocess

style = style_from_dict({
    Token.Separator: '#cc5454',
    Token.QuestionMark: '#673ab7 bold',
    Token.Selected: '#cc5454',  # default
    Token.Pointer: '#673ab7 bold',
    Token.Instruction: '',  # default
    Token.Answer: '#f44336 bold',
    Token.Question: '',
})


questions = [
    {
        'type': 'input',
        'name': 'url',
        'message': "Please enter the website's URL:"
    },
    {
        'type': 'input',
        'name': 'code',
        'message': "JS code:"
    }
]


answers = prompt(questions)

subprocess.run(['npm', 'start', answers['url'], answers['code']])

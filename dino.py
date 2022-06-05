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


print('(c) 2022 DinoBrowse and Arjun J')
print()
questions = [
    {
        'type': 'input',
        'name': 'code',
        'message': "Developers and Tinkerers: Enter JS code here: (otherwise leave blank)"
    }
]


answers = prompt(questions)

print('Loading Browser...')
subprocess.run(['npm', 'start', 'https://google.com', answers['code']])

 # -*- coding: utf-8 -*-
from __future__ import print_function, unicode_literals
from pprint import pprint
from PyInquirer import style_from_dict, Token, prompt, Separator
from PyInquirer import Validator, ValidationError
import json
import subprocess
class color:
   PURPLE = '\033[95m'
   CYAN = '\033[96m'
   DARKCYAN = '\033[36m'
   BLUE = '\033[94m'
   GREEN = '\033[92m'
   YELLOW = '\033[93m'
   RED = '\033[91m'
   BOLD = '\033[1m'
   UNDERLINE = '\033[4m'
   END = '\033[0m'

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
print('Support Ukraine! Learn more at https://www.nytimes.com/live/2022/03/07/world/ukraine-russia-war')
print(color.BLUE + """
████████""" + color.END + color.YELLOW + """
████████""" + color.END)
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

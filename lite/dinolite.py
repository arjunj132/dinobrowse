# DinoBrowse Lite
# DinoBrowse Lite is not reccommended for people who has enough space to support the Pro version.
"""
Copyright (c) 2022 Arjun J All Rights Reserved.
License:
Copyright (c) 2022 Arjun J
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""
# import modules
from tkinter import *
import tkinterweb

root = Tk()                  # start session

#search
def search():
    href = url.get()
    frame.load_website(href)

# ui
Label(root, text="Enter URL: ").grid(row=0)
url = Entry(root, text="https://google.com")
url.grid(column=1, row=0)
click = Button(root, text="🔍", command=search).grid(column=2, row=0)

# window
frame = tkinterweb.HtmlFrame(root)
frame.load_website("https://google.com")
frame.grid(row=1)

root.mainloop()

root.mainloop()
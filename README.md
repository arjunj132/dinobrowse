![DinoBrowse](https://i.ibb.co/W2vB7zF/Screenshot-2022-02-25-5-59-50-PM.png)

# DinoBrowse: The Hackable Browser

## v2.0.0

Hi!

I created a electron-based simple browser with Node. So your life would be much easier. Anyway, lets go ahead and install it!


Now, it depends what OS your using to install DinoBrowse ([Linux](#linux-appimage), or [Mac + Windows](#all-operating-systems-recommend-for-only-mac--windows)).

#### All Operating Systems (recommend for only mac + windows)
Make sure you clone this repo and cd:

```bash
git clone https://github.com/arjunj132/dinobrowse.git
cd dinobrowse
```


Lets install the dependencies:

```bash
npm install
```

Depending on your internet connection, it can be fast or slow (from 10 - 120 seconds).

So now that we installed the dependencies, lets run it! You need python. So, just run:

```bash
python3 -m dino
```

Then type some JS (only if you want to test out something - otherwise leave blank) and click enter and the browser should come to you!

#### Linux (AppImage)

Linux has an easy way - and way faster.

Download our AppImage at the Assets part on the release. NOTE: The release must be over 2.0.0 - otherwise, you won't find the image.

Then run this:

```bash
# Certified to work on Debian and Ubuntu
chmod +x dinobrowse.AppImage
./dinobrowse.AppImage run https://google.com
```

That basically adds permission to run and runs the app
## Usage

You just control stuff like a regular browser! Address bar, all look familiar.

## About

This is a modified version of Chromium. But it is pretty nice for people who don't wont to install chrome for some reason.

Security features are being worked on - migration to v2 deleted them.

---

&copy; 2022 Arjun J. All Rights Reserved.

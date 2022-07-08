![DinoBrowse](https://i.ibb.co/W2vB7zF/Screenshot-2022-02-25-5-59-50-PM.png)

# DinoBrowse: The Hackable Browser

Please choose the version of DinoBrowse:
1. DinoBrowse <b>Pro</b> (reccomended - original version)
2. DinoBrowse <i>Lite</i> (only for super low storage)

## DinoBrowse <b>Pro</b>

Hi!

I created a electron-based simple browser with Node. Anyway, lets go ahead and install it!


Now, it depends what OS your using to install DinoBrowse ([Linux](#linux), or [Mac + Windows](#all-operating-systems-recommend-for-only-mac--windows)).

### All Operating Systems (recommend for only mac + windows)
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

### Linux

Linux has easy ways - and way faster.

Download our AppImage, DEB, or RPM at the Assets part on the release. NOTE: The release must be over 2.0.0 - otherwise, you won't find the file. You can not use the icon in the taskbar.

Now run the file.
Running the file is easy:

AppImage: `chmod +x dinobrowse.AppImage; ./dinobrowse.AppImage run https://google.com` (includes permissions)

Debian & RPM: `dinobrowse run https://google.com`

### Usage

You just control stuff like a regular browser! Address bar, navigation, all looks familiar.

### About

This is a modified version of Chromium. But it is pretty nice for people who don't wont to install chrome for some reason.

Security features are being worked on - migration to v2 deleted them.





## DinoBrowse <i>Lite</i>

Download the very low storage and simple browsers. THIS IS NOT RECCOMENDED BECAUSE OF THE UNSECURITY AND THE UNEASINESS. Download the folder `lite` and run `dinolite.py`

All JavaScript is blocked.
Simple.
Lightning fast.
Only 13.03 MB.

---

&copy; 2022 Arjun J. All Rights Reserved.

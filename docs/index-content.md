## <a name=“about”></a>About HyperSynth
HyperSynth is a fully functional musical instrument, developed entirely in javascript and running in the browser. 

### <a name=“why”/>Why did I make it?
HyperSynth was created as an experiment to investigate the Web Audio API, to learn about it and to see what it is capable of. As it turned out it was capable of a lot more than I expected, and I ended up with a very playable and enjoyable instrument, from which you can learn a lot about the principles of sound synthesis. 

I offer it here for your pleasure, and hope you will explore the included preset patches. I encourage you to tinker with the settings to create and [save your own patches](#saving). The controls may look very technical and daunting, but there is a help mode which you can use to get info on any control or section.

### <a name=“privacy”/>Privacy
No data about you is asked for or retained on any servers, the only thing that’s saved locally in your browser is the current state of the instrument, so you can pick up where you left off when you re-visit the site.

## <a name=“getting-started”/>Getting started
### <a name=“system-requirements”/>System requirements
Any modern device and browser will run it fine, although phones and tablets with limited memory may struggle with some of the more complex polyphonic patches (hint: reduce the number of voices or switch off effects if you hear drop-outs).

### <a name=“touch-devices”/>Touch devices
The on-screen keyboard can be used on all platforms, but touch devices give the best experience with full polyphony and touch sensitivity, please use the device in landscape mode for best results. The touch sensitivity is calibrated when you touch the button above to launch the instrument, so please don’t press it too hard, a normal to light touch is ideal. If your device is Android, you also may be able to use an external MIDI keyboard...

### <a name=“external-keyboards”/>External MIDI keyboards
For desktop devices without touch screens, the best experience can be had if you have an external MIDI keyboard connected to your device. Connect the keyboard before launching HyperSynth, and the MIDI input device will be detected automatically (note: this doesn’t work in Safari on MacOS, or on any iOS devices as they don’t implement the web MIDI API).

When using an external keyboard, touch sensitivity, sustain pedal, pitch bend and modulation controls all work as they should.

### <a name=“saving”/>Saving patches
When the “Save Patch” button is clicked, the current settings are saved as a file in your downloads folder, with a “.hspatch.json” extension. From here you can move them to where-ever you like, ready to be loaded again at any time. In the save dialog, you can choose a bank from a list, and give the patch a new name. All of the settings required to recreate your carefully crafted sound are saved, but the keyboard settings, modulation wheel position and master volume are not.

### <a name=“loading”/>Loading patches
You can load your saved patches back in to HyperSynth in two ways:

- Click the “Load Patch” button to bring up a file dialog to browse to the patch file you want to load. If you saved it as “My Cool Sound” in the “Misc” bank, the file name will be <nobr>“Misc- My Cool Sound.hspatch.json”</nobr>. 
- If you are in an environment that allows multitasking windows, i.e. a laptop or an iPad with multitasking, you can drag and drop your patch file onto the browser window to load the patch.

### <a name=“sharing”/>Sharing patches
You can create a link containing all of the current settings for you to send to a friend, just click “Share Patch” and click “Copy to Clipboard”. You can then go to your app of choice and paste the link into a message. 
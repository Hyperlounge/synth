{module: header}

{control: library}

### Current Patch and Patch Selector

This shows the name of the current patch,  click on it to access to a built in library of preset patches.

{control: loadPatch}

### Load Patch

Use it to load a patch from your device. Patch files contain all of the settings for a particular sound, and have the extension ".hspatch.json". You can save patches to your device using the Save Patch button.

{control: savePatch}

### Save Patch

Use it to save the current settings to your device as a patch file. Patch files contain all of the settings for a particular sound, and have the extension ".hspatch.json". You can load patches from your device using the Load Patch button.

{control: sharePatch}

### Share Patch

Creates a url for you to share which encapsulates the current settings, so a friend can experience the cool sound you just made.

{control: c4Tone}

### Middle C

Plays a middle C refence tone which is useful when you are creating sounds using the Cross-Mod control in Oscillator 2. This can skew the frequency of the note considerably, and you will need to fiddle with the Semitones and Fine Tune controls in the Oscillators to bring it back. The note marked in yellow on the keyboard with a figure 4 in it should be in tune with this reference tone.

{end-module}

{module: expressionControls}

## Expression Controls

These controls are designed for use while playing to add expression to your performance, their positions are not saved in patches.

{control: pitchBend}

### Pitch Bend

Drag up or down to increase or decrease the pitch of the note by two semitones. If you release the control, it will snap back to the original note.

{control: modWheel}

### Modulation Wheel

Use this to control how much of the LFO signal is used to modulate the sound. See the Mod Wheel control in the LFO section, the Modulation controls in the Oscillator sections, and the Modulation control in the Filter section for details on how this can be configured to affect the sound.

{end-module}

{module: lfo}

## LFO (Low Frequency Oscillator)

Used to modulate the Oscillators’ frequencies and the cut-off frequency of the Filter, to create vibrato effects or slow sweeping timbre changes. The Mod Wheel (left) can be used to adjust the amount of modulation, and a fixed amount can be set which can be made to come in gradually after a delay when a note is played, adding an expressive quality. Further expressiveness can be added by making this delay shorter the harder you press the note.

White, pink or brown noise can be used to modulate, which gives ragged or glitchy effects, especially with brown noise set by the Noise selector in the Global section.

{control: waveform}

### Waveform

The type of signal used for modulation.

| option                                               | description                                                                                |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| ![Sine wave](../media/svg/sine-wave.svg)             | Sine wave                                                                                  |
| ![Triangle wave](../media/svg/triangle.svg)          | Triangle wave                                                                              |
| ![Ramp-up](../media/svg/saw-tooth.svg)               | Ramp-up sawtooth                                                                           |
| ![Ramp-down](../media/svg/reverse-saw.svg)           | Ramp-down sawtooth                                                                         |
| ![Square wave](../media/svg/square-wave.svg)         | Square wave                                                                                |
| ![Sample and hold](../media/svg/sample-and-hold.svg) | Sample and hold (random stepped wave)                                                      |
| ![Noise](../media/svg/noise.svg)                     | Noise, type determined by Noise selector in the Global section (note the Rate control has no effect here) |

{control: frequency}

### Rate or Frequency

The rate of the modulating wave, or the sample rate in the case of sample and hold. Has no effect when noise is selected.

{control: modWheelAmount}

### Mod Wheel Amount

Controls the maximum modulation introduced by the Mod Wheel. Is applied on top of the Level control.

{control: delay}

### Delay

Controls the delay before the modulation set by the Level control kicks in, zero = no delay. Can be combined with the Expression control to make the delay velocity sensitive.

{control: fixedAmount}

### Level

The minimum amount of modulation when Mod Wheel is on minimum. Works in conjunction with the Delay and Expression controls.

{control: expression}

### Expression

Adds more modulation when keys are pressed harder. When the Delay control is non-zero, it also shortens the delay when keys are pressed harder.

{end-module}

{define: osc-common}

The two Oscillators generate tones which are the basis of the sounds generated by the instrument. A range of different timbres can be created by mixing different waveforms with different frequency offsets, with more extreme sounds possible using the Cross-Mod control in Oscillator 2.

{control: waveform}

### Waveform

The type of signal generated by the oscillator.

| option                                       | description   |
| -------------------------------------------- | ------------- |
| ![Sine wave](../media/svg/sine-wave.svg)     | Sine wave     |
| ![Triangle wave](../media/svg/triangle.svg)  | Triangle wave |
| ![Ramp-up](../media/svg/saw-tooth.svg)       | Sawtooth wave |
| ![Square wave](../media/svg/square-wave.svg) | Square wave   |

{control: range}

### Range

The octave range of the frequencies, broadly in feet as in organ stops, although this is just a guide. Higher numbers give lower tones.

{control: tune}

### Semitones

Adjusts the frequency offset by plus or minus fixed semitones.

{control: fineTune}

### Fine Tune

Allows fine tuning of the frequency offset by up to plus or minus a semitone. Useful for creating detune effects, where the oscillators are slightly out of tune giving depth and movement to the sound.

{control: modAmount}

### Modulation

Controls the amount of frequency modulation applied using the LFO. A negative amount causes the reverse effect, i.e. the frequency is raised when it would have been lowered if a positive amount had been set.

{end-define}

{module: osc1}

## Oscillator 1

{include: osc-common}

{control: noiseLevel1 > level}

### Noise

Controls the amount of noise mixed into the sound, for creating breathy effects. The type of noise is set using the Noise selector in the Global section.

{control: oscLevel1 > level}

### Level

Controls the amount of Oscillator 1 signal in the mix.

{end-module}

{module: osc2}

## Oscillator 2

{include: osc-common}

{control: crossModAmount}

### Cross-Modulation

This frequency-modulates the Oscillator 2 signal using the signal from Oscillator 1. This introduces some complexity to the waveform, and can create some beautiful bell like effects similar to those created by FM synthesisers. It can also create some extremely ugly noises! As a guide, begin experimenting with sine waves or triangular waves, and bear in mind that it can throw the tuning way out, so you may need to fiddle with the frequency offsets of the two Oscillators, i.e. Semitones and Fine Tune, to get the instrument back in tune. There is a middle C tone generator above to help you with that.

{control: oscLevel2 > level}

### Level

Controls the amount of Oscillator 2 signal in the mix.

{end-module}

{define: envelope}

When a key is pressed the envelope rises linearly to its maximum level in the time set by Attack, then decays exponentially to the Sustain level in the time set by Decay. When the key is released, the envelope reduces exponentially to zero in the time set by Release. Velocity allows expression by making the envelope levels proportional to how hard the key is pressed. The Expression control adds further expression by shortening the Attack time the harder the key is pressed.

{control: attackSeconds}

### Attack

The time taken for the envelope to rise linearly to it’s maximum level. The Expression control can also affect this by shortening it when the key is pressed harder.

{control: decaySeconds}

### Decay

The time taken for the envelope to fall exponentially from its maximum value to the sustain value.

{control: sustainLevel}

### Sustain

The level to which the envelope falls and sustains until the key is released.

{control: releaseSeconds}

### Release

The time take for the envelope to fall exponentially to zero when the key is released.

{control: velocityAmount}

### Velocity

When zero, the envelope is fixed; when turned up, the maximum and sustain levels increase with how hard the key is pressed.

{control: expression}

### Expression

When turned up, the attack time is shortened when the key is pressed harder. This allows for more distinct expressiveness.

{end-define}

{module: loudnessEnvelope}

## Amp Envelope

This envelope shapes how the loudness of the note changes with time after a key press.

{include: envelope}

{end-module}

{module: filterEnvelope}

## Filter Envelope

This envelope affects how the cut-off frequency of the Filter module changes over time after a key press, and the amount of effect it has can be controlled using the Filter>Envelope control.

{include: envelope}

{end-module}

{module: filter}

## Filter

The filter shapes the sound by reducing and boosting certain frequencies, and can be controlled by the LFO and the Filter Envelope.

{control: type}

### Pass

| option | description                                                                                                                                                                                                                                             |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LOW    | Reduces frequencies above the Cut-Off frequency                                                                                                                                                                                                         |
| BAND   | Reduces frequencies above and below the Cut-Off frequency. This is only effective in conjunction with the Resonance control; with that set to zero, the response is flat. The amount of fall off above and below increases with higher resonance values |
| HIGH   | Reduces frequencies below the Cut-Off frequency                                                                                                                                                                                                         |

{control: rolloff}

### Rolloff/oct

This is the strength of the filter, expressed as the number of dBs reduction for every octave away from the Cut-Off frequency. Choose between 12dB/oct and 24dB/oct.

{control: frequency}

### Cut-Off

The point above and/or below which frequencies are reduced, and also the frequency boosted if the Resonance control is non-zero.

{control: resonance}

### Resonance

The amount of boost at the Cut-Off frequency

{control: envelopeAmount}

### Envelope

The degree to which the Filter Envelope affects the Cut-Off frequency.

{control: modAmount}

### Modulation

The degree to which the LFO affects the Cut-Off frequency.

{control: keyboardFollowAmount}

### Follow Keys

The degree to which the Cut-Off frequency follows the pitch of the note played. When at maximum, it follows it exactly, allowing musical notes to be made from a noise only source using a high Resonance value.

{end-module}

{module: global}

## Global

This panel contains controls that affect the whole instrument.

{control: voiceAllocator > numberOfVoices}

### Voices

The number of different notes that can be played at the same time. When set to 1 or LEG. (legato), it behaves as a monophonic instrument. Legato causes the envelopes to continue on to the next note without triggering the attack phase, if played without releasing the previous one. 1 causes a new attack phase for each note change.

{control: voiceAllocator > glideTime}

### Glide Time

The time it takes to glide from one note to another when Glide Type is not OFF.

{control: noise > type}

### Noise

The type of noise generated by the global noise source. This is used in the LFO and Oscillator 1.

| option | description
| --- | ---
| WHITE | A noise with an even spread of frequencies.
| PINK | A less harsh noise.
| BROWN | Has more in the lower frequencies, good for use as a modulator to give raggedy effects.

{control: voiceAllocator > glideType}

### Glide Type

| option | description                                                                       |
| ------ | --------------------------------------------------------------------------------- |
| OFF    | The frequency jumps instantly to the next note                                    |
| ALL    | The frequency always glides from one note to the next at a rate set by Glide Time |
| LEGATO | Only notes played without releasing the previous one will glide                   |

Glide can be used with more than one voice, with unpredictable but sometimes pleasing results!

{control: envelopeStretch}

### Envelope Stretch

Natural instruments like pianos have a long decay on low notes and a shorter decay on high notes. Turning Envelope Stretch on simulates this behaviour.

{end-module}

{module: phaser}

## Phaser Effect

The phaser gives the sound depth by adding in the original signal inverted and delayed by a variable amount. The variable amount is controlled by a sine wave low frequency oscillator, adjusted using the Rate and Depth controls.

{control: mix}

### Mix

Controls the mix between the un-processed and processed signals.

{control: rate}

### Rate

The speed of the low frequency oscillator that controls the delay.

{control: depth}

### Depth

The strength of the low frequency oscillator sine wave, larger values gives more extreme results.

{control: resonance}

### Feedback

Controls the amount of the processed signal that is fed back into the input, high values can give truly bonkers results!

{control: delay}

### Delay

Controls how much additional delay is applied to the processed singnal. With this set to zero, the processed signal exactly cancels the un-processed signal, creating classic "wind tunnel" effects. For the maximum effect, set the Mix to half way (double tap it).

{end-module}

{module: delay}

## Delay Effect

The Delay Effect records the input signal and plays it back in real time after a delay, creating echo effects. You can feed some of the delayed signal back into the input to create a repeated echo decaying over time. You can create stereo ping-pong echos with the Spread control.

{control: mix}

### Mix

Controls the mix between the un-processed and processed signals.

{control: time}

### Time

Sets the delay time between echoes.

{control: feedback}

### Feedback

Sets the amount of delayed signal to feed back into the input, giving repeated echoes. Maximum value gives 100% feedback which will never decay, use with caution!

{control: spread}

### Spread

When at the centre position, the echo is monophonic. When turned to the left, the first echo is panned to the left, the second to the right, then back again and so on. When turned to the right, the first echo is on the right.

{end-module}

{module: reverb}

## Reverb Effect

This applies a stereo reverb effect to the signal with four different room size simulations.

{control: mix}

### Mix

Controls the mix between the un-processed and processed signals.

{control: type}

### Room Size

Sets the quality of the reverb

| option | description                                |
| ------ | ------------------------------------------ |
| SMALL  | Subtle effect, just adds a bit of presence |
| MEDIUM | Adds more depth, like a living room        |
| LARGE  | Sounds like a large hall                   |
| HUGE   | More like a cathedral                      |

{end-module}

{module: levels}

## Levels Panel

Control over the tone and master volume of the signal.

{control: bass}

### Bass

Boosts or cuts the low frequencies.

{control: treble}

### Treble

Boosts or cuts the high frequencies.

{control: master}

### Master Volume

Boosts or cuts the entire signal. Particularly useful when using Band Pass in the Filter section, as that can attenuate the signal quite a lot.

{end-module}

{module: keyboard}

## Keyboard

The on-screen keyboard is playable on both touch devices and desktop computers, although it's obviously much more fun on a touch device, when it can be used more like a physical instrument. When an external MIDI keyboard is connected, it can be used normally with full touch sensitivity, and the sustain pedal works as expected. On iOS devices, the on-screen keyboard is touch sensitive based on the size of the touch area, so pressing harder gives quite usable expressiveness. When used on a desktop computer, the velocity is based on the vertical position of the cursor on the key, top of the key is soft, bottom of the key is loud.

The number of keys defaults to a comfortable range for on-screen use, but other common configurations can be selected using the preset buttons to the right. The number and range of keys is also fully customisable using the Keyboard Adjuster. The location of middle C is marked in yellow, and the numbers on the C keys indicate the other octave positions.

The keyboard settings are independent of patch data and are not saved.

{control: adjuster}

### Keyboard Adjuster

The octave range of the keyboard can be adjusted by dragging the central white area of the Keyboard Adjuster left or right. The number of keys shown can be chaged by dragging the grey areas either side left or right.

{control: velocity}

### Velocity Mode

Selects how the velocity of a key-press is determined when using the on-screen keyboard. When using an external keyboard, this has no effect and the actual velocity is used.

| Option | Description
| --- | ---
| TOUCH | (On touch devices only) the size of the touch point is used, the harder the touch, the bigger the radius.
| POS'N | The vertical position touched or clicked on the key is used, the bottom of the key is maximum velocity.
| MAX | The velocity is fixed at the maximum value.
| 70% | The velocity is fixed at 70 percent of the maximum value.
| 50% | ...you get the gist...
| 30% | ...you got it!

Different touch devices have different sensitivities, so if you're on a touch device the size of a normal touch was detected when you clicked the big button to launch this thing (clever, eh?). Just don't hit it too hard or you'll mess up the calculation.

{end-module}

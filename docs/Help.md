## LFO
The Low Frequency Oscillator is used to modulate both the pitch of the oscillators and/or the cut-off frequency of the filter. See those sections for how to determine how much the LFO affects them.

### Controls:
#### Waveform:
- Sine - good for tremolo effects
- Triangle - gives a smooth sweep up and down
- Ramp up - can be handy for auto-wah
- Ramp down - can create an effect like a plucked mandolin
- Square - for hard stepped effects
- Sample and hold - a series of random levels
- Noise - uses the noise type selected in the Global section (Note the rate has no effect here).

#### Rate:
Adjusts the frequency of the modulation waveform.

#### Mod Wheel:
Adjusts how much the Mod wheel affects the amount of modulation.

#### Level:
Adjusts the amount of fixed modulation, independent of the Mod wheel.

#### Delay:
Sets a delay before the fixed modulation is applied with a smooth build up.

## OSCILLATORS
The two oscillators are essentially the same and are used in tandem to build rich tonal colours.

### Controls:
#### Waveform:
- Sine - a pure tone without harmonics
- Triangle - similar to sine but with more harmonics
- Sawtooth - a harsher sound with plenty of harmonics
- Square - a mellow sound with many harmonics

#### Range:
The range of the note, expressed as feet as in an organ pipe. 8 is the normal range. Lower numbers are higher frequencies.

#### Semitones:
Adds or subtracts up to 7 semitones from the note.

#### Fine tune:
Adds or subtracts up to half a semitone continuously. A little bit of detuning can add some movement to the sound.

#### Modulation:
Adjusts how much modulation is applied from the LFO, either positively or negatively.

#### Level:
Adjusts the output level of the oscillator.

#### Noise (oscillator 1 only):
Adds noise from the noise type selected in the GLOBAL section, applied after the level.

#### Cross-Mod (oscillator 2 only):
Uses the output of oscillator 1 to frequency modulate oscillator 2, creating FM effects. The modulating signal is taken before the level control, so the level of oscillator 1 can be turned all the way down without affecting the amount of modulation applied to oscillator 2. The effect on the perceived pitch can be quite unpredictable when using FM, especially when using waveforms with high harmonic content. You may need to compensate using the Semitones and Fine-tune controls to make the patch sound in tune. The GLOBAL section has a fixed C4 (middle C) tone generator which can help with that.

## ENVELOPES
There are two envelope generators, one affecting the loudness of the signal, and the other affecting the cut-off frequency of the Filter.

### Controls:
#### Attack:
A low value gives a sharp attack to the beginning of the note, higher values cause the note to build more slowly.

#### Decay:
Once the attack phase has completed, this affects how fast the note falls to the sustain level. A low value give a quick fall, higher values a slow fall.

#### Sustain:
Sets the level the note settles to if the key is kept pressed. A high value would be used for an organ-like response, a low value for a more piano like response.

#### Release:
A low value gives a quick end to the note when the key is released, a high value gives a gentle decay.

#### Velocity:
This affects how much the velocity of the key press affects the envelope. On a touch device like a tablet, key velocity is simulated, but this effect is most predictable and useful when an external MIDI keyboard is connected.

## FILTER
The filter affects the tonal quality of the sound of both oscillators and noise generator, the cut-off frequency being controlled by the LFO and the FILTER ENVELOPE. 

### Controls

#### Pass:
Low - the most commonly used setting, this attenuates frequencies above the cut-off, allowing lower frequencies to pass.

Band - allows a narrow band of frequencies at the cut-off to pass. This can sound quite thin and is more pronounced with more Resonance.

High - allows the higher frequencies to pass, attenuating the low.

#### Rolloff:
The cut-off is not immediate, frequencies are attenuated progressively around the cut-off. With is control you can choose between a roll-off rate of 12dB per octave or 24dB per octave.

#### Cut-off:
This sets the basic frequency at which the filter is applied. This interacts with the FILTER ENVELOPE and the LFO.

#### Resonance:
This gives an accentuating boost at the cut-off frequency, which can be used for wah type effects.

#### Envelope:
This adjusts how much the FILTER ENVELOPE affects the cut-off.

#### Modulation:
This adjust how much the LFO affects the cut-off.

#### Follow Keys:
When this is turned up to max, the filter cut-off frequency will track the note played, when turned to minimum the note played has no effect on the cut-off.

## GLOBAL
### Controls:
#### Voices:
When set to 1, the instrument is monophonic. Higher settings make it polyphonic. The number of voices you use partly depends on how much processing power is available, but it can be desirable to limit the number of voices, for instance when using polyphonic glide. LEG means Legato, this is the same as 1 voice or monophonic, but when notes are played without gaps between them the envelope generators are not re-triggered, giving a legato effect.

#### Glide:
This causes the note to glide smoothly to the next note played,  a higher setting giving a slower glide. This is mos commonly used in monophonic and legato modes, but it can be used in polyphonic mode with interesting effect, which is most pleasing if the number of voices is limited to 4 or 5.

#### Noise:
This is the global noise generator which can be made audible (see OSCILLATOR 1) or used to modulate (see LFO). There are three types of noise:

- White - an even frequency response noise.
- Pink - filtered noise with a mellower quality.
- Brown - a more “lumpy” noise with more low frequencies, which can work better as a modulator.

#### Env. Stretch:
Envelope stretch, when turned on the envelope generators will have longer cycles at the bottom end of the keyboard and shorter cycles at the top. This simulates the behaviour of natural instruments such as pianos.
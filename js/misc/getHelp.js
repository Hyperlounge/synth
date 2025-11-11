const help = {modules: {
  header: {
    template: help => `
${help.modules.header.controls.loadPatch.html}
${help.modules.header.controls.savePatch.html}
${help.modules.header.controls.sharePatch.html}
${help.modules.header.controls.c4Tone.html}`,
    controls: {
      loadPatch: {
        html: `<h3>Load Patch</h3>
<p>Allows you to load a patch from your device. Patch files contain all of the settings for a particular sound, and have the extension &quot;.hspatch.json&quot;. You can save patches to your device using the Save Patch button.</p>
`,
      },
      savePatch: {
        html: `<h3>Save Patch</h3>
<p>Allows you to save the current settings to your device as a patch file. Patch files contain all of the settings for a particular sound, and have the extension &quot;.hspatch.json&quot;. You can load patches from your device using the Load Patch button.</p>
`,
      },
      sharePatch: {
        html: `<h3>Share Patch</h3>
<p>Creates a url for you to share which encapsulates the current settings, so a friend can experience the cool sound you just made.</p>
`,
      },
      c4Tone: {
        html: `<h3>Middle C</h3>
<p>Plays a middle C refence tone which is useful when you are creating sounds using the Cross-Mod control in Oscillator 2. This can skew the frequency of the note a lot, and you will need to fiddle with the Semitones and Fine Tune controls in the Oscillators to bring it back. The note marked in yellow on the keyboard with a figure 4, should be in tune with this reference tone.</p>
`,
      },
    },
  },
  expressionControls: {
    template: help => `<h2>Expression Controls</h2>
<p>These controls are designed for use during performance, their positions are not saved in patches.</p>

${help.modules.expressionControls.controls.pitchBend.html}
${help.modules.expressionControls.controls.modWheel.html}`,
    controls: {
      pitchBend: {
        html: `<h3>Pitch Bend</h3>
<p>Drag up or down to increase or decrease the pitch of the note by two semitones. If you release the control, it will snap back to the true note.</p>
`,
      },
      modWheel: {
        html: `<h3>Modulation Wheel</h3>
<p>This control can be used to control how much of the LFO signal is used to modulate the sound. See Mod Wheel control in the LFO, the Modulation controls in the Oscillators, and the Modulation control in the Filter for details on how this can be configured to affect the sound.</p>
`,
      },
    },
  },
  lfo: {
    template: help => `<h2>LFO (Low Frequency Oscillator)</h2>
<p>Used optionally to modulate the Oscillators’ frequencies and the cut-off frequency of the Filter, to create vibrato effects or slow sweeping timbre changes. The Mod Wheel (left) can be used to adjust the amount of modulation, and a fixed amount can be set which can be made to come in gradually after a delay when a note is played, adding an expressive quality. Further expressiveness can be added by making this delay shorter the harder you press the note.</p>
<p>Noise can be used to modulate, which gives ragged or glitchy effects, especially with brown noise set by the Global&gt;Noise selector.</p>

${help.modules.lfo.controls.waveform.html}
${help.modules.lfo.controls.frequency.html}
${help.modules.lfo.controls.modWheelAmount.html}
${help.modules.lfo.controls.delay.html}
${help.modules.lfo.controls.fixedAmount.html}
${help.modules.lfo.controls.expression.html}`,
    controls: {
      waveform: {
        html: `<h3>Waveform</h3>
<p>The type of signal used for modulation.</p>
<table>
<thead>
<tr>
<th>option</th>
<th>description</th>
</tr>
</thead>
<tbody>
<tr>
<td><img src="media/svg/sine-wave.svg" alt="Sine wave"></td>
<td>Sine wave</td>
</tr>
<tr>
<td><img src="media/svg/triangle.svg" alt="Triangle wave"></td>
<td>Triangle wave</td>
</tr>
<tr>
<td><img src="media/svg/saw-tooth.svg" alt="Ramp-up"></td>
<td>Ramp-up sawtooth</td>
</tr>
<tr>
<td><img src="media/svg/reverse-saw.svg" alt="Ramp-down"></td>
<td>Ramp-down sawtooth</td>
</tr>
<tr>
<td><img src="media/svg/square-wave.svg" alt="Square wave"></td>
<td>Square wave</td>
</tr>
<tr>
<td><img src="media/svg/sample-and-hold.svg" alt="Sample and hold"></td>
<td>Sample and hold (random stepped wave)</td>
</tr>
<tr>
<td><img src="media/svg/noise.svg" alt="Noise"></td>
<td>Noise, type determined by Global&gt;Noise selector (note the Rate control has no effect here)</td>
</tr>
</tbody>
</table>
`,
      },
      frequency: {
        html: `<h3>Rate or Frequency</h3>
<p>The rate of the modulating wave, or the sample rate in the case of sample and hold. Has no effect when noise is selected.</p>
`,
      },
      modWheelAmount: {
        html: `<h3>Mod Wheel Amount</h3>
<p>Controls the maximum modulation introduced by the Mod Wheel. Is applied on top of the Level control.</p>
`,
      },
      delay: {
        html: `<h3>Delay</h3>
<p>Controls the delay before the modulation set by the Level control kicks in, zero = no delay. Can be combined with the Expression control to make the delay velocity sensitive.</p>
`,
      },
      fixedAmount: {
        html: `<h3>Level</h3>
<p>The minimum amount of modulation when Mod Wheel is on minimum. Works in conjunction with the Delay and Expression controls.</p>
`,
      },
      expression: {
        html: `<h3>Expression</h3>
<p>Adds more modulation when keys are pressed harder. When the Delay control is non-zero, it also shortens the delay when keys are pressed harder.</p>
`,
      },
    },
  },
  osc1: {
    template: help => `<h2>Oscillator 1</h2>
<p>The two Oscillators generate tones which are the basis of the sounds generated by the instrument. A range of different timbres can be created by mixing different waveforms with different frequency offsets, with more extreme sounds possible using the Cross-Mod control in Oscillator 2.</p>

${help.modules.osc1.controls.waveform.html}
${help.modules.osc1.controls.range.html}
${help.modules.osc1.controls.tune.html}
${help.modules.osc1.controls.fineTune.html}
${help.modules.osc1.controls.modAmount.html}
${help.modules.noiseLevel1.controls.level.html}
${help.modules.oscLevel1.controls.level.html}`,
    controls: {
      waveform: {
        html: `<h3>Waveform</h3>
<p>The type of signal generated by the oscillator.</p>
<table>
<thead>
<tr>
<th>option</th>
<th>description</th>
</tr>
</thead>
<tbody>
<tr>
<td><img src="media/svg/sine-wave.svg" alt="Sine wave"></td>
<td>Sine wave</td>
</tr>
<tr>
<td><img src="media/svg/triangle.svg" alt="Triangle wave"></td>
<td>Triangle wave</td>
</tr>
<tr>
<td><img src="media/svg/saw-tooth.svg" alt="Ramp-up"></td>
<td>Sawtooth wave</td>
</tr>
<tr>
<td><img src="media/svg/square-wave.svg" alt="Square wave"></td>
<td>Square wave</td>
</tr>
</tbody>
</table>
`,
      },
      range: {
        html: `<h3>Range</h3>
<p>The octave range of the frequencies, broadly in feet as in organ stops, although this is just a guide. Higher numbers gives higher tones.</p>
`,
      },
      tune: {
        html: `<h3>Semitones</h3>
<p>Adjusts the frequency offset by plus or minus fixed semitones.</p>
`,
      },
      fineTune: {
        html: `<h3>Fine Tune</h3>
<p>Allows fine tuning of the frequency offset by up to plus or minus a semitone. Useful for creating detune effects, where the oscillators are slightly out of tune giving depth and movement to the sound.</p>
`,
      },
      modAmount: {
        html: `<h3>Modulation</h3>
<p>Controls the amount of frequency modulation applied using the LFO. A negative amount causes the reverse effect, i.e. the frequency is raised when it would have been lowered if a positive amount had been set.</p>
`,
      },
    },
  },
  noiseLevel1: {
    controls: {
      level: {
        html: `<h3>Noise</h3>
<p>Controls the amount of noise mixed into the sound, for creating breathy effects. The type of noise is set using the Common&gt;Noise selector.</p>
`,
      },
    },
  },
  oscLevel1: {
    controls: {
      level: {
        html: `<h3>Level</h3>
<p>Controls the amount of Oscillator 1 signal in the mix.</p>
`,
      },
    },
  },
  osc2: {
    template: help => `<h2>Oscillator 2</h2>
<p>The two Oscillators generate tones which are the basis of the sounds generated by the instrument. A range of different timbres can be created by mixing different waveforms with different frequency offsets, with more extreme sounds possible using the Cross-Mod control in Oscillator 2.</p>

${help.modules.osc2.controls.waveform.html}
${help.modules.osc2.controls.range.html}
${help.modules.osc2.controls.tune.html}
${help.modules.osc2.controls.fineTune.html}
${help.modules.osc2.controls.modAmount.html}
${help.modules.osc2.controls.crossModAmount.html}
${help.modules.oscLevel2.controls.level.html}`,
    controls: {
      waveform: {
        html: `<h3>Waveform</h3>
<p>The type of signal generated by the oscillator.</p>
<table>
<thead>
<tr>
<th>option</th>
<th>description</th>
</tr>
</thead>
<tbody>
<tr>
<td><img src="media/svg/sine-wave.svg" alt="Sine wave"></td>
<td>Sine wave</td>
</tr>
<tr>
<td><img src="media/svg/triangle.svg" alt="Triangle wave"></td>
<td>Triangle wave</td>
</tr>
<tr>
<td><img src="media/svg/saw-tooth.svg" alt="Ramp-up"></td>
<td>Sawtooth wave</td>
</tr>
<tr>
<td><img src="media/svg/square-wave.svg" alt="Square wave"></td>
<td>Square wave</td>
</tr>
</tbody>
</table>
`,
      },
      range: {
        html: `<h3>Range</h3>
<p>The octave range of the frequencies, broadly in feet as in organ stops, although this is just a guide. Higher numbers gives higher tones.</p>
`,
      },
      tune: {
        html: `<h3>Semitones</h3>
<p>Adjusts the frequency offset by plus or minus fixed semitones.</p>
`,
      },
      fineTune: {
        html: `<h3>Fine Tune</h3>
<p>Allows fine tuning of the frequency offset by up to plus or minus a semitone. Useful for creating detune effects, where the oscillators are slightly out of tune giving depth and movement to the sound.</p>
`,
      },
      modAmount: {
        html: `<h3>Modulation</h3>
<p>Controls the amount of frequency modulation applied using the LFO. A negative amount causes the reverse effect, i.e. the frequency is raised when it would have been lowered if a positive amount had been set.</p>
`,
      },
      crossModAmount: {
        html: `<h3>Cross-Modulation</h3>
<p>This frequency modulates the Oscillator 2 signal using the signal from Oscillator 1. This introduces some complexity to the waveform, and can create some beautiful bell like effects similar to those created by FM synthesisers. It can also create some extremely ugly noises! As a guide, begin experimenting with sine waves or triangular waves, and bear in mind that it can throw the tuning way out, so you may need to fiddle with the frequency offsets of the two Oscillators, i.e. Semitones and Fine Tune, to get the instrument back in tune. There is a C4 (middle C) tone generator above to help you with that.</p>
`,
      },
    },
  },
  oscLevel2: {
    controls: {
      level: {
        html: `<h3>Level</h3>
<p>Controls the amount of Oscillator 2 signal in the mix.</p>
`,
      },
    },
  },
  loudnessEnvelope: {
    template: help => `<h2>Amp Envelope</h2>
<p>This envelope shapes how the loudness of the note changes with time after a key press.</p>
<p>When a key is pressed the envelope rises linearly to its maximum level in the time set by Attack, then decays exponentially to the Sustain level in the time set by Decay. When the key is released, the envelope reduces exponentially to zero in the time set by Release. Velocity allows expression by making the envelope levels proportional to how hard the key is pressed. The Expression control adds further expression by shortening the Attack time the harder the key is pressed.</p>

${help.modules.loudnessEnvelope.controls.attackSeconds.html}
${help.modules.loudnessEnvelope.controls.decaySeconds.html}
${help.modules.loudnessEnvelope.controls.sustainLevel.html}
${help.modules.loudnessEnvelope.controls.releaseSeconds.html}
${help.modules.loudnessEnvelope.controls.velocityAmount.html}
${help.modules.loudnessEnvelope.controls.expression.html}`,
    controls: {
      attackSeconds: {
        html: `<h3>Attack</h3>
<p>The time taken for the envelope to rise linearly to it’s maximum level. The Expression control can also affect this by shortening it when the key is pressed harder.</p>
`,
      },
      decaySeconds: {
        html: `<h3>Decay</h3>
<p>The time taken for the envelope to fall exponentially from its maximum value to the sustain value.</p>
`,
      },
      sustainLevel: {
        html: `<h3>Sustain</h3>
<p>The level to which the envelope falls and sustains until the key is released.</p>
`,
      },
      releaseSeconds: {
        html: `<h3>Release</h3>
<p>The time take for the envelope to fall exponentially to zero when the key is released.</p>
`,
      },
      velocityAmount: {
        html: `<h3>Velocity</h3>
<p>When zero, the envelope is fixed; when turned up, the maximum and sustain levels increase with how hard the key is pressed.</p>
`,
      },
      expression: {
        html: `<h3>Expression</h3>
<p>When turned up, the attack time is shortened when the key is pressed harder. This allows for more distinct expressiveness.</p>
`,
      },
    },
  },
  filterEnvelope: {
    template: help => `<h2>Filter Envelope</h2>
<p>This envelope affects how the cut-off frequency of the Filter module changes over time after a key press, and the amount of effect it has can be controlled using the Filter&gt;Envelope control.</p>
<p>When a key is pressed the envelope rises linearly to its maximum level in the time set by Attack, then decays exponentially to the Sustain level in the time set by Decay. When the key is released, the envelope reduces exponentially to zero in the time set by Release. Velocity allows expression by making the envelope levels proportional to how hard the key is pressed. The Expression control adds further expression by shortening the Attack time the harder the key is pressed.</p>

${help.modules.filterEnvelope.controls.attackSeconds.html}
${help.modules.filterEnvelope.controls.decaySeconds.html}
${help.modules.filterEnvelope.controls.sustainLevel.html}
${help.modules.filterEnvelope.controls.releaseSeconds.html}
${help.modules.filterEnvelope.controls.velocityAmount.html}
${help.modules.filterEnvelope.controls.expression.html}`,
    controls: {
      attackSeconds: {
        html: `<h3>Attack</h3>
<p>The time taken for the envelope to rise linearly to it’s maximum level. The Expression control can also affect this by shortening it when the key is pressed harder.</p>
`,
      },
      decaySeconds: {
        html: `<h3>Decay</h3>
<p>The time taken for the envelope to fall exponentially from its maximum value to the sustain value.</p>
`,
      },
      sustainLevel: {
        html: `<h3>Sustain</h3>
<p>The level to which the envelope falls and sustains until the key is released.</p>
`,
      },
      releaseSeconds: {
        html: `<h3>Release</h3>
<p>The time take for the envelope to fall exponentially to zero when the key is released.</p>
`,
      },
      velocityAmount: {
        html: `<h3>Velocity</h3>
<p>When zero, the envelope is fixed; when turned up, the maximum and sustain levels increase with how hard the key is pressed.</p>
`,
      },
      expression: {
        html: `<h3>Expression</h3>
<p>When turned up, the attack time is shortened when the key is pressed harder. This allows for more distinct expressiveness.</p>
`,
      },
    },
  },
  filter: {
    template: help => `<h2>Filter</h2>
<p>The filter shapes the sound by reducing and boosting certain frequencies, and can be controlled by the LFO and the Filter Envelope.</p>

${help.modules.filter.controls.type.html}
${help.modules.filter.controls.rolloff.html}
${help.modules.filter.controls.frequency.html}
${help.modules.filter.controls.resonance.html}
${help.modules.filter.controls.envelopeAmount.html}
${help.modules.filter.controls.modAmount.html}
${help.modules.filter.controls.keyboardFollowAmount.html}`,
    controls: {
      type: {
        html: `<h3>Pass</h3>
<table>
<thead>
<tr>
<th>option</th>
<th>description</th>
</tr>
</thead>
<tbody>
<tr>
<td>LOW</td>
<td>Reduces frequencies above the Cut-Off frequency</td>
</tr>
<tr>
<td>BAND</td>
<td>Reduces frequencies above and below the Cut-Off frequency. This is only effective in conjunction with the Resonance control; with that set to zero, the response is flat. The amount of fall off above and below increases with higher resonance values</td>
</tr>
<tr>
<td>HIGH</td>
<td>Reduces frequencies below the Cut-Off frequency</td>
</tr>
</tbody>
</table>
`,
      },
      rolloff: {
        html: `<h3>Rolloff/oct</h3>
<p>This is the strength of the filter, expressed as the number of dBs reduction for every octave away from the Cut-Off frequency.</p>
`,
      },
      frequency: {
        html: `<h3>Cut-Off</h3>
<p>The point above and/or below which frequencies are reduced, and also the frequency boosted if the Resonance control is non-zero.</p>
`,
      },
      resonance: {
        html: `<h3>Resonance</h3>
<p>The amount of boost at the Cut-Off frequency</p>
`,
      },
      envelopeAmount: {
        html: `<h3>Envelope</h3>
<p>The degree to which the Filter Envelope affects the Cut-Off frequency.</p>
`,
      },
      modAmount: {
        html: `<h3>Modulation</h3>
<p>The degree to which the LFO affects the Cut-Off frequency.</p>
`,
      },
      keyboardFollowAmount: {
        html: `<h3>Follow Keys</h3>
<p>The degree to which the Cut-Off frequency follows the pitch of the note played. When at maximum, it follows it exactly, allowing musical notes to be made from a noise only source using a high Resonance value.</p>
`,
      },
    },
  },
  voiceAllocator: {
    controls: {
      numberOfVoices: {
        html: `<h3>Voices</h3>
<p>The number of different notes that can be played at the same time. When set to 1 or LEG. (legato), it behaves as a monophonic instrument. Legato causes the envelopes to continue on to the next note without triggering the attack phase, if played without releasing the previous one. 1 causes a new attack phase for each note change.</p>
`,
      },
      glideTime: {
        html: `<h3>Glide Time</h3>
<p>The time it takes to glide from one note to another when Glide Type is not OFF.</p>
`,
      },
      glideType: {
        html: `<h3>Glide Type</h3>
<table>
<thead>
<tr>
<th>option</th>
<th>description</th>
</tr>
</thead>
<tbody>
<tr>
<td>OFF</td>
<td>The frequency jumps instantly to the next note</td>
</tr>
<tr>
<td>ALL</td>
<td>The frequency always glides from one note to the next at a rate set by Glide Time</td>
</tr>
<tr>
<td>LEGATO</td>
<td>Only notes played without releasing the previous one will glide</td>
</tr>
</tbody>
</table>
<p>Glide can be used with more than one voice, with unpredictable but sometimes pleasing results!</p>
`,
      },
    },
  },
  noise: {
    controls: {
      type: {
        html: `<h3>Noise</h3>
<p>The type of noise generated by the global noise source. This is used in the LFO and Oscillator 1.</p>
`,
      },
    },
  },
  global: {
    template: help => `<h2>Global</h2>
<p>This panel contains controls that affect the whole instrument.</p>

${help.modules.voiceAllocator.controls.numberOfVoices.html}
${help.modules.voiceAllocator.controls.glideTime.html}
${help.modules.noise.controls.type.html}
${help.modules.voiceAllocator.controls.glideType.html}
${help.modules.global.controls.envelopeStretch.html}`,
    controls: {
      envelopeStretch: {
        html: `<h3>Envelope Stretch</h3>
<p>Natural instruments like pianos have a long decay on low notes and a shorter decay on high notes. Turning Envelope Stretch on simulates this behaviour.</p>
`,
      },
    },
  },
  phaser: {
    template: help => `<h2>Phaser Effect</h2>
<p>The phaser gives the sound depth by adding in the original signal inverted and delayed by a variable amount. The variable amount is controlled by a sine wave low frequency oscillator, adjusted using the Rate and Depth controls.</p>

${help.modules.phaser.controls.mix.html}
${help.modules.phaser.controls.rate.html}
${help.modules.phaser.controls.depth.html}
${help.modules.phaser.controls.resonance.html}
${help.modules.phaser.controls.delay.html}`,
    controls: {
      mix: {
        html: `<h3>Mix</h3>
<p>Controls the mix between the un-processed and processed signals.</p>
`,
      },
      rate: {
        html: `<h3>Rate</h3>
<p>The speed of the low frequency oscillator that controls the delay.</p>
`,
      },
      depth: {
        html: `<h3>Depth</h3>
<p>The strength of the low frequency oscillator sine wave, larger values gives more extreme results.</p>
`,
      },
      resonance: {
        html: `<h3>Feedback</h3>
<p>Controls the amount of the processed signal that is fed back into the input, high values can give truly bonkers results!</p>
`,
      },
      delay: {
        html: `<h3>Delay</h3>
<p>Controls how much additional delay is applied to the processed singnal. With this set to zero, the processed signal exactly cancels the un-processed signal, creating classic &quot;wind tunnel&quot; effects. For the maximum effect, set the Mix to half way (double tap it).</p>
`,
      },
    },
  },
  delay: {
    template: help => `<h2>Delay Effect</h2>
<p>The Delay Effect records the input signal and plays it back in real time after a delay, creating echo effects. You can feed some of the delayed signal back into the input to create a repeated echo decaying over time. You can create stereo ping-pong echos with the Spread control.</p>

${help.modules.delay.controls.mix.html}
${help.modules.delay.controls.time.html}
${help.modules.delay.controls.feedback.html}
${help.modules.delay.controls.spread.html}`,
    controls: {
      mix: {
        html: `<h3>Mix</h3>
<p>Controls the mix between the un-processed and processed signals.</p>
`,
      },
      time: {
        html: `<h3>Time</h3>
<p>Sets the delay time between echoes.</p>
`,
      },
      feedback: {
        html: `<h3>Feedback</h3>
<p>Sets the amount of delayed signal to feed back into the input, giving repeated echoes. Maximum value gives 100% feedback which will never decay, use with caution!</p>
`,
      },
      spread: {
        html: `<h3>Spread</h3>
<p>When at the centre position, the echo is monophonic. When turned to the left, the first echo is panned to the left, the second to the right, then back again and so on. When turned to the right, the first echo is on the right.</p>
`,
      },
    },
  },
  reverb: {
    template: help => `<h2>Reverb Effect</h2>
<p>This applies a stereo reverb effect to the signal with four different room size simulations.</p>

${help.modules.reverb.controls.mix.html}
${help.modules.reverb.controls.type.html}`,
    controls: {
      mix: {
        html: `<h3>Mix</h3>
<p>Controls the mix between the un-processed and processed signals.</p>
`,
      },
      type: {
        html: `<h3>Room Size</h3>
<p>Sets the quality of the reverb</p>
<table>
<thead>
<tr>
<th>option</th>
<th>description</th>
</tr>
</thead>
<tbody>
<tr>
<td>SMALL</td>
<td>Subtle effect, just adds a bit of presence</td>
</tr>
<tr>
<td>MEDIUM</td>
<td>Adds more depth, like a living room</td>
</tr>
<tr>
<td>LARGE</td>
<td>Sounds like a large hall</td>
</tr>
<tr>
<td>HUGE</td>
<td>More like a cathedral</td>
</tr>
</tbody>
</table>
`,
      },
    },
  },
  levels: {
    template: help => `<h2>Levels Panel</h2>
<p>Control over the tone and master volume of the signal.</p>

${help.modules.levels.controls.bass.html}
${help.modules.levels.controls.treble.html}
${help.modules.levels.controls.master.html}`,
    controls: {
      bass: {
        html: `<h3>Bass</h3>
<p>Boosts or cuts the low frequencies.</p>
`,
      },
      treble: {
        html: `<h3>Treble</h3>
<p>Boosts or cuts the high frequencies.</p>
`,
      },
      master: {
        html: `<h3>Master Volume</h3>
<p>Boosts or cuts the entire signal. Particularly useful when using Band Pass in the Filter section, as that can attenuate the signal quite a lot.</p>
`,
      },
    },
  },
}};

function getHelpHtml(moduleName, controlName) {
    const moduleData = help.modules[moduleName];
    const controlData = help.modules[moduleName].controls[controlName];
    if (controlName === undefined) {
        return moduleData ? moduleData.template(help) : undefined;
    } else {
        return controlData ? controlData.html : (moduleData ? moduleData.template(help) : undefined);
    }
}

export default getHelpHtml
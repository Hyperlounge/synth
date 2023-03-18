# Browser based synthesiser

MIDIKeyboard 
- MIDI messages out

VoiceAllocator
- MIDI messages in
- NoteChange events out on event bus
- NoteChange events are allocated a voice number

NoteChange event:
```javascript
new CustomEvent('note-change', {
    detail: {
        type: 'on' | 'off' | 'change',
        newNote: number, // midi note number or undefined if note released
        oldNote: number, // midi note number or undefined
        velocity: 0-127,
    }
})

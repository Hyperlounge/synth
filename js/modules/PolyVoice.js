export default class PolyVoice extends EventTarget {
    constructor(voiceCreator, voiceDestroyer = (voice) => {}) {
        super();
        this._voiceCreator = voiceCreator;
        this._voiceDestroyer = voiceDestroyer;
        this._voices = [];
        this._connectionsTo = [];
    }

    connect(toPolyVoice, parameterName) {
        if (!!this._connectionsTo.find(item => item.toPolyVoice === toPolyVoice && item.parameterName === parameterName)) {
            if (!!this._connectionsTo.find(item => item.toPolyVoice === toPolyVoice)) {
                toPolyVoice.totalVoices = this.totalVoices;
            }
            this._connectionsTo.push({toPolyVoice, parameterName});
            this._voices.forEach((voice, i) => {
                voice.connect(parameterName ? toPolyVoice.voices[i][parameterName] : toPolyVoice.voices[i]);
            });
        }
    }

    disconnect(toPolyVoice, parameterName) {
        if (this._connectionsTo.find(item => item.toPolyVoice === toPolyVoice && item.parameterName === parameterName)) {
            this._voices.forEach((voice, i) => {
                voice.disconnect(parameterName ? toPolyVoice.voices[i][parameterName] : toPolyVoice.voices[i]);
            });
            this._connectionsTo = this._connectionsTo.filter(item => item.toPolyVoice !== toPolyVoice && item.parameterName !== parameterName);
            if (!!this._connectionsTo.find(item => item.toPolyVoice === toPolyVoice)) {
                toPolyVoice.totalVoices = 0;
            }
        }
    }

    set totalVoices(numberOfVoices) {
        this._connectionsTo.forEach(item => {
            item.toPolyVoice.totalVoices = numberOfVoices;
        });
        while (numberOfVoices > this._voices.length) {
            const voice = this._voiceCreator();
            this._voices.push(voice);
            this._connectionsTo.forEach(item => {
                const toVoice = item.toPolyVoice.voices[this._voices.length - 1];
                voice.connect(item.parameterName ? toVoice[item.parameterName] : toVoice);
            });
        }
        while (numberOfVoices < this._voices.length) {
            const voice = this._voices.pop();
            this._connectionsTo.forEach(item => {
                const toVoice = item.toPolyVoice.voices[this._voices.length - 1];
                voice.disconnect(item.parameterName ? toVoice[item.parameterName] : toVoice);
            });
            this._voiceDestroyer(voice);
        }
    }

    get totalVoices() {
        return this._voices.length;
    }

    get voices() {
        return this._voices;
    }
}

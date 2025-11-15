import '../components/ToggleSwitch.js';

import controllersTemplate from './controllersTemplate.js';
import oscTemplate from './oscTemplate.js';
import lfoTemplate from './lfoTemplate.js';
import filterTemplate from './filterTemplate.js';
import globalTemplate from './globalTemplate.js';
import ADSRTemplate from './ADSRTemplate.js';
import phaserTemplate from './phaserTemplate.js';
import delayTemplate from './delayTemplate.js';
import reverbTemplate from './reverbTemplate.js';
import levelsTemplate from './levelsTemplate.js';

const template = () => `
<div class="synth">
    <div class="header">
        <span id="preset-name" data-module="header" data-control="library"></span> <input id="load-patch-input" type="file" accept=".json," style="display: none"></input><button id="load-patch" data-module="header" data-control="loadPatch">Load patch</button> <button id="save-patch" data-module="header" data-control="savePatch">Save patch</button> <button id="share-patch" data-module="header" data-control="sharePatch">Share patch</button>
        <toggle-switch id="show-effects" format="horizontal" on-text="EFFECTS" off-text="EFFECTS"></toggle-switch>
        <toggle-switch id="reference-tone" format="horizontal" on-text="MIDDLE C" off-text="MIDDLE C" data-module="header" data-control="c4Tone"></toggle-switch>
        <toggle-switch id="help-mode" format="horizontal" on-text="HELP MODE" off-text="HELP MODE" cap-color="lightgreen"></toggle-switch>
        <toggle-switch id="power" format="horizontal" cap-color="orangered" on-text="POWER" off-text="POWER" checked></toggle-switch>
    </div>
    <div class="controls">
        <div class="expression-controls" data-module="expressionControls">
            <div class="panel">
                <h2>&nbsp;</h2>
                <div id="controllers">${controllersTemplate}</div>
            </div>
        </div>
        <div class="settings">
            <div class="panel" data-module="lfo">
                <h2>LFO</h2>
                <div id="lfo">${lfoTemplate}</div>
            </div>
            <div class="panel" data-module="osc1">
                <h2>Oscillator 1</h2>
                <div id="oscillator-1">${oscTemplate(1)}</div>
            </div>
            <div class="panel" data-module="osc2">
                <h2>Oscillator 2</h2>
                <div id="oscillator-2">${oscTemplate(2)}</div>
            </div>
            <div class="panel" data-module="loudnessEnvelope">
                <h2>Amp Envelope</h2>
                <div id="loudness-envelope">${ADSRTemplate('loudnessEnvelope')}</div>
            </div>
            <div class="panel" data-module="filterEnvelope">
                <h2>Filter Envelope</h2>
                <div id="filter-envelope">${ADSRTemplate('filterEnvelope')}</div>
            </div>
            <div class="panel" data-module="filter">
                <h2>Filter</h2>
                <div id="filter">${filterTemplate}</div>
            </div>
            <div class="panel" data-module="global">
                <h2>Global</h2>
                <div id="global">${globalTemplate}</div>
            </div>           
        </div>
    </div>
    <div class="panel keyboard" data-module="keyboard">
    </div>
    <div class="overlay effects-rack" data-module="effectsRack">
        ${phaserTemplate}
        ${delayTemplate}
        ${reverbTemplate}
        ${levelsTemplate}
    </div>
</div>
`;

export default template;

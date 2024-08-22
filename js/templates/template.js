import '../components/ToggleSwitch.js';

import controllersTemplate from './controllersTemplate.js';
import oscTemplate from './oscTemplate.js';
import lfoTemplate from './lfoTemplate.js';
import filterTemplate from './filterTemplate.js';
import globalTemplate from './globalTemplate.js';
import ADSRTemplate from './ADSRTemplate.js';

const template = () => `
<div class="synth">
    <div class="header">
        <span id="preset-name"></span> <button id="save-patch">Save patch</button> <button id="share-patch">Share patch</button>
        <toggle-switch id="power" format="horizontal" cap-color="orangered" checked>Power: </toggle-switch>
    </div>
    <div class="controls">
        <div class="expression-controls">
            <div class="panel">
                <h2>&nbsp;</h2>
                <div id="controllers">${controllersTemplate}</div>
            </div>
        </div>
        <div class="settings">
            <div class="panel">
                <h2>LFO</h2>
                <div id="lfo">${lfoTemplate}</div>
            </div>
            <div class="panel">
                <h2>Oscillator 1</h2>
                <div id="oscillator-1">${oscTemplate(1)}</div>
            </div>
            <div class="panel">
                <h2>Oscillator 2</h2>
                <div id="oscillator-2">${oscTemplate(2)}</div>
            </div>
            <div class="panel">
                <h2>Amp Envelope</h2>
                <div id="loudness-envelope">${ADSRTemplate('loudnessEnvelope')}</div>
            </div>
            <div class="panel">
                <h2>Filter Envelope</h2>
                <div id="filter-envelope">${ADSRTemplate('filterEnvelope')}</div>
            </div>
            <div class="panel">
                <h2>Filter</h2>
                <div id="filter">${filterTemplate}</div>
            </div>
            <div class="panel">
                <h2>Global</h2>
                <div id="global">${globalTemplate}</div>
            </div>           
        </div>
    </div>
    <div class="panel keyboard">
    </div>
</div>
`;

export default template;

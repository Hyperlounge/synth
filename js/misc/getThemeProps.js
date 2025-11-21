let themeProps = null;

export default function getThemeProps(name) {
    if (!themeProps) {
        const computedStyle = getComputedStyle(document.body);
        themeProps = {};
        [
            'bright-color',
            'normal-color',
            'dark-color',
            'panel-bg-color',
            'panel-text-color',
            'help-bg-color',
            'help-text-color',
            'help-outline-color',
        ].forEach(item => {
            themeProps[item] = computedStyle.getPropertyValue(`--theme-${item}`);
        });
    }
    if (name) {
        return themeProps[name];
    } else {
        return {...themeProps};
    }
}
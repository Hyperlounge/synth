
const SVG = './media/svg';

export default function getSvgUsingHref(name, id = 'shape') {
    return `<svg><use href="${SVG}/${name}.svg#${id}" width="100%" height="100%"/></svg>`;
}
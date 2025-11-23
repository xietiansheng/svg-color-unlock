import { parseSvg } from './parseSvg';

const attributesToRemove = ['fill', 'stroke', 'style', 'fill-opacity', 'stroke-opacity'];

const cleanElement = (element: Element) => {
  attributesToRemove.forEach((attr) => element.removeAttribute(attr));
  element.setAttribute('fill', 'currentColor');

  Array.from(element.children).forEach((child) => cleanElement(child));
};

export function cleanSvg(svgString: string): string {
  const doc = parseSvg(svgString);
  cleanElement(doc.documentElement);
  return doc.documentElement.outerHTML;
}

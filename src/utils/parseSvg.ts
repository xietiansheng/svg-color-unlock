export function parseSvg(svgString: string): Document {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');

  const errorNode = doc.querySelector('parsererror');
  if (errorNode) {
    const message = errorNode.textContent ?? 'Invalid SVG content';
    throw new Error(message);
  }

  const root = doc.documentElement;
  if (!root || root.tagName.toLowerCase() !== 'svg') {
    throw new Error('提供的内容不是有效的 SVG');
  }

  return doc;
}

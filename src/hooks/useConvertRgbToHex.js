/**
 * Custom hook that converts RGB color format to hexadecimal format
 * @param {string} rgb - The RGB color string in format 'rgb(r, g, b)'
 * @returns {string} The color in hexadecimal format (e.g., '#RRGGBB')
 * @example
 * // returns '#ff0000'
 * useConvertRgbToHex('rgb(255, 0, 0)');
 */
const useConvertRgbToHex = rgb => {
  if (!rgb) return '#000000';
  const matches = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!matches) return rgb;

  const r = parseInt(matches[1]);
  const g = parseInt(matches[2]);
  const b = parseInt(matches[3]);

  return (
    '#' +
    r.toString(16).padStart(2, '0') +
    g.toString(16).padStart(2, '0') +
    b.toString(16).padStart(2, '0')
  );
};

export default useConvertRgbToHex;

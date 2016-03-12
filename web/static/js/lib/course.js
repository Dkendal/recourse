function toNum(str) {
  let value = 0;

  for (let idx = 0; idx < str.length; idx++) {
    value += str.charCodeAt(idx);
  }

  return value
}

export function toColor({ subject = "", number = "" }) {
  const hue = (toNum(subject) ** 5 + toNum(number)) * 16 % 255;

  return `hsl(${hue},${80}%,${70}%)`;
}

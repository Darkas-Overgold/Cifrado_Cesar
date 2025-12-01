const cipher = {
  // Mapa Morse (A-Z + espacio como /)
  morseMap: {
    A: ".-",   B: "-...", C: "-.-.", D: "-..",  E: ".",    F: "..-.",
    G: "--.",  H: "....", I: "..",   J: ".---", K: "-.-",  L: ".-..",
    M: "--",   N: "-.",   O: "---",  P: ".--.", Q: "--.-", R: ".-.",
    S: "...",  T: "-",    U: "..-",  V: "...-", W: ".--",  X: "-..-",
    Y: "-.--", Z: "--..",
    " ": "/"
  },

  // -------------------------
  // BINARIO
  // -------------------------
  encodeBin(offset, text) {
    if (!Number.isInteger(offset) || offset < 0) throw new Error("Offset inválido");
    text = String(text).toUpperCase();

    return [...text].map(ch => {
      if (ch === " ") return "/";
      const code = ch.charCodeAt(0) + offset;
      return code.toString(2);
    }).join(" ");
  },

  decodeBin(offset, encoded) {
    if (!Number.isInteger(offset) || offset < 0) throw new Error("Offset inválido");
    if (!encoded) return "";

    return encoded.split(" ").map(token => {
      if (token === "/") return " ";
      const num = parseInt(token, 2);
      if (Number.isNaN(num)) return "";
      const charCode = num - offset;
      return String.fromCharCode(charCode);
    }).join("");
  },

  // -------------------------
  // MORSE
  // -------------------------
  encodeMorse(offset, text) {
    if (!Number.isInteger(offset) || offset < 0) throw new Error("Offset inválido");
    text = String(text).toUpperCase();

    return [...text].map(ch => {
      const m = this.morseMap[ch] ?? "";
      return m + ".".repeat(offset);
    }).join(" ");
  },

  decodeMorse(offset, encoded) {
    if (!Number.isInteger(offset) || offset < 0) throw new Error("Offset inválido");
    if (!encoded) return "";
    const reversed = Object.entries(this.morseMap).reduce((acc, [k, v]) => {
      acc[v] = k; return acc;
    }, {});

    return encoded.split(" ").map(token => {
      if (token === "/") return " ";
      if (offset > 0 && token.endsWith(".".repeat(offset))) {
        token = token.slice(0, token.length - offset);
      }
      return reversed[token] ?? "";
    }).join("");
  },

  // -------------------------
  // INTERFAZ GENERAL
  // -------------------------
  encode(method, offset, text) {
    offset = Number(offset) || 0;
    if (method === "binario") return this.encodeBin(offset, text);
    if (method === "morse") return this.encodeMorse(offset, text);
    throw new Error("Método desconocido");
  },

  decode(method, offset, text) {
    offset = Number(offset) || 0;
    if (method === "binario") return this.decodeBin(offset, text);
    if (method === "morse") return this.decodeMorse(offset, text);
    throw new Error("Método desconocido");
  }
};

export default cipher;

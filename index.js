import cipher from "./cipher.js";

const metodoEl = document.getElementById("metodo");
const textoEl = document.getElementById("texto");
const offsetEl = document.getElementById("offset");
const resultadoEl = document.getElementById("resultado");
const btnEncode = document.getElementById("btnEncode");
const btnDecode = document.getElementById("btnDecode");

function validarOffset(raw) {
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 0) return null;
  return n;
}

btnEncode.addEventListener("click", () => {
  const method = metodoEl.value;
  const text = textoEl.value;
  const off = validarOffset(offsetEl.value);

  if (off === null) {
    alert("El offset debe ser un número entero positivo (>= 0).");
    return;
  }

  try {
    const res = cipher.encode(method, off, text);
    resultadoEl.value = res;
  } catch (err) {
    console.error(err);
    alert("Error al cifrar: " + err.message);
  }
});

btnDecode.addEventListener("click", () => {
  const method = metodoEl.value;
  const text = textoEl.value;
  const off = validarOffset(offsetEl.value);

  if (off === null) {
    alert("El offset debe ser un número entero positivo (>= 0).");
    return;
  }

  try {
    const res = cipher.decode(method, off, text);
    resultadoEl.value = res;
  } catch (err) {
    console.error(err);
    alert("Error al descifrar: " + err.message);
  }
});

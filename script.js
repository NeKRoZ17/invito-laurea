const pulsanteApri = document.querySelector("#apri-invito");
const apertura = document.querySelector("#apertura");
const contenutoInvito = document.querySelector("#contenuto-invito");
const pulsanteCopia = document.querySelector("#copia-invito");
const statoCopia = document.querySelector("#stato-copia");
const moduloRisposta = document.querySelector("#modulo-risposta");
const statoRisposta = document.querySelector("#stato-risposta");

pulsanteApri.addEventListener("click", () => {
  pulsanteApri.classList.add("apertura__busta--aperta");
  apertura.classList.add("apertura--in-chiusura");

  window.setTimeout(() => {
    apertura.classList.add("apertura--nascosta");
    apertura.setAttribute("aria-hidden", "true");
    contenutoInvito.removeAttribute("aria-hidden");
    contenutoInvito.classList.add("contenuto--visibile");
  }, 650);
});

pulsanteCopia.addEventListener("click", async () => {
  const dettagli = [
    "Ti invito alla mia laurea!",
    "Jamaica D’Avena",
    "27 novembre 2026 alle 20:30",
    "Contrada Imperatore"
  ].join("\n");

  try {
    await navigator.clipboard.writeText(dettagli);
    statoCopia.textContent = "Dettagli copiati negli appunti.";
  } catch {
    statoCopia.textContent = "Non è stato possibile copiare. Puoi selezionare e copiare i dettagli manualmente.";
  }
});

moduloRisposta.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const dati = new FormData(moduloRisposta);
  const presenza = dati.get("presenza").toString();

  statoRisposta.textContent = presenza === "Sì, ci sarò!"
    ? "Grazie per la risposta! Jamaica ti aspetta con gioia ♥"
    : "Grazie per avermelo fatto sapere! ♥";
});

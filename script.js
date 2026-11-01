// Indirizzo a cui inviare le conferme via email.
const EMAIL_CONFERME = "";

const pulsanteCopia = document.querySelector("#copia-invito");
const statoCopia = document.querySelector("#stato-copia");
const moduloRisposta = document.querySelector("#modulo-risposta");
const statoRisposta = document.querySelector("#stato-modulo");
const aperturaBusta = document.querySelector("#apertura-busta");
const pulsanteApri = document.querySelector("#apri-invito");
const contenutoInvito = document.querySelector("#contenuto-invito");

pulsanteApri.addEventListener("click", () => {
  pulsanteApri.classList.add("in-apertura");
  aperturaBusta.classList.add("in-apertura");

  window.setTimeout(() => {
    aperturaBusta.classList.add("nascosto");
    aperturaBusta.setAttribute("aria-hidden", "true");
    contenutoInvito.removeAttribute("aria-hidden");
    contenutoInvito.classList.add("visibile");
  }, 650);
});

pulsanteCopia.addEventListener("click", async () => {
  const dettagliInvito = [
    "Ti invito alla mia laurea!",
    "Jamaica D’Avena",
    "27 novembre 2026 alle 20:30",
    "Contrada Imperatore"
  ].join("\n");

  try {
    await navigator.clipboard.writeText(dettagliInvito);
    statoCopia.textContent = "Dettagli copiati negli appunti.";
  } catch (errore) {
    statoCopia.textContent = "Non è stato possibile copiare. Puoi selezionare e copiare i dettagli manualmente.";
  }
});

moduloRisposta.addEventListener("submit", (invio) => {
  invio.preventDefault();

  const datiRisposta = new FormData(moduloRisposta);
  const presenza = datiRisposta.get("presenza").toString();
  statoRisposta.textContent = presenza === "Sì, ci sarò!"
    ? "Grazie per la risposta! Jamaica ti aspetta con gioia ♥"
    : "Grazie per avermelo fatto sapere! ♥";

  if (!EMAIL_CONFERME) return;

  const oggetto = encodeURIComponent("Conferma invito alla laurea");
  const messaggio = encodeURIComponent(presenza);
  window.location.href = `mailto:${EMAIL_CONFERME}?subject=${oggetto}&body=${messaggio}`;
});

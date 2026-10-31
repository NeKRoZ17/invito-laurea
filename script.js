// Inserisci qui l'indirizzo che vuoi usare per ricevere le conferme RSVP.
const RSVP_EMAIL = "";

const copyButton = document.querySelector("#copy-invitation");
const copyStatus = document.querySelector("#copy-status");
const rsvpForm = document.querySelector("#rsvp-form");
const formStatus = document.querySelector("#form-status");
const envelopeScreen = document.querySelector("#envelope-screen");
const openInvitationButton = document.querySelector("#open-invitation");
const invitationContent = document.querySelector("#invitation-content");

openInvitationButton.addEventListener("click", () => {
  openInvitationButton.classList.add("is-opening");
  envelopeScreen.classList.add("is-opening");

  window.setTimeout(() => {
    envelopeScreen.classList.add("is-hidden");
    envelopeScreen.setAttribute("aria-hidden", "true");
    invitationContent.removeAttribute("aria-hidden");
    invitationContent.classList.add("is-visible");
  }, 450);
});

copyButton.addEventListener("click", async () => {
  const details = [
    "Ti invito alla mia laurea!",
    "Jamaica D’Avena",
    "27 novembre 2026 alle 20:30",
    "Contrada Imperatore"
  ].join("\n");

  try {
    await navigator.clipboard.writeText(details);
    copyStatus.textContent = "Dettagli copiati negli appunti.";
  } catch (error) {
    copyStatus.textContent = "Non è stato possibile copiare. Puoi selezionare e copiare i dettagli manualmente.";
  }
});

rsvpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "";

  if (!RSVP_EMAIL) {
    formStatus.textContent = "Per attivare le conferme, inserisci il tuo indirizzo email nella variabile RSVP_EMAIL in script.js.";
    return;
  }

  const formData = new FormData(rsvpForm);
  const attendance = formData.get("attendance").toString();
  const subject = encodeURIComponent("Conferma invito alla laurea");
  const body = encodeURIComponent(attendance);
  window.location.href = `mailto:${RSVP_EMAIL}?subject=${subject}&body=${body}`;
});

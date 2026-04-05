const form = document.getElementById("lead-form");
const result = document.getElementById("form-result");
const submitButton = document.getElementById("submit-button");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Invio in corso...";
  result.className = "form-result";
  result.textContent = "Invio in corso...";

  try {
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    });

    const data = await response.json();

    if (response.status === 200) {
      result.className = "form-result success";
      result.textContent = "Richiesta inviata con successo. Ti ricontatteremo al più presto.";
      form.reset();
    } else {
      result.className = "form-result error";
      result.textContent = data.message || "Si è verificato un errore. Riprova tra poco.";
    }
  } catch (error) {
    result.className = "form-result error";
    result.textContent = "Si è verificato un errore. Riprova tra poco.";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Richiedi analisi gratuita";
  }
});

const signup = document.querySelector(".signup");
const email = document.querySelector("#email");
const endButton = document.querySelector(".end-button");
const fieldMessage = document.querySelector(".field-message");
let activeModal;
let endingTimers = [];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

writeOnIntroCopy();

signup?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!emailPattern.test(email.value.trim())) {
    fieldMessage.hidden = false;
    return;
  }

  fieldMessage.hidden = true;
  signup.querySelector("button").textContent = "THANK YOU";
});

email?.addEventListener("input", () => {
  fieldMessage.hidden = true;
});

endButton?.addEventListener("click", () => {
  clearEnding();
  endButton.disabled = true;
  endButton.textContent = "GOODBYE";
  document.body.classList.remove("has-ended");

  const mark = document.querySelector(".mark");
  const targets = [
    ...topMetaTargets(),
    ...wordTargets(document.querySelector(".copy-block p")),
    document.querySelector("#email"),
    document.querySelector(".signup button"),
    document.querySelector(".signup"),
    document.querySelector(".wordmark-desktop"),
    document.querySelector(".wordmark-mobile")
  ].filter(Boolean);
  const shuffledTargets = shuffle(targets);

  shuffledTargets.forEach((target, index) => {
    endingTimers.push(window.setTimeout(() => {
      target.classList.add("is-gone");
    }, index * 105 + Math.random() * 180));
  });

  const endButtonDelay = shuffledTargets.length * 105 + 380;
  const finalDelay = endButtonDelay + 520;

  endingTimers.push(window.setTimeout(() => {
    mark?.classList.add("is-gone");
  }, endButtonDelay - 260));

  endingTimers.push(window.setTimeout(() => {
    endButton.classList.add("is-gone");
  }, endButtonDelay));

  endingTimers.push(window.setTimeout(() => {
    document.body.classList.add("has-ended");
  }, finalDelay));
});

function wordTargets(paragraph) {
  if (!paragraph) return [];

  if (!paragraph.dataset.originalHtml) {
    paragraph.dataset.originalHtml = paragraph.innerHTML;
  }

  const words = paragraph.textContent.trim().split(/(\s+)/);
  paragraph.textContent = "";

  return words.map((word) => {
    const span = document.createElement("span");
    span.textContent = word;
    paragraph.append(span);
    return word.trim() ? span : null;
  }).filter(Boolean);
}

function topMetaTargets() {
  const meta = document.querySelector(".top-meta span");
  const links = Array.from(document.querySelectorAll(".top-meta a"));

  return [
    ...wordTargets(meta),
    ...links
  ];
}

function clearEnding() {
  endingTimers.forEach((timer) => window.clearTimeout(timer));
  endingTimers = [];
}

function shuffle(items) {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

function writeOnIntroCopy() {
  const paragraph = document.querySelector(".copy-block p");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!paragraph || reduceMotion) return;

  const parts = paragraph.textContent.trim().split(/(\s+)/);
  paragraph.textContent = "";

  const words = parts.map((part) => {
    if (!part.trim()) {
      paragraph.append(part);
      return null;
    }

    const span = document.createElement("span");
    span.className = "write-word";
    span.textContent = part;
    paragraph.append(span);
    return span;
  }).filter(Boolean);

  words.forEach((word, index) => {
    window.setTimeout(() => {
      word.classList.add("is-visible");
    }, 420 + index * 58);
  });
}

document.querySelectorAll("[data-modal-open]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openModal(document.getElementById(trigger.dataset.modalOpen));
  });
});

document.querySelectorAll("[data-modal-close]").forEach((trigger) => {
  trigger.addEventListener("click", closeModal);
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

function openModal(modal) {
  if (!modal) return;

  closeModal();
  activeModal = modal;
  activeModal.hidden = false;
  activeModal.querySelector("[data-modal-close]")?.focus();
}

function closeModal() {
  if (!activeModal) return;

  activeModal.hidden = true;
  activeModal = null;
}


const SITE_CONTENT = {
  personalMessage: `Well so 16 days left for your brithday huh? Well i am just here to remind you that you are worth a lott more than you think trust me.`,
  ordinarySecretTitle: "RESTRICTED ARCHIVE — SUBJECT: YOU",
  ordinarySecret: `KNOWN ACTIVITIES: Excessive nonsense.
THREAT LEVEL: very high.
PROBABILITY OF BEHAVING NORMALLY: Record unavailable.
LIBRARIAN'S FINAL NOTE: I give up.
STATUS: This file is not to be shown to the subject. (Oops.)`,
  birthdaySecretTitle: "THE GOLD-EDGED BIRTHDAY EDITION",
  birthdaySecret: `OFFICIAL ARCHIVE FINDING:

Today, the main character levels up.

May this next chapter contain excellent plot twists, people who make you laugh until your face hurts, more reasons to be proud of yourself, and memories worth keeping forever.

HAPPY BIRTHDAY, PALAK!! The library is closed today because everyone is busy celebrating your existence. ♡`
};
const IST_OFFSET = 5.5 * 60 * 60 * 1000;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
function istParts(date = new Date()) {
  const shifted = new Date(date.getTime() + IST_OFFSET);
  return {year: shifted.getUTCFullYear(), month: shifted.getUTCMonth()+1, day: shifted.getUTCDate()};
}
function isBirthdayIST(date = new Date()) {
  const p = istParts(date);
  return p.month === 11 && p.day === 20;
}
// November 20 at 00:00 IST is November 19 at 18:30 UTC.
function nextBirthdayTarget(date = new Date()) {
  const p = istParts(date);
  let year = p.year;
  if (p.month > 11 || (p.month === 11 && p.day >= 21)) year++;
  return new Date(Date.UTC(year, 10, 19, 18, 30, 0));
}
const pad = (n, length=2) => String(n).padStart(length, "0");
function makeGoldDust() {
  const box = $("#gold-dust");
  if (box.childElementCount) return;
  for (let i=0; i<30; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    p.style.left = `${Math.random()*100}%`;
    p.style.animationDelay = `${Math.random()*5}s`;
    p.style.animationDuration = `${3+Math.random()*4}s`;
    box.append(p);
  }
}
function updateCountdown() {
  const now = new Date();
  const parts = istParts(now);
  const birthday = isBirthdayIST(now);
  document.body.classList.toggle("gold-mode", birthday);
  $("#birthday-secret").hidden = !birthday;
  $("#date-stamp").textContent = birthday ? "SPECIAL HOURS: BIRTHDAY EDITION" : "OPEN HOURS: ALWAYS";
  let remaining = Math.max(0, nextBirthdayTarget(now).getTime() - now.getTime());
  if (birthday) remaining = 0;
  const seconds = Math.floor(remaining/1000);
  $("#days").textContent = pad(Math.floor(seconds/86400),3);
  $("#hours").textContent = pad(Math.floor(seconds%86400/3600));
  $("#minutes").textContent = pad(Math.floor(seconds%3600/60));
  $("#seconds").textContent = pad(seconds%60);
  $("#count-kicker").textContent = birthday ? "THE OCCASION IS CURRENTLY HAPPENING" : "NEXT MAJOR OCCASION";
  $("#count-title").textContent = birthday ? "IT'S YOUR DAY" : "YOUR DAY";
  if (birthday) makeGoldDust();
  else $("#gold-dust").replaceChildren();
}
function goToScreen(n) {
  $$(".screen").forEach(s => s.classList.toggle("active", s.id === `screen${n}`));
  window.scrollTo({top:0, behavior:matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"});
}
function openModal(eyebrow, title, message) {
  $("#modal-eyebrow").textContent = eyebrow;
  $("#modal-title").textContent = title;
  const content = $("#modal-content");
  content.replaceChildren();
  const p = document.createElement("p");
  p.textContent = message;
  content.append(p);
  $("#modal").hidden = false;
  $("#close-modal").focus();
}
function closeModal() { $("#modal").hidden = true; }
function revealRecord(el) {
  openModal("CATALOGUE CROSS-REFERENCE · UNOFFICIAL", el.textContent.replace(/\s+/g," ").trim(), el.dataset.record);
}
document.addEventListener("DOMContentLoaded", () => {
  $("#personal-message").textContent = SITE_CONTENT.personalMessage;
  $("#open-book").addEventListener("click", () => goToScreen(2));
  $("#book-cover").addEventListener("click", () => goToScreen(2));
  $$("[data-go]").forEach(btn => btn.addEventListener("click", () => goToScreen(btn.dataset.go)));
  $$(".shelf-book").forEach(book => {
    book.addEventListener("click", () => revealRecord(book));
    book.addEventListener("keydown", e => { if(e.key==="Enter" || e.key===" ") { e.preventDefault(); revealRecord(book); }});
  });
  $("#ordinary-secret").addEventListener("click", () => openModal("RESTRICTED ARCHIVE · ACCESS GRANTED", SITE_CONTENT.ordinarySecretTitle, SITE_CONTENT.ordinarySecret));
  $("#birthday-secret").addEventListener("click", () => openModal("A RARE EDITION HAS BEEN RELEASED", SITE_CONTENT.birthdaySecretTitle, SITE_CONTENT.birthdaySecret));
  $("#open-letter").addEventListener("click", () => {
    const letter = $("#letter");
    const opening = letter.hidden;
    letter.hidden = !opening;
    $("#open-letter").setAttribute("aria-expanded", String(opening));
    $("#open-letter small").textContent = opening ? "CLOSE THE SEAL" : "BREAK THE SEAL";
    if(opening) letter.scrollIntoView({behavior:"smooth",block:"nearest"});
  });
  $("#close-modal").addEventListener("click", closeModal);
  $("#modal-ok").addEventListener("click", closeModal);
  $("#modal").addEventListener("click", e => { if(e.target === $("#modal")) closeModal(); });
  document.addEventListener("keydown", e => { if(e.key==="Escape") closeModal(); });
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

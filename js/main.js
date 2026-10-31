"use strict";
/* ============ Boot & global listeners ============ */
document.addEventListener("pointerdown", function(){ ResumeAudio(); }, { passive: true });
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("dblclick", e => e.preventDefault());

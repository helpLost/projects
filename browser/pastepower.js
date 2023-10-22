function pastepower(e) { e.stopImmediatePropagation(); }
document.addEventListener("paste", pastepower, true);
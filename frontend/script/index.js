console.log("Snooping around, are we?");

function updatePageWidth() {
    const ratio = 100 * document.documentElement.clientHeight / document.documentElement.clientWidth;
    const width = Math.min(100, Math.max(50, ratio));

    document.querySelectorAll(".dyn-max-width").forEach(element => {
        element.style.width = width + '%';
        element.style.maxWidth = width + '%';
    });
}

window.addEventListener('DOMContentLoaded', event => updatePageWidth());
window.addEventListener('resize', event => updatePageWidth());
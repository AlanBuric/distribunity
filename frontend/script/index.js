async function updatePageWidth(elementIDs) {
    const ratio = 100 * document.documentElement.clientHeight / document.documentElement.clientWidth;
    const width = Math.min(100, Math.max(50, ratio));

    elementIDs.forEach(element => {
        document.getElementById(element).style.width = width + '%';
    });
}

window.addEventListener('DOMContentLoaded', event => updatePageWidth(['page']));
window.addEventListener('resize', event => updatePageWidth(['page']));
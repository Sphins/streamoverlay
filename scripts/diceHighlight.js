function highlightDiceResult() {
    let formulaElement = document.querySelector(".notif-formula");
    let totalElement = document.querySelector(".notif-total");
    
    if(!formulaElement || !totalElement) {
        console.error("Erreur: Éléments .notif-formula ou .notif-total introuvables.");
        return;
    }

    // Nettoyage de la formule pour ne conserver que les caractères pertinents
    let formulaValue = formulaElement.innerHTML.replace(/&nbsp;/g, ' ').trim();
    let totalValue = parseInt(totalElement.textContent.trim(), 10);

    if (isNaN(totalValue)) {
        console.error("Erreur: La valeur de totalValue n'est pas un nombre.");
        return;
    }

    // Extraire le nombre de faces du premier dé.
    let diceMatch = formulaValue.match(/d(\d+)/);
    let maxDiceValue = diceMatch ? parseInt(diceMatch[1], 10) : 0;

    // Extraire tous les modificateurs et en faire la somme.
    let modifiers = formulaValue.match(/[+-]\s*\d+/g) || [];
    let sumModifiers = modifiers.reduce((sum, mod) => sum + parseInt(mod.replace(/\s+/g, ''), 10), 0);

    let minPotential = 1 + sumModifiers;
    let maxPotential = maxDiceValue + sumModifiers;

    totalElement.classList.remove("red-result", "green-result", "black-result");

    if (totalValue === minPotential) {
        totalElement.classList.add("red-result");
    } else if (totalValue === maxPotential) {
        totalElement.classList.add("green-result");
    } else {
        totalElement.classList.add("black-result");
    }
}



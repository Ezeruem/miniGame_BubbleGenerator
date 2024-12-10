const counterDisplay = document.querySelector("h3");
let counter = 0; // Compteur pour les bulles cliquées
let domClicks = 0; // Compteur pour les clics sur le DOM

// Fonction pour terminer le jeu
const endGame = () => {
  alert(`Jeu terminé ! Vous avez marqué ${counter} points.`);
  const restart = confirm("Voulez-vous recommencer ?");
  if (restart) {
    // Réinitialiser les compteurs et redémarrer le jeu
    counter = 0;
    domClicks = 0;
    counterDisplay.textContent = counter;
  } else {
    // Désactive les événements et arrête les bulles
    document.removeEventListener("click", handleDomClick);
    clearInterval(bubbleInterval);
  }
};

// Fonction pour gérer les clics sur le DOM
const handleDomClick = (event) => {
  // Vérifie si le clic n'est pas sur une bulle
  if (!event.target.classList.contains("bubble")) {
    domClicks++;
    if (domClicks >= 3) {
      endGame();
    }
  }
};

// Fonction qui crée des bulles
const bubbleMaker = () => {
  const bubble = document.createElement("span");
  bubble.classList.add("bubble");
  document.body.appendChild(bubble);

  const size = Math.random() * 200 + 100 + "px";
  bubble.style.height = size;
  bubble.style.width = size;
  bubble.style.top = Math.random() * 100 + "%";
  bubble.style.left = Math.random() * 100 + "%";

  const plusMinus = Math.random() > 0.5 ? 1 : -1;
  bubble.style.setProperty("--left", Math.random() * 100 * plusMinus + "%");

  // Ajoute un événement pour les clics sur la bulle
  bubble.addEventListener("click", (event) => {
    event.stopPropagation(); // Empêche l'événement de se propager au document
    counter++;
    counterDisplay.textContent = counter;
    bubble.remove();
  });

  // Supprime la bulle après un délai
  setTimeout(() => {
    bubble.remove();
  }, 8000);
};

// Lancement du jeu
const bubbleInterval = setInterval(bubbleMaker, 1000);

// Ajout de l'écouteur sur tout le document
document.addEventListener("click", handleDomClick);
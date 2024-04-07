
function recupererTousLesTravaux() {
  fetch('http://localhost:5678/api/works')
    .then(reponse => reponse.json())
    .then(travaux => {
      const galerie = document.querySelector('.gallery');
      travaux.forEach(travail => {
        const element = document.createElement('div');
        element.innerHTML = ` 
            <img src="${travail.imageUrl}" alt="${travail.title}">
            <h3>${travail.title}</h3>
          `;
        galerie.appendChild(element);
      });
    })
    .catch(erreur => console.error("Erreur lors de la récupération des travaux: ", erreur));
}

document.addEventListener('DOMContentLoaded', recupererTousLesTravaux); 


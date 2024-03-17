
function recupererTousLesTravaux() {
    fetch('http://localhost:5678/api/works')
      .then(reponse => reponse.json())
      .then(travaux => {
        const galerie = document.querySelector('.gallery');
        travaux.forEach(travail => {
          const element = document.createElement('div');
          element.innerHTML = `
            <h3>${travail.title}</h3>
            <img src="${travail.imageUrl}" alt="${travail.title}">
            <p>Catégorie: ${travail.category.name}</p>
          `;
          galerie.appendChild(element);
        });
      })
      .catch(erreur => console.error("Erreur lors de la récupération des travaux: ", erreur));
  }
  
  document.addEventListener('DOMContentLoaded', recupererTousLesTravaux);
  
  // Fonction des categories 

  function recupererCategoriesEtAfficherMenu() {
    fetch('http://localhost:5678/api/categories')
      .then(response => response.json())
      .then(categories => {
        const menuCategories = document.querySelector('.menu-categories');
        const categoriesUniques = new Set(categories.map(categorie => categorie.name));
  
        categoriesUniques.forEach(categorie => {
          const boutonCategorie = document.createElement('button');
          boutonCategorie.textContent = categorie;
          boutonCategorie.addEventListener('click', () => filtrerTravauxParCategorie(categorie));
          menuCategories.appendChild(boutonCategorie);
        });
  
        // Ajoute un bouton pour afficher tous les travaux
        const boutonTous = document.createElement('button');
        boutonTous.textContent = 'Tous';
        boutonTous.addEventListener('click', () => afficherTousLesTravaux());
        menuCategories.prepend(boutonTous);
      })
      .catch(erreur => console.error("Erreur lors de la récupération des catégories: ", erreur));
  }
  
  function filtrerTravauxParCategorie(categorie) {
    // Ici, tu filtrerais l'array de travaux basé sur la catégorie
    // et mettrais à jour l'affichage dans la galerie.
    console.log(`Filtrer les travaux par la catégorie: ${categorie}`);
    // Exemple de filtrage (tu devras adapter cela à ta structure de données)
    const travauxFiltres = tousLesTravaux.filter(travail => travail.categorie.name === categorie);
    afficherTravaux(travauxFiltres);
  }
  
  function afficherTousLesTravaux() {
    afficherTravaux(tousLesTravaux); // Assure-toi que `tousLesTravaux` est accessible
  }
  
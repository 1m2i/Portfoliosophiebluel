// Fonction pour initialiser le filtrage des projets
function initProjectFilters() {
    // Récupération des catégories depuis l'API
    fetch('http://localhost:5678/api/categories')
      .then(response => response.json())
      .then(categories => {
        const filterButtons = document.querySelector('.filter-buttons');
        
        // Bouton pour tous les projets
        const allButtonHtml = `<button class="filter filter-selected" data-id="all">Tous</button>`;
        // Générer les boutons pour chaque catégorie
        const buttonsHtml = categories.map(category => `<button class="filter" data-id="${category.id}">${category.name}</button>`).join("");
        
        // Insérer les boutons dans le HTML
        filterButtons.innerHTML = allButtonHtml + buttonsHtml;
  
        // Ajout d'écouteurs d'événements sur les boutons pour filtrer les projets
        document.querySelectorAll('.filter-buttons button').forEach(button => {
          button.addEventListener('click', () => {
            const categoryId = button.dataset.id;
            filterProjects(categoryId);
            setSelectedFilter(button);
          });
        });
      });
  }
  
  // Fonction pour filtrer les projets selon la catégorie
  function filterProjects(categoryId) {
    fetch('http://localhost:5678/api/works')
      .then(response => response.json())
      .then(works => {
        const gallery = document.querySelector('.gallery');
        gallery.innerHTML = ''; // Vider la galerie avant d'afficher les résultats filtrés
        
        works.forEach(work => {
          // Afficher le travail seulement s'il correspond à la catégorie sélectionnée ou si 'tous' est sélectionné
          if (categoryId === 'all' || work.categoryId.toString() === categoryId) {
            const element = document.createElement('div');
            element.innerHTML = `<img src="${work.imageUrl}" alt="${work.title}"><h3>${work.title}</h3>`;
            gallery.appendChild(element);
          }
        });
      })
      .catch(error => console.error("Erreur lors de la récupération des travaux: ", error));
  }
  
  // Fonction pour définir le filtre sélectionné
  function setSelectedFilter(selectedButton) {
    document.querySelectorAll('.filter-buttons button').forEach(button => {
      button.classList.remove('filter-selected');
    });
    selectedButton.classList.add('filter-selected');
  }
  
  // Initialiser les filtres et récupérer tous les travaux au chargement de la page
  document.addEventListener('DOMContentLoaded', () => {
    initProjectFilters();
  });
  
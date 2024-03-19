
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
  
  // Fonction des categories 

fetch('http://localhost:5678/api/categories')
.then(response => response.json())
.then(categories => {
  const filterButtons = document.querySelector('.filter-buttons');
  const buttonsHtml = categories.map(category => {
    return `<button class="filter" data-id="${category.id}">${category.name}</button>`;
  }).join("");
 
  const allButtonHtml = `<button class="filter filter-selected" data-id="all">Tous</button>`;
  // Create the complete structure by combining the "Tous" button with the category buttons
  const filterButtonsHtml = allButtonHtml + buttonsHtml;
  // Use innerHTML to update the content of the div filter-buttons
  filterButtons.innerHTML = filterButtonsHtml;
  
  // Add an event listener to each filter button
  const buttons = document.querySelectorAll('.filter-buttons button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // Check if the "Tous" button is clicked (with the class "filter-selected"), if so, call "filterProjects" with categoryId as null,
      // Otherwise, find the category id associated and call "filterProjects" with this id to filter the projects by category
      const categoryId = button.dataset.id;
      filterProjects(categoryId, button);
    });
  });
});

function filterProjects(categoryId, selectedButton) {
  // Implementation depends on how you want to filter your projects
  // You need to implement filtering logic here
  // Example:
  // const filteredProjects = categoryId === 'all' ? allProjects : allProjects.filter(project => project.categoryId === categoryId);
  // displayProjects(filteredProjects);
  setSelectedFilter(selectedButton);
}

function setSelectedFilter(selectedButton) {
  const buttons = document.querySelectorAll('.filter-buttons button');
  buttons.forEach(button => {
    button.classList.remove('filter-selected');
  });
  selectedButton.classList.add('filter-selected');
}


function initProjectFilters() {
    // call categories  from API
    fetch('http://localhost:5678/api/categories')
      .then(response => response.json())
      .then(categories => {
        const filterButtons = document.querySelector('.filter-buttons');
        
        // Boutton for all projects
        const allButtonHtml = `<button class="filter filter-selected" data-id="all">Tous</button>`;
       
        const buttonsHtml = categories.map(category => `<button class="filter" data-id="${category.id}">${category.name}</button>`).join("");
        
        // Insert bouttons 
        filterButtons.innerHTML = allButtonHtml + buttonsHtml;
  
        
        document.querySelectorAll('.filter-buttons button').forEach(button => {
          button.addEventListener('click', () => {
            const categoryId = button.dataset.id;
            filterProjects(categoryId);
            setSelectedFilter(button);
          });
        });
      });
  }
  
  function filterProjects(categoryId) {
    fetch('http://localhost:5678/api/works')
      .then(response => response.json())
      .then(works => {
        const gallery = document.querySelector('.gallery');
        gallery.innerHTML = ''; // Clear the gallery before displaying the filtered results
        
        works.forEach(work => {
          
          if (categoryId === 'all' || work.categoryId.toString() === categoryId) {
            const element = document.createElement('div');
            element.innerHTML = `<img src="${work.imageUrl}" alt="${work.title}"><h3>${work.title}</h3>`;
            gallery.appendChild(element);
          }
        });
      })
      .catch(error => console.error("Erreur lors de la récupération des travaux: ", error));
  }
  
  
  function setSelectedFilter(selectedButton) {
    document.querySelectorAll('.filter-buttons button').forEach(button => {
      button.classList.remove('filter-selected');
    });
    selectedButton.classList.add('filter-selected');
  }
  
  // Initialize filters and retrieve all tasks on page load
  document.addEventListener('DOMContentLoaded', () => {
    initProjectFilters();
  });
  
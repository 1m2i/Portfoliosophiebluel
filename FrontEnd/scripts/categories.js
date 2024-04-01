fetch('http://localhost:5678/api/categories')
.then(response => response.json())
.then(categories => {
  const filterButtons = document.querySelector('.filter-buttons');
  const buttonsHtml = categories.map(category => {
    return `<button class="filter" data-id="${category.id}">${category.name}</button>`;
  }).join("");
 
  const allButtonHtml = `<button class="filter filter-selected" data-id="all">Tous</button>`;
 
  const filterButtonsHtml = allButtonHtml + buttonsHtml;

  filterButtons.innerHTML = filterButtonsHtml;
  

  const buttons = document.querySelectorAll('.filter-buttons button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
    
      const categoryId = button.dataset.id;
      filterProjects(categoryId, button);
    });
  });
});



 function setSelectedFilter(selectedButton) {
  const buttons = document.querySelectorAll('.filter-buttons button');
  buttons.forEach(button => {
    button.classList.remove('filter-selected');
  });
  selectedButton.classList.add('filter-selected');
}

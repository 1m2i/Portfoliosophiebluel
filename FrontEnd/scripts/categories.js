// fetch('http://localhost:5678/api/categories')
// .then(response => response.json())
// .then(categories => {
//   const filterButtons = document.querySelector('.filter-buttons');
//   const buttonsHtml = categories.map(category => {
//     return `<button class="filter" data-id="${category.id}">${category.name}</button>`;
//   }).join("");
 
//   const allButtonHtml = `<button class="filter filter-selected" data-id="all">Tous</button>`;
 
//   const filterButtonsHtml = allButtonHtml + buttonsHtml;

//   filterButtons.innerHTML = filterButtonsHtml;
  

//   const buttons = document.querySelectorAll('.filter-buttons button');
//   buttons.forEach(button => {
//     button.addEventListener('click', () => {
    
//       const categoryId = button.dataset.id;
//       filterProjects(categoryId, button);
//     });
//   });
// });

// console.log (filterButtons)

//  function setSelectedFilter(selectedButton) {
//   const buttons = document.querySelectorAll('.filter-buttons button');
//   buttons.forEach(button => {
//     button.classList.remove('filter-selected');
//   });
//   selectedButton.classList.add('filter-selected');
// }
// Récupération des catégories depuis l'API
const getAllCategory = async () => {
  // Récupération de toutes les catégories
  await fetch("http://localhost:5678/api/categories")
    .then((res) => {
      return res.json();
    })
    .then((res_json) => (array_All_Category = res_json));
};

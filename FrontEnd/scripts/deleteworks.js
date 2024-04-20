// function recupererTousLesTravaux() {
//     fetch('http://localhost:5678/api/works')
//       .then(response => response.json())
//       .then(works => {
//         const gallery = document.querySelector('.image-container');
//         works.forEach(work => {
//           const element = document.createElement('div');
//           element.className = 'removable-thumbnail';
//           element.innerHTML = `
//             <img src="${work.image}" alt="${work.title}"> <!-- Assuming 'image' is the correct field -->
//             <h3>${work.title}</h3>
//             <span class="icon-delete"><i class="fa-solid fa-xmark"></i></span>
//           `;
//           gallery.appendChild(element);
//         });
//       })
//       .catch(error => console.error("Erreur lors de la récupération des travaux: ", error));
//   }
  
//   document.addEventListener('DOMContentLoaded', recupererTousLesTravaux);
function toggleModal() {
	const modal = document.querySelector('.modal');
	modal.classList.toggle('hidden');
  }
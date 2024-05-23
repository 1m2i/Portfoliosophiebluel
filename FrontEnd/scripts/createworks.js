const formImageInput = document.getElementById("form-image");
const newImageLabel = document.getElementById("new-image");
const photoAddIcon = document.getElementById("photo-add-icon");
const modalEditNewPhoto = document.getElementById("modal-edit-new-photo");
const formTitle = document.getElementById("form-title");
const formCategory = document.getElementById("form-category");

fetch("http://localhost:5678/api/categories", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("Sophie_Bluel_Architecte_JWT")}`,
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return response.json();
  })
  .then((categories) => {
    if (categories && Array.isArray(categories)) {
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        formCategory.appendChild(option);
      });
    }
  })
  .catch((error) => console.error("Error fetching categories:", error));

function previewImage(input) {
  const existingImg = document.querySelector("#modal-edit-new-photo img");

  if (existingImg) {
    existingImg.remove();
  }

  newImageLabel.style.display = "block";
  photoAddIcon.style.display = "block";
  document.getElementById("photo-size").style.display = "block";

  if (input.files && input.files[0]) {
    newImageLabel.style.display = "none";
    photoAddIcon.style.display = "none";
    document.getElementById("photo-size").style.display = "none";
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.alt = "Preview Image";
      img.style.width = "30%";
      modalEditNewPhoto.appendChild(img);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

formImageInput.addEventListener("change", function () {
  previewImage(formImageInput);
});

const btnAddWorksValidate = document.querySelector(".submit-new-work");

btnAddWorksValidate.addEventListener("click", async function (event) {
  event.preventDefault();

  const title = formTitle.value;
  const categoryId = formCategory.value;
  const image = formImageInput.files[0];

  if (!image) {
    alert("Merci de sélectionner une image.");
    return;
  }

  if (!title) {
    alert("Merci de renseigner un titre.");
    return;
  }

  if (!categoryId) {
    alert("Merci de sélectionner une catégorie.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", categoryId);
    formData.append("image", image);

    const token = localStorage.getItem("Sophie_Bluel_Architecte_JWT");
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("Sophie_Bluel_Architecte_JWT")}`,
        },
      body: formData,
    });
    if (response.ok) {
      console.log("projet ajouté");

      alert("Projet ajouté avec succès :)");
      // call these functions 
      recupererTousLesTravaux();
      getAllworksForDelete();

      document.getElementById("modal-edit-work-form").reset();
      previewImage(formImageInput);
    } else {
      console.error(
        "Failed to add the project:",
        response.status,
        response.statusText
      );
      alert(
        "Une erreur est survenue lors de l'ajout du projet. Veuillez réessayer."
      );
    }
  } catch (error) {
    alert("Une erreur est survenue. Veuillez réessayer.");
  }
});

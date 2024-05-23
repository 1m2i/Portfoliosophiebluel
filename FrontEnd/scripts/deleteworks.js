
function getAllworksForDelete() {
    
    fetch("http://localhost:5678/api/works", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "Sophie_Bluel_Architecte_JWT"
        )}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch works");
        }
        return response.json();
      })
      .then((data) => {
       
        container.innerHTML = "";
  
        data.forEach((work) => {
          const wrapper = createImageWrapper(work);
          container.appendChild(wrapper);
          
          // mainGallery.appendChild(wrapper.cloneNode(true)); // Add to main gallery as well
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }
  getAllworksForDelete();
  
  const container = document.querySelector(".photo-mini-gallery");
  
  function createImageWrapper(work) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("image-wrapper");
    wrapper.dataset.id = work.id;
  
    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;
    img.dataset.id = work.id;
  
    const icon = document.createElement("i");
    icon.classList.add("fa", "fa-trash-can");
    icon.style.cursor = "pointer";
  
    wrapper.appendChild(img);
    wrapper.appendChild(icon);
  
    // Attach the event listener to the delete icon
    icon.addEventListener("click", () => {
      const confirmDelete = confirm(
        "Are you sure you want to delete this image?"
      );
      if (confirmDelete) {
        deleteWork(work.id);
      }
    });
  
    return wrapper;
  }
  
  function deleteWork(workId) {
    fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "Sophie_Bluel_Architecte_JWT"
        )}`,
      },
    })
      .then((response) => {
        if (response.ok) {
      
          console.log("Work deleted successfully!");
          recupererTousLesTravaux();
          getAllworksForDelete();
        }
       
      })
      .catch((error) => console.error("Error deleting work:", error));
  }
  

  
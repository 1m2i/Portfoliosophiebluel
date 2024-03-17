

function recupererTousLesTravaux() {
    fetch('http://localhost:5678/api/works')
      .then(reponse => {
        if (!reponse.ok) {
          throw new Error(`Erreur HTTP! statut: ${reponse.status}`);
        }
        return reponse.json();
      })
      .then(donnees => {
        console.log(donnees); // Affiche les données récupérées dans la console
        // Ici, vous pouvez également manipuler les données reçues selon vos besoins
      })
      .catch(erreur => {
        console.error("Impossible de récupérer les travaux: ", erreur);
      });
  }
  
  recupererTousLesTravaux();

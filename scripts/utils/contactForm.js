document.addEventListener("DOMContentLoaded", function() {
    // Fonction pour afficher le modal
    function displayModal() {
        const modal = document.getElementById("contact_modal");
        modal.style.display = "block";
    }

    // Fonction pour fermer le modal
    function closeModal() {
        const modal = document.getElementById("contact_modal");
        modal.style.display = "none";
    }

    // Ajout du gestionnaire d'événements au bouton "Contactez-moi"
    const contactButton = document.querySelector(".contact_button");
    contactButton.addEventListener("click", displayModal);

    // Ajout du gestionnaire d'événements à l'image de fermeture du modal
    const closeButton = document.getElementById("close_modal");
    closeButton.addEventListener("click", closeModal);

    // Ajout du gestionnaire d'événements au bouton "Envoyer"
    const sendButton = document.querySelector("#contact_modal button[type='submit']");
    sendButton.addEventListener("click", function(event) {
        event.preventDefault();

        // Récupérer les valeurs des champs de formulaire
        const firstName = document.getElementById("First name").value;
        const lastName = document.getElementById("Last name").value;
        const email = document.getElementById("Email").value;
        const message = document.getElementById("Your message").value;

        // Afficher les valeurs dans la console
        console.log("Prénom:", firstName);
        console.log("Nom:", lastName);
        console.log("Email:", email);
        console.log("Message:", message);

        // Vider les champs de formulaire
        document.getElementById("First name").value = "";
        document.getElementById("Last name").value = "";
        document.getElementById("Email").value = "";
        document.getElementById("Your message").value = "";

        // Fermer le modal
        closeModal();
    });
});

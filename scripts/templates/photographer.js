function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name); // Ajoutez l'attribut alt avec le nom du photographe
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const pLocation = document.createElement('p');
        pLocation.textContent = `${city}, ${country}`; // Placer le pays à côté de la ville
        const pTagline = document.createElement('p');
        pTagline.textContent = `${tagline}`;
        const pPrice = document.createElement('p');
        pPrice.textContent = `${price} /Jour`;

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pLocation);
        article.appendChild(pTagline);
        article.appendChild(pPrice);

        return article;
    }

    // Retourne les données nécessaires
    return { name, picture, getUserCardDOM };
}

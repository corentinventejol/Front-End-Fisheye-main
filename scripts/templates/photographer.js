function photographerTemplate(data) {
    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.classList.add('photographer-card');

        const a = document.createElement('a');
        a.setAttribute("href", "./photographer.html?id=" + id);

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        a.appendChild(img);

        const h2 = document.createElement('h2');
        h2.textContent = name;
        a.appendChild(h2);
        h2.style.setProperty('color', 'var(--color-tertiary)');

        const pLocation = document.createElement('p');
        pLocation.textContent = `${city}, ${country}`;
        pLocation.style.setProperty('color', 'var(--color-primary)');

        const pTagline = document.createElement('p');
        pTagline.textContent = `${tagline}`;

        const pPrice = document.createElement('p');
        pPrice.textContent = `${price}€/Jour`;
        pPrice.style.setProperty('color', 'var(--color-dark-medium)');

        article.appendChild(a);
        article.appendChild(pLocation);
        article.appendChild(pTagline);
        article.appendChild(pPrice);

        return article;
    }

    return { name, picture, getUserCardDOM };
}

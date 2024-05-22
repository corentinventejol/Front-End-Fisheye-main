import createModalWithCarousel from '../utils/lightBox.js';

function mediaCardTemplate(data) {
    const { photographerId, title, image, video, likes } = data;

    function getMediaCardDOM() {
        const figure = document.createElement('figure');
        figure.classList.add('media-card');

        const a = document.createElement('a');
        if (video) {
            const videoElement = document.createElement('video');
            videoElement.setAttribute('src', `../../assets/images/${photographerId}/${video}`);
            videoElement.setAttribute('alt', title);
            a.appendChild(videoElement);

            // Supprimer l'événement de clic pour la balise <a> si elle est présente
            a.removeAttribute('onclick');

            // Ajouter l'événement de clic à la balise <video>
            videoElement.addEventListener('click', () => {
                createModalWithCarousel(photographerId, video, 'video', title);
            });
        } else {
            const img = document.createElement('img');
            img.setAttribute('src', `../../assets/images/${photographerId}/${image}`);
            img.setAttribute('alt', title);
            a.appendChild(img);

            // Supprimer l'événement de clic pour la balise <a> si elle est présente
            a.removeAttribute('onclick');

            // Ajouter l'événement de clic à la balise <img>
            img.addEventListener('click', () => {
                createModalWithCarousel(photographerId, image, 'image', title);
            });
        }

        figure.appendChild(a);

        const figcaption = document.createElement('figcaption');

        const titleElement = document.createElement('p');
        titleElement.textContent = title;
        figcaption.appendChild(titleElement);

        const likesContainer = document.createElement('div');
        likesContainer.classList.add('likes');

        const likeCount = document.createElement('span');
        likeCount.textContent = likes;
        likesContainer.appendChild(likeCount);

        const likeIcon = document.createElement('i');
        likeIcon.classList.add('fas', 'fa-heart');
        likeIcon.setAttribute('aria-hidden', 'true');
        likesContainer.appendChild(likeIcon);

        figcaption.appendChild(likesContainer);

        // Ajouter l'événement de clic pour ajouter/retirer un likes
        likesContainer.addEventListener('click', () => {
            const currentLikes = parseInt(likeCount.textContent, 10);
            if (likesContainer.classList.contains('liked')) {
                likeCount.textContent = currentLikes - 1;
                likesContainer.classList.remove('liked');
            } else {
                likeCount.textContent = currentLikes + 1;
                likesContainer.classList.add('liked');
            }
        });

        figure.appendChild(figcaption);

        return figure;
    }

    return { getMediaCardDOM };
}

export default mediaCardTemplate;

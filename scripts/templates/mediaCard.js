import createModalWithCarousel from '../utils/lightBox.js';

const likeStates = {};

function mediaCardTemplate(data) {
    const { photographerId, title, image, video, likes, id } = data;
    function getMediaCardDOM() {
        const figure = document.createElement('figure');
        figure.classList.add('media-card');

        const span = document.createElement('span');
        if (video) {
            const videoElement = document.createElement('video');
            videoElement.setAttribute('src', `../../assets/images/${photographerId}/${video}`);
            videoElement.setAttribute('alt', title);
            videoElement.setAttribute('tabindex', '0');
            span.appendChild(videoElement);

            // Ajouter l'événement de clic à la balise <video>
            videoElement.addEventListener('click', () => {
                createModalWithCarousel(photographerId, video, 'video', title);
            });

            // Ajouter l'événement de clavier à la balise <video>
            videoElement.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    createModalWithCarousel(photographerId, video, 'video', title);
                }
            });
        } else {
            const img = document.createElement('img');
            img.setAttribute('src', `../../assets/images/${photographerId}/${image}`);
            img.setAttribute('alt', title);
            img.setAttribute('tabindex', '0');
            span.appendChild(img);

            // Ajouter l'événement de clic à la balise <img>
            img.addEventListener('click', () => {
                createModalWithCarousel(photographerId, image, 'image', title);
            });

            // Ajouter l'événement de clavier à la balise <img>
            img.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    createModalWithCarousel(photographerId, image, 'image', title);
                }
            });
        }

        figure.appendChild(span);

        const figcaption = document.createElement('figcaption');

        const titleElement = document.createElement('p');
        titleElement.textContent = title;
        figcaption.appendChild(titleElement);

        const likesContainer = document.createElement('div');
        likesContainer.classList.add('likes');
        likesContainer.setAttribute('tabindex', '0');

        const likeCount = document.createElement('div');
        const initialLikes = likeStates[id] !== undefined ? likeStates[id] : likes;
        likeCount.textContent = initialLikes;
        likesContainer.appendChild(likeCount);

        const likeIcon = document.createElement('i');
        likeIcon.classList.add('fas', 'fa-heart');
        likeIcon.setAttribute('aria-hidden', 'true');
        likesContainer.appendChild(likeIcon);

        figcaption.appendChild(likesContainer);

        // Fonction pour gérer les "likes"
        const toggleLike = () => {
            const currentLikes = parseInt(likeCount.textContent, 10);
            if (likesContainer.classList.contains('liked')) {
                likeCount.textContent = currentLikes - 1;
                likesContainer.classList.remove('liked');
                likeStates[id] = currentLikes - 1;  // Mettez à jour l'état global
            } else {
                likeCount.textContent = currentLikes + 1;
                likesContainer.classList.add('liked');
                likeStates[id] = currentLikes + 1;  // Mettez à jour l'état global
            }
        };

        // Ajouter l'événement de clic pour ajouter/retirer un like
        likesContainer.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleLike();
        });

        // Ajouter l'événement de clavier pour ajouter/retirer un like
        likesContainer.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.stopPropagation();
                toggleLike();
            }
        });

        if (likeStates[id] !== undefined && likeStates[id] > likes) {
            likesContainer.classList.add('liked');
        }

        figure.appendChild(figcaption);

        return figure;
    }

    return { getMediaCardDOM };
}

export default mediaCardTemplate;

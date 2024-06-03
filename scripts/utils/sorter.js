export function sortMedia(medias, criteria) {
    if (criteria === 'popularité') {
        return medias.sort((a, b) => b.likes - a.likes);
    } else if (criteria === 'date') {
        return medias.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (criteria === 'titre') {
        return medias.sort((a, b) => a.title.localeCompare(b.title));
    }
    return medias;
}

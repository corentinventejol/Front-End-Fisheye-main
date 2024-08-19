// La fonction sortMedia() trie un tableau de medias selon un critère spécifié. 
// - a et b sont des parametres qui indique l'ordre de trie decroissant de b -> a et croissant de a -> b

export function sortMedia(medias, criteria) {
    if (criteria === 'popularité') {
        return medias.sort((a, b) => b.likes - a.likes);
    } else if (criteria === 'date') {
        return medias.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (criteria === 'titre') {
        return medias.sort((a, b) => a.title.localeCompare(b.title)); // méthode qui compare deux chaînes de caractères en utilisant les règles de comparaison de l'ordre alphabétique
    }
    return medias;
}

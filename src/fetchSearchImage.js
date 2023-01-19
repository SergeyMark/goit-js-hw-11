// Запит на бекенд fetch
export function fetchSearchImage(page, searchQuery) {
    const API_URL = 'https://pixabay.com/api/';
    const KEY = '?key=32918808-7bed14219e5e11c2127636ebd';

    return fetch(`${API_URL}${KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`).then(response => {
        console.log(response);
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    });
}



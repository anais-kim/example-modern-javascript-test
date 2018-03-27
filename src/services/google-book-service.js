export function fetchBooksByKeyword(keyword) {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}`).then((response) => {
        if (response.ok) return response.json();
        else console.log(response);
    });
}
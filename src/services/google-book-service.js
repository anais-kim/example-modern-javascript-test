import {handleResponse} from "./response-handler";

const BASE_URL = 'https://www.googleapis.com';
const BASE_PATH = '/books/v1';

export function fetchBooksByKeyword(keyword) {
    return fetch(`${BASE_URL}${BASE_PATH}/volumes?q=${keyword}`).then(handleResponse);
}
export function handleResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        console.log(response);
    }
}
export const checkResponse = <T>(response: Response): Promise<T> => {
    return response.ok ? response.json() : response.json().then((error) => Promise.reject(error));
}
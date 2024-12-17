export const getPhotosData = async () => {
    return fetch('/api/photos', { method: 'GET' })
}
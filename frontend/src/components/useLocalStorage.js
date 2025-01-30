
export default function useLocalStorage(name) {

    let data = null, f = localStorage.getItem(name) || null

    try {
        data = JSON.parse(f)
    } catch (error) {
        console.error("useLocalStorage not a JSON", name, error.message);
        data = f
    }
    return data
}

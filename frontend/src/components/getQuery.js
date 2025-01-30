
export default function getQuery() {
    const query = {}
    new URLSearchParams(window.location.search).forEach((val, name) => query[name] = val)
    return query
}

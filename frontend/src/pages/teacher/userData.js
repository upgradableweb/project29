
export default function userData() {

    let data = localStorage.getItem("user") || "{}"
    data = JSON.parse(data)
  return data
}

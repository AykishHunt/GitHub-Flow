export const getSession = () => {
  return JSON.parse(localStorage.getItem("session"))
}
export const logout = () => {
  localStorage.removeItem("session")
  window.location.href = "/"
}
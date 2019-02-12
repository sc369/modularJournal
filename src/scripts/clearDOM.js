const clearDOM = () => {
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
}
export default clearDOM
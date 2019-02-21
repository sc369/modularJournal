const clearEntries = () => {
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
}
export default clearEntries
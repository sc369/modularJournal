const createObject = (text, title, emotion, objectDate) => {
  return {
    title: title,
    date: objectDate,
    mood: emotion,
    text: text
  }
}

export default createObject
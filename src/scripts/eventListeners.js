import createJournalHTML from "./createHTML"
import addToDOM from "./addToDOM"
import entryManager from "./entryManager"
import createObject from "./createObject"

const saveButton = document.querySelector("#save_button")
const showButton = document.querySelector("#show_button")
const radioButtons = document.querySelector("#radio_buttons")
const container = document.querySelector("#container")
console.log(container)

const eventListeners = {
  showButtonListener: () => {
    showButton.addEventListener("click", () => {
      entryManager.getEntries()
        .then(res => res.json())
        .then(journalEntries => {
          journalEntries.forEach(entry => {
            const html = createJournalHTML(entry)
            addToDOM(html)
          })
        })
    }
    )
  },
  saveButtonListener: () => {
    saveButton.addEventListener("click", () => {
      const textarea = document.querySelector("#textarea")
      const conceptsCovered = document.querySelector("#conceptsCovered")
      const emotionList = document.querySelector("#emotionList")
      const inputDate = document.querySelector("#journalDate")
      const text = textarea.value
      const title = conceptsCovered.value
      const mood = emotionList.value
      const objectDate = inputDate.value
      const newObject = createObject(text, title, mood, objectDate)
      entryManager.postEntry(newObject)
      const newHTML = createJournalHTML(newObject)
      addToDOM(newHTML)
    })
  },
  radioButtonListener: () => {
    radioButtons.addEventListener("click", (event) => {
      //clear DOM
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
      //find selected mood and filter
      const mood = event.target.value
      entryManager.getEntries()
        .then(res => res.json())
        .then(entries => {
          const filteredEntries = entries.filter(entry => entry.mood === mood)
          filteredEntries.forEach((entry) => {
            const newHTML = createJournalHTML(entry)
            addToDOM(newHTML)
          })
        })
    })
  }
}
export default eventListeners
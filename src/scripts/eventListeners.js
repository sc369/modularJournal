import createHTML from "./createHTML"
import addToDOM from "./addToDOM"
import entryManager from "./entryManager"
import createObject from "./createObject"
import clearDOM from "./clearDOM"

const saveButton = document.querySelector("#save_button")
const showButton = document.querySelector("#show_button")
const radioButtons = document.querySelector("#radio_buttons")
const container = document.querySelector("#container")
console.log(container)

const eventListeners = {
  clearButtonListener: () => {
    const clearButton = document.querySelector("#clear_button")
    clearButton.addEventListener("click", () => {
      clearDOM()
      clearButton.style.display = "none"
    })
  },
  showButtonListener: () => {
    showButton.addEventListener("click", () => {
      entryManager.getEntries()
        .then(res => res.json())
        .then(journalEntries => {
          clearDOM()
          journalEntries.forEach(entry => {
            const html = createHTML.createJournalHTML(entry)
            addToDOM(html)
          })
          const clearButton = document.querySelector("#clear_button")
          if (clearButton) {
            clearButton.style.display = "initial"
          } else {
            createHTML.createClearButton()
            eventListeners.clearButtonListener()
          }
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
      const newHTML = createHTML.createJournalHTML(newObject)
      addToDOM(newHTML)
    })
  },
  radioButtonListener: () => {
    radioButtons.addEventListener("click", (event) => {
      //clear DOM
      clearDOM()
      //find selected mood and filter
      const mood = event.target.value
      entryManager.getEntries()
        .then(res => res.json())
        .then(entries => {
          const filteredEntries = entries.filter(entry => entry.mood === mood)
          filteredEntries.forEach((entry) => {
            const newHTML = createHTML.createJournalHTML(entry)
            addToDOM(newHTML)
            const clearButton = document.querySelector("#clear_button")
            if (clearButton) {
              clearButton.style.display = "initial"
            } else {
              createHTML.createClearButton()
              eventListeners.clearButtonListener()
            }
          })
        })
    })
  }
}
export default eventListeners

import createHTML from "./createHTML"
import addToDOM from "./addToDOM"
import entryManager from "./entryManager"
import createObject from "./createObject"
import clearEntries from "./clearEntries"

const saveButton = document.querySelector("#save_button")
const showButton = document.querySelector("#show_button")
const radioButtons = document.querySelector("#radio_buttons")
const container = document.querySelector("#container")
const isClearButton = () => {
  const clearButton = document.querySelector("#clear_button")
  if (clearButton) {
    clearButton.style.display = "initial"
  } else {
    createHTML.createClearButton()
    eventListeners.clearButtonListener()
  }
}

const eventListeners = {
  clearButtonListener: () => {
    const clearButton = document.querySelector("#clear_button")
    clearButton.addEventListener("click", () => {
      clearEntries()
      clearButton.style.display = "none"
    })
  },

  searchButtonListener: () => {
    const searchButton = document.querySelector("#search_button")
    searchButton.addEventListener("click", (event) => {
      const searchTerm = document.querySelector("#search_input").value
      entryManager.getEntries().then((entries) => {
        const result = entries.filter(entry => entry.text.includes(searchTerm))
        console.log(result)
        clearEntries()
        if (result.length !== 0) {
          isClearButton()
        }
        result.forEach(entry => {
          const html = createHTML.createJournalHTML(entry)
          addToDOM(html)
        })
      })
      console.log(event)

    })
  },

  showButtonListener: () => {
    showButton.addEventListener("click", () => {
      entryManager.getEntries()
        .then(journalEntries => {
          clearEntries()
          journalEntries.forEach(entry => {
            const html = createHTML.createJournalHTML(entry)
            addToDOM(html)
          })
          ifisClearButton()
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
      clearEntries()
      //find selected mood and filter
      const mood = event.target.value
      entryManager.getEntries()
        .then(res => res.json())
        .then(entries => {
          const filteredEntries = entries.filter(entry => entry.mood === mood)
          filteredEntries.forEach((entry) => {
            const newHTML = createHTML.createJournalHTML(entry)
            addToDOM(newHTML)
            isClearButton()
          })
        })
    })
  }
}
export default eventListeners

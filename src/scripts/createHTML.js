const createHTML = {

  createClearButton: () => {
    const newButton = document.createElement("button")
    newButton.textContent = "Clear Entries"
    newButton.setAttribute("id", "clear_button")
    document.querySelector("#button_container").appendChild(newButton)
  },
  createJournalHTML: (entry) => {
    return `
<article class = "journalEntry">         
<section class = "title">
<h3>${entry.title}</h3>
</section>
<section class = "date">
<p>${entry.date}</p>
</section>
<section class = "text">
<p>${entry.text}</p>
</section>
<section class = "mood">
<p>mood: ${entry.mood}</p>
<button>Delete this entry</button>
</section>
`
  }
}



export default createHTML
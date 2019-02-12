const createJournalHTML = (entry) => {
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
</section>
`
}
export default createJournalHTML
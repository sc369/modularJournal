const entryManager = {
    getEntries: () => {
        return fetch("http://127.0.0.1:8088/entries")
            .then(res => res.json())
    },

    postEntry: (entryObject) => {
        return fetch("http://127.0.0.1:8088/entries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entryObject)
        })
            .then(res => res.json())
    }
}

export default entryManager
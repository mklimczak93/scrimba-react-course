import React from 'react'
import '/src/App.css'
import Entry from '/src/components/Entry.jsx'
import EntriesData from '/src/data.js'


function ListOfEntries() {
    const Entries = EntriesData.map(element => {
        return <Entry
        key = {element.id}
        {...element}
        />
    })

    return (
        <div className="list-of-entries">
            {Entries}
        </div>
    )
}

export default ListOfEntries
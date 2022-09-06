const Persons = ({ people, filter }) => {
    return (
        <>
            {people
            .filter(person => person.name.toUpperCase().includes(filter.toUpperCase())) 
            .map(person => 
                <p key={person.id}>{person.name} {person.number}</p>
            )
            }
        </>
    )
}

export default Persons;

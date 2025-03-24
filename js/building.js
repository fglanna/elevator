(function() {
    // -=-=-=-=Pavimentos-=-=-=-=-=-

    function createLand() {
        const window = document.createElement('div')
        window.classList.add('window')

        const land = document.createElement('div')
        land.classList.add('land')
        land.appendChild(window)

        return land
    }

    function createFloor() {
        const door = document.createElement('div')
        door.classList.add('door')

        const floor = document.createElement('div')
        floor.classList.add('floor')
        floor.appendChild(door)

        return floor
    }

    function createFloring() {
        
        const elementsWithFloors = document.querySelectorAll('[floors]')
        elementsWithFloors.forEach(elWithFloors => {
            const amount = +elWithFloors.getAttribute('floors')
            for(let i = 0; i < amount; i++) {
                elWithFloors.appendChild(createFloor())
            }
            
            elWithFloors.appendChild(createLand())
        })
    }

    createFloring()

    // -=-=-=-=Elevador-=-=-=-=-=-=-
})()
(function() {
    // -=-=-=-=Pavimentos-=-=-=-=-=-

    function createLand() {
        const window = document.createElement('div')
        window.classList.add('window')

        const land = document.createElement('div')
        land.classList.add('land')
        land.setAttribute('floor', 'L')
        land.appendChild(window)

        return land
    }

    function createFloor(floorNum) {
        const door = document.createElement('div')
        door.classList.add('door')

        const floor = document.createElement('div')
        floor.classList.add('floor')
        floor.setAttribute('floor', floorNum)
        floor.appendChild(door)

        return floor
    }

    function createFloring() {
        
        const elementsWithFloors = document.querySelectorAll('[floors]')
        elementsWithFloors.forEach(elWithFloors => {
            const amount = +elWithFloors.getAttribute('floors')
            for(let i = amount; i > 0; i--) {
                elWithFloors.appendChild(createFloor(i))
            }
            
            elWithFloors.appendChild(createLand())
        })
    }

    createFloring()

    // -=-=-=-=Elevador-=-=-=-=-=-=-

    function startMoviment() {
        const elevator = document.querySelector('.elevator')
        elevator.setAttribute('on-theMove', "")
    }

    function endMoviment() {
        const elevator = document.querySelector('.elevator')
        elevator.removeAttribute('on-theMove')
    }

    function onTheMove() {
        const elevator = document.querySelector('.elevator')
        return elevator.hasAttribute('on-theMove')
    }

    function getElevatorSize() {
        const land = document.querySelector('[floor="L"]')
        return land.offsetHeight
    }

    function createElevator() {
        const shaft = document.querySelector('.shaft')

        const elevator = document.createElement('div')
        elevator.classList.add('elevator')
        elevator.style.height = getElevatorSize() + "px"


        shaft.appendChild(elevator)
    }

    function getElevatorPosition() {
        const elevator = document.querySelector('.elevator')
        return +elevator.style.bottom.replace('px', '')
        
    }

    function updateDisplay(text) {
        const appear = document.querySelector('.appear')
        appear.innerHTML = text
    }

    function commandStarted(command) {
        const button = document.querySelector(`[command="${command}"]`)
        button.classList.add('emphasis')
    }

    function commandEnded(command) {
        const button = document.querySelector(`[command="${command}"]`)
        button.classList.remove('emphasis')
    }

    function moveElevatorTo(floor) {
        if(onTheMove()) return

        startMoviment()
        commandStarted(floor)
        const floorNumber = floor === 'L' ? 0 : +floor
        const elevator = document.querySelector('.elevator')

      const startingPosition = getElevatorPosition()
      const endPosition = floorNumber * getElevatorSize()
      const up = endPosition > startingPosition

       updateDisplay(up ? 'UP' : 'DOWN')

       let timer = setInterval(() => {
        const newPosition = getElevatorPosition() + (up ? 10 : -10)
        const end = up ? newPosition >= endPosition : newPosition <= endPosition
        elevator.style.bottom = end ? endPosition : newPosition + 'px'

        if (end) {
            clearInterval(timer)
            updateDisplay(floor === 'L' ? 'Land' : `${floor} Floor`)
            endMoviment()
            commandEnded(floor)

        }
       }, 30)

       
    }

    function activeElevatorControls() {
        const buttons = document.querySelectorAll('[command]')
        buttons.forEach(button => {
            const command = button.getAttribute('command')
            button.onclick = () => {
                moveElevatorTo(command)
            }
        })
    }
    createElevator()
    activeElevatorControls()   
})()
(function() {

    
    function createTracks() {       // criando faixas
        
        const bandedElements = document.querySelectorAll('[tracks]')
        bandedElements.forEach(el => {
            const qtde = +el.getAttribute('tracks')
            for(let i = 0; i < qtde; i++) {
                const tracks = document.createElement('div')
                tracks.classList.add('tracks')
                el.appendChild(tracks)
            }        
        })
    }
    createTracks()
}) ()

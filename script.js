const mainGrid = document.getElementById('grid')
const slider = document.getElementById('rangeSlider')
const customSize = [8, 12, 16, 24, 32, 48, 64, 96]
const indicator = document.getElementById('indicator')

// call the createGrid function and send the value based on customSize
slider.addEventListener('input', function () {
    createGrid(customSize[slider.value])
    indicator.textContent = customSize[slider.value]
});

//function to create the grid
function createGrid(gridSize) {
    // empty the grid 
    mainGrid.innerHTML = ''

    // create the cells
    for (let index = 1; index <= gridSize * gridSize; index++) {
        let cell = document.createElement('div')
        cell.classList.add('cell')
        // cell.textContent = index

        mainGrid.appendChild(cell)
    }

    // adjust grid size
    mainGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`

    
}




indicator.textContent = customSize[slider.value]

createGrid(8)

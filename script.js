const mainGrid = document.getElementById('grid')
const slider = document.getElementById('rangeSlider')
const customSize = [8, 12, 16, 24, 32, 48, 64, 96]
const indicator = document.getElementById('indicator')
const clearBtn = document.getElementById('clear')
const pencilBtn = document.getElementById('pencil')
const rainbowBtn = document.getElementById('rainbow')
const eraserBtn = document.getElementById('eraser')
const colorPicker = document.getElementById('colorPicker')

const debug = false

// 0 - random, 1 - fixed color, 2 - eraser
let paintMode = 0
let painting = false
let inGrid = false
let currentColor = '#000000'
let currentGridSize = null

//function to create the grid
function createGrid(gridSize) {
    // save current grid size
    currentGridSize = gridSize

    // empty the grid 
    mainGrid.innerHTML = ''

    // create the cells
    for (let index = 1; index <= gridSize * gridSize; index++) {
        let cell = document.createElement('div')
        cell.classList.add('cell')
        if (debug) {cell.textContent = index}
        
        mainGrid.appendChild(cell)

        cell.addEventListener('mouseup', () => {
            painting = false
        })

        cell.addEventListener('mousedown', () => {
            painting = true

            if (paintMode == 0) {
                cell.style.backgroundColor = getRandomColor()
            }

            if (paintMode == 1) {
                cell.style.backgroundColor = currentColor
            }

            if (paintMode == 2) {
                cell.style.backgroundColor = 'transparent'
            }
        })

        cell.addEventListener('mouseenter', () => {
            if (painting && paintMode == 0) {
                cell.style.backgroundColor = getRandomColor()
            }

            if (painting && paintMode == 1) {
                cell.style.backgroundColor = currentColor
            }

            if (painting && paintMode == 2) {
                cell.style.backgroundColor = 'transparent'
            }
        })
    }
    
    // adjust grid size
    mainGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
}

function clearGrid() {
    createGrid(currentGridSize)
}

function getRandomColor() {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    return randomColor;
}

function selectColor() {
    paintMode = 1
    currentColor = colorPicker.value
}

clearBtn.addEventListener('click', function() {
    clearGrid()
})

// call the createGrid function and send the value based on customSize
slider.addEventListener('input', function () {
    createGrid(customSize[slider.value])
    currentGridSize = customSize[slider.value]
    indicator.textContent = customSize[slider.value] + 'x' + customSize[slider.value]
});

mainGrid.addEventListener('pointerleave', () => {
    inGrid = false
    painting = false
})

mainGrid.addEventListener('pointerenter', () => {
    inGrid = true
})

rainbowBtn.addEventListener('click', function() {
    paintMode = 0
})

eraserBtn.addEventListener('click', function() {
    paintMode = 2
})

indicator.textContent = customSize[slider.value] + 'x' + customSize[slider.value]
createGrid(8)

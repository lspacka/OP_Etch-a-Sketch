//  Did the whole structure with js because of autism.
//  lol kidding, its because Im an idiot and misunderstood the assignment
//  also copied michalosman trick for drawing while holding the mouse button. thanks!
//  https://github.com/michalosman/etch-a-sketch/blob/master/script.js

//  TODO in this order:
//  + fix vertical overflow
//  + draw grid dynamically
//  + set grid background
//  + test drawing with one color (with mousehold)
//  + set grid clear
//  - make size slider
//  - set color selector for keys
//  - set randomizer (make a random hex number generating function)
//  + set grid show
//  - set light/dark mode for the page
//  - export PNG

let grid_size = 16
let pixels
let show_state = true
let mouse_down = false
//let interval_ID
//let pixel
let color_picker = document.createElement('input')
color_picker.setAttribute('type', 'color')
color_picker.setAttribute('id', 'color-picker')
let pixel_color = '#d5e6da'

document.body.onmousedown = () => (mouse_down = true)
document.body.onmouseup = () => (mouse_down = false)


//  Create elements
let body = document.querySelector('body')
let big_container = document.createElement('div')
let game_name = document.createElement('p')
let slider_container = document.createElement('div')
let instructions = document.createElement('p')
let upper_container = document.createElement('div')
let lower_container = document.createElement('div')
let options_group1 = document.createElement('div')
let options_group2 = document.createElement('div')
//let slider = document.createElement('div')
let grid = document.createElement('div')

//  Options group 1
let color_btns = document.createElement('div')
let btns_grid = document.createElement('div')
let color_btn = document.createElement('div')
let msg = document.createElement('p')
let randomize = document.createElement('button')

//  Options group 2
let bg_color = document.createElement('div')
let def_bgcolor = document.createElement('button')
let pick_bgcolor = document.createElement('div')
let pick_bg_btn = document.createElement('button')
let show_grid_btn = document.createElement('button')
let clear_grid = document.createElement('button')

//  Set attributes
big_container.setAttribute('id', 'big-container')
game_name.setAttribute('id', 'name')
game_name.textContent = 'Eche Sketch'
slider_container.setAttribute('id', 'slider-container')
slider_container.textContent = 'Grid Size'
instructions.setAttribute('id', 'instructions')
instructions.textContent = 'Left click to draw. Right click to erase'
//slider.setAttribute('id', 'grid-slider')
grid.setAttribute('id', 'grid-container')
upper_container.setAttribute('id', 'upper-container')
lower_container.setAttribute('id', 'lower-container')
options_group1.setAttribute('id', 'options-group-1')
options_group2.setAttribute('id', 'options-group-2')

color_btns.setAttribute('id', 'color-buttons')
color_btns.innerHTML = 'But first,<br> Click on a key<br> To map a color to it!'
btns_grid.setAttribute('id', 'buttons-grid')
msg.setAttribute('id', 'message')
msg.textContent = 'You can right click to erase one pixel at a time, or press P to switch to erase mode.'
randomize.setAttribute('id', 'randomize')
randomize.setAttribute('class', 'button')
randomize.textContent = 'Randomize'

bg_color.setAttribute('id', 'bg-color')
bg_color.textContent = 'Background Color'
def_bgcolor.setAttribute('class', 'button')
def_bgcolor.textContent = 'Default'
pick_bgcolor.setAttribute('id', 'pick-bgcolor')
pick_bg_btn.setAttribute('class', 'button')
pick_bg_btn.textContent = 'Choose'
show_grid_btn.setAttribute('class', 'button')
show_grid_btn.setAttribute('id', 'show-grid')
show_grid_btn.textContent = 'Show Grid'
clear_grid.setAttribute('class', 'button')
clear_grid.setAttribute('id', 'clear-grid')
clear_grid.textContent = 'Clear'

//  Create color buttons grid
for (let i = 0; i < 12; i++) {
    const keys = ['Q', 'W', 'E', 'R',
                  'A', 'S', 'D', 'F',
                  'Z', 'X', 'C', 'V'
                 ]
    btns_grid.innerHTML += `<div class="color-button" id="">${keys[i]}</div>`
}

//  Prevents dragging and context menu from appearing on the grid
grid.addEventListener('dragstart', e => {
    e.preventDefault()
})
grid.addEventListener('contextmenu', e => {
    e.preventDefault()
})

//  Grid population
grid.style.gridTemplateColumns = `repeat(${grid_size}, 1fr)`
grid.style.gridTemplateRows = `repeat(${grid_size}, 1fr)`

for (let i = 0; i < grid_size; i++) {
    for (let j = 0; j < grid_size; j++) {
        grid.innerHTML += `<div class="pixel"></div>`       
    }
}

//  Mouse drawing
pixels = grid.childNodes
pixels.forEach(pixel => {
    /*
    pixel.addEventListener('mousedown', e => {
        if (e.button == 0) pixel.style.backgroundColor = pixel_color
        if (e.button == 2) pixel.style.backgroundColor = 'transparent'
    })
    */  
   pixel.addEventListener('mouseover', paintPixel)
   pixel.addEventListener('mousedown', paintPixel)
   pixel.addEventListener('contextmenu', paintPixel)
})
//  try console logging the right click
function paintPixel(e) {
    if (e.type == 'mouseover' && !mouse_down) return
    if (e.button == 0)  e.target.style.backgroundColor = pixel_color
     if (e.button == 2) e.target.style.backgroundColor = 'transparent'
}

//  Options group 2

def_bgcolor.addEventListener('click', () => {
    grid.style.backgroundColor = 'rgb(245, 245, 245)'
})

clear_grid.addEventListener('click', () => {
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = 'transparent'
    })
})

show_grid_btn.addEventListener('click', () => {
    show_state ? show_state=false : show_state=true
    pixels.forEach(pixel => {
      if (show_state) {
        pixel.style.border = "1px solid gray"
      } else {
        pixel.style.border = 0
      }  
    })
})


//  Append children to elements
upper_container.append(game_name, slider_container)
color_btns.appendChild(btns_grid)
pick_bgcolor.append(color_picker,pick_bg_btn)
bg_color.append(def_bgcolor, pick_bgcolor)
options_group1.appendChild(color_btns)
options_group1.appendChild(msg)
options_group1.appendChild(randomize)
options_group2.append(bg_color, show_grid_btn, clear_grid)
lower_container.appendChild(options_group1)
lower_container.appendChild(grid)
lower_container.appendChild(options_group2)
big_container.appendChild(upper_container)
big_container.appendChild(instructions)
big_container.appendChild(lower_container)

body.appendChild(big_container)
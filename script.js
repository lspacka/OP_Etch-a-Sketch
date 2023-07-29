//  TODO in this order:
//  - fix vertical overflow
//  - draw grid
//  - set grid background
//  - test drawing with one color
//  - set grid clear
//  - make size slider
//  - set color selector for keys
//  - set randomizer (make a random hex number generating function)
//  - set background selector
//  - set grid show

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
let randomize = document.createElement('button')

//  Options group 2
let bg_color = document.createElement('div')
let def_bgcolor = document.createElement('button')
let pick_bgcolor = document.createElement('button')
let show_grid = document.createElement('button')
let clear_grid = document.createElement('button')

//  Set attributes
big_container.setAttribute('id', 'big-container')
game_name.setAttribute('id', 'name')
game_name.textContent = 'Etch-a-Sketch'
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
color_btns.innerHTML = 'Click on a key<br> To map a color to it!'
btns_grid.setAttribute('id', 'buttons-grid')
randomize.setAttribute('id', 'randomize')
randomize.setAttribute('class', 'button')
randomize.textContent = 'Randomize'

bg_color.setAttribute('id', 'bg-color')
bg_color.textContent = 'Background Color'
def_bgcolor.setAttribute('class', 'button')
def_bgcolor.textContent = 'Default'
pick_bgcolor.setAttribute('class', 'button')
pick_bgcolor.textContent = 'Pick'
show_grid.setAttribute('class', 'button')
show_grid.setAttribute('id', 'show-grid')
show_grid.textContent = 'Show Grid'
clear_grid.setAttribute('class', 'button')
clear_grid.setAttribute('id', 'clear-grid')
clear_grid.textContent = 'Clear'

//  Create color buttons grid
for (let i = 0; i < 12; i++) {
    const keys = ['Q', 'W', 'E', 'R',
                  'A', 'S', 'D', 'F',
                  'Z', 'X', 'C', 'V'
                 ]
    btns_grid.innerHTML += `<div class="color-button">${keys[i]}</div>`
}

//  Append children to elements
upper_container.append(game_name, slider_container)
color_btns.appendChild(btns_grid)
//bg_color.appendChild(new_line)
bg_color.append(def_bgcolor, pick_bgcolor, show_grid, clear_grid)
options_group1.appendChild(color_btns)
options_group1.appendChild(randomize)
options_group2.appendChild(bg_color)
lower_container.appendChild(options_group1)
lower_container.appendChild(grid)
lower_container.appendChild(options_group2)
big_container.appendChild(upper_container)
big_container.appendChild(instructions)
big_container.appendChild(lower_container)

body.appendChild(big_container)
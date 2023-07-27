let body = document.querySelector('body')
let game_name = document.createElement('div')
let slider_container = document.createElement('div')
let slider = document.createElement('div')
let grid = document.createElement('div')

let color_btns = document.createElement('div')
let btns_grid = document.createElement('div')
let color_btn = document.createElement('div')
let randomize = document.createElement('button')

let bg_color = document.createElement('div')
let def_bgcolor = document.createElement('button')
let pick_bgcolor = document.createElement('button')
let show_grid = document.createElement('button')
let clear_grid = document.createElement('button')

let new_line = document.createElement('p')

//  Set attributes

game_name.setAttribute('id', 'name')
game_name.textContent = 'Etch-a-Sketch'
slider_container.setAttribute('id', 'slider-container')
slider_container.textContent = 'Grid Size'
slider.setAttribute('id', 'grid-slider')
grid.setAttribute('id', 'grid-container')

//  Left side
color_btns.setAttribute('id', 'color-buttons')
color_btns.innerHTML = 'Click a key<br> To map a color to it!'
btns_grid.setAttribute('id', 'buttons-grid')
randomize.setAttribute('id', 'randomize')
randomize.setAttribute('class', 'button')
randomize.textContent = 'Randomize'

// Right side
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

slider_container.appendChild(slider)
color_btns.appendChild(btns_grid)
bg_color.appendChild(new_line)
bg_color.append(def_bgcolor, pick_bgcolor)
body.appendChild(game_name)
body.appendChild(slider_container)
body.appendChild(color_btns)
body.appendChild(randomize)
body.appendChild(grid)
body.appendChild(color_btns)
body.appendChild(bg_color)
body.appendChild(show_grid)
body.appendChild(clear_grid)
let body = document.querySelector('body')
let grid = document.createElement('div')
let game_name = document.createElement('div')
//let footer = document.createElement('div')
let slider_container = document.createElement('div')
let grid_slider = document.createElement('div')
let show_grid = document.createElement('button')
let clear_grid = document.createElement('button')
show_grid.setAttribute('class', 'button')
show_grid.setAttribute('id', 'show-grid')
show_grid.textContent = 'Show Grid'
clear_grid.setAttribute('class', 'button')
clear_grid.setAttribute('id', 'clear-grid')
clear_grid.textContent = 'Clear'
let bg_color = document.createElement('div')
let def_bgcolor = document.createElement('button')
def_bgcolor.setAttribute('class', 'button')
def_bgcolor.textContent = 'Default'
let pick_bgcolor = document.createElement('button')
pick_bgcolor.setAttribute('class', 'button')
pick_bgcolor.textContent = 'Pick'
bg_color.setAttribute('id', 'bg-color')
bg_color.textContent = 'Background Color'
let new_line = document.createElement('p')

// left side options
//let color_pick = document.createElement('div')
let pick_color_btn = document.createElement('button')
let randomize = document.createElement('button')
randomize.setAttribute('id', 'randomize')
let color_btns = document.createElement('div')
let btns_grid = document.createElement('div')
let color_btn = document.createElement('div')
color_btns.setAttribute('id', 'color-buttons')
color_btns.innerHTML = 'Click a key<br> To map a color to it!'
btns_grid.setAttribute('id', 'buttons-grid')
//color_btn.setAttribute('class', 'color-button')
//color_pick.setAttribute('id', 'color-pick')
//color_pick.textContent = 'ONE COLOR'
pick_color_btn.setAttribute('class', 'button')
pick_color_btn.textContent = 'Pick'
randomize.setAttribute('class', 'button')
randomize.textContent = 'Randomize'
slider_container.setAttribute('id', 'slider-container')
slider_container.textContent = 'Grid Size'
grid_slider.setAttribute('id', 'grid-slider')
//footer.setAttribute('id', 'footer')
//footer.textContent = 'Here goes something'
game_name.setAttribute('id', 'name')
game_name.textContent = 'Etch-a-Sketch'
grid.setAttribute('id', 'grid-container')

slider_container.appendChild(grid_slider)
//color_pick.append(randomize)

for (let i = 0; i < 12; i++) {
    const keys = ['Q', 'W', 'E', 'R',
                  'A', 'S', 'D', 'F',
                  'Z', 'X', 'C', 'V'
                 ]
    btns_grid.innerHTML += `<div class="color-button">${keys[i]}</div>`
}
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
//body.appendChild(footer)
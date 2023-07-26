let grid = document.createElement('div')
let game_name = document.createElement('div')
let footer = document.createElement('div')
let grid_slider = document.createElement('div')
let new_line = document.createElement('p')
// left side options
let color_pick = document.createElement('div')
let pick_color_btn = document.createElement('button')
let random_color = document.createElement('button')
let color_btns = document.createElement('div')
let btns_grid = document.createElement('div')
let color_btn = document.createElement('div')
color_btns.setAttribute('id', 'color-buttons')
color_btns.innerHTML = 'OR<br><br><br><br>Click a key<br> To map a color to it!'
btns_grid.setAttribute('id', 'buttons-grid')
color_btn.setAttribute('class', 'color-button')
color_pick.setAttribute('id', 'color-pick')
color_pick.textContent = 'ONE COLOR'
pick_color_btn.textContent = 'Pick'
random_color.textContent = 'Random'
grid_slider.setAttribute('id', 'grid-slider')
footer.setAttribute('id', 'footer')
footer.textContent = 'Here goes something'
game_name.setAttribute('id', 'name')
game_name.textContent = 'Etch-a-Sketch'
grid.setAttribute('id', 'grid-container')
let body = document.querySelector('body')
body.appendChild(game_name)
body.appendChild(grid_slider)
body.appendChild(color_pick)
body.appendChild(color_btns)
color_pick.appendChild(new_line)
color_pick.appendChild(pick_color_btn)
color_pick.appendChild(random_color)
for (let i = 0; i < 8; i++) {
    btns_grid.appendChild(color_btn)
}
color_btns.appendChild(btns_grid)
body.appendChild(grid)
body.appendChild(color_btns)
body.appendChild(footer)
//  Messy clusterfuck of a code. Did the whole structure with js because of autism.
//  lol kidding, its because Im an idiot and misunderstood the assignment.
//  all the little bells and whistles were challenges I set for myself.
//  wanted to have continuous erasing with the right click, but just couldnt do it.
//  I also copied michalosman's trick for drawing while holding the mouse button. thanks!
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
//  - fix buttons "animations" in dark mode
//  - export PNG
//  - secret "exai" command

//  background:         #181a1b
//  font:               #e8e6e3
//  color buttons:      #353431
//  grid:               #545b5e
//  buttons font:       #fbfbfe
//  buttons border:     #75747a
//  buttons bg:         #2b2a33  

let grid_size = 16
let pixels
let show_grid = true
let mouse_down = false
let light_mode = true
//let interval_ID
//let pixel
let pixel_color = '#32a899'

let grid_bg = '#e8ebea'

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
let bgcolor_picker = document.createElement('input')
let show_grid_btn = document.createElement('button')
let clear_grid = document.createElement('button')
let light_switch = document.createElement('img')

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
msg.textContent = 'You can right click to erase one pixel at a time, or press Y to switch to erase mode.'
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
bgcolor_picker.setAttribute('type', 'color')
bgcolor_picker.setAttribute('id', 'bgcolor-picker')
show_grid_btn.setAttribute('class', 'button')
show_grid_btn.setAttribute('id', 'show-grid')
show_grid_btn.textContent = 'Show Grid'
clear_grid.setAttribute('class', 'button')
clear_grid.setAttribute('id', 'clear-grid')
clear_grid.textContent = 'Clear'
light_switch.setAttribute('id', 'light-switch')
light_switch.setAttribute('src', 'moon_temp.png')

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
   pixel.addEventListener('mouseover', paintPixel)
   pixel.addEventListener('mousedown', paintPixel)
   //pixel.addEventListener('contextmenu', paintPixel)
})
//  try console logging the right click
function paintPixel(e) {
    if (e.type == 'mouseover' && !mouse_down) return
    if (e.button == 0)  e.target.style.backgroundColor = pixel_color
    if (e.button == 2) e.target.style.backgroundColor = 'transparent'
}

//  OPTIONS GROUP 2
def_bgcolor.addEventListener('click', () => {
    if (light_mode) {
        grid.style.backgroundColor = '#f0f2f1'
    } else {
        grid.style.backgroundColor = '#1e2021'
    }
})
/*
//  tryna activate the input. not working
pick_bg_btn.addEventListener('click', () => {
    color_picker.focus()
})
*/
//  FIX!!!!!!!!!!!!!!!!!!!!!!!!!!
if (bgcolor_picker.focus()) {
    grid.style.backgroundColor = bgcolor_picker.value
}

//  Show grid
show_grid_btn.addEventListener('click', () => {
    show_grid ? show_grid=false : show_grid=true
    pixels.forEach(pixel => {
      if (show_grid) {
        grid.style.border = "0.5px solid #2dd4cc"
        pixel.style.border = "1px solid #2dd4cc"
      } else {
        pixel.style.border = 0
        grid.style.border = 0
      }  
    })
})

clear_grid.addEventListener('click', () => {
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = 'transparent'
    })
})

//  Light mode switch
light_switch.addEventListener('click', () => {
    light_mode ? light_mode=false : light_mode=true
    
    if (light_mode) {
        body.style.backgroundColor = '#edf5f5'
        body.style.color = '#000000'
        grid.style.backgroundColor = '#f0f2f1'
        pixels.forEach(pixel => {
            pixel.style.border = '1px solid #2dd4cc'
        })
        btns_grid.childNodes.forEach(button => {
            button.style.border = '1px solid #000000'
        })
        let buttons = document.querySelectorAll('.button')
        buttons.forEach(button => {
            button.style.backgroundColor = '#e9e9ed'
            button.style.border = '2px solid #979797'
            button.style.color = '#000000'
        })

        light_switch.setAttribute('src', 'moon_temp.png')
    } else {
        body.style.backgroundColor = '#181a1b'
        body.style.color = '#e8e6e3'
        grid.style.backgroundColor = '#1e2021'
        pixels.forEach(pixel => {
            pixel.style.border = '1px solid #2dd4cc'
        })
        btns_grid.childNodes.forEach(button => {
            button.style.border = '1px solid #f7fcfa'
        })
        let buttons = document.querySelectorAll('.button')
        buttons.forEach(button => {
            button.style.backgroundColor = '#2b2a33'
            button.style.border = '2px solid #75747a'
            button.style.color = '#d3dff4'
        })
        
        light_switch.setAttribute('src', 'sun_temp.png')
    }
})

//  Append children to elements
upper_container.append(game_name, slider_container)
color_btns.appendChild(btns_grid)
pick_bgcolor.append(bgcolor_picker,pick_bg_btn)
bg_color.append(def_bgcolor, pick_bgcolor)

options_group1.appendChild(color_btns)
options_group1.appendChild(msg)
options_group1.appendChild(randomize)
options_group2.append(bg_color, show_grid_btn, clear_grid, light_switch)

lower_container.appendChild(options_group1)
lower_container.appendChild(grid)
lower_container.appendChild(options_group2)
big_container.appendChild(upper_container)
big_container.appendChild(instructions)
big_container.appendChild(lower_container)

body.appendChild(big_container)
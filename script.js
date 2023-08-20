//  Massive clusterfuck of a code. Did the whole structure with js because of autism.
//  actually, its because Im an idiot and misunderstood the assignment.
//  all the little bells and whistles were challenges I set for myself.
//  tried to implement continuous erasing by holding the right mouse button, but just couldnt do it.
//  I also copied michalosman's tricks for changing the grid size, and for drawing while holding the lmb. thanks!
//  https://github.com/michalosman/etch-a-sketch/blob/master/script.js

//  TODO:
//  - fix buttons default behavior (animation) after changing light mode (check mouseover/onmouseover event)
//  - something like clown mode but in a set range, like from blue to purple
//  - key shortcuts in a modal
//  - clear color buttons mapping(?)
//  - little icon that indicates paint or erase mode (?)
//  - import color buttons values from array (?)
//  - choose grid color(?)
//  - export PNG(?)

let grid_size = 36   //  between 8 and 64
let show_grid = true
let grid_custom_bg
let def_state = true
let def_light_bg = '#eff1f0'
let def_dark_bg = '#24282a'
let colors = []
let color_keys = []
let pixels
let def_pixcolor = '#32a899'
let current_pixcolor = def_pixcolor
let mouse_down = false
let light_mode = true
let erase = false
let clownify = false

const keys = ['Q', 'W', 'E', 'R',
              'A', 'S', 'D', 'F',
              'Z', 'X', 'C', 'V'
]

//  Create elements
let body = document.querySelector('body')
let big_container = document.createElement('div')
let game_name = document.createElement('div')
let slider_container = document.createElement('div')
let slider = document.createElement('input')
let slider_value = document.createElement('p')
let upper_container = document.createElement('div')
let lower_container = document.createElement('div')
let options_group1 = document.createElement('div')
let options_group2 = document.createElement('div')
let grid = document.createElement('div')

//  Options group 1
let color_btns = document.createElement('div')
let btns_grid = document.createElement('div')
let color_btn = document.createElement('div')
let msg_2 = document.createElement('p')
let clown_switch = document.createElement('img')

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
game_name.textContent = 'Pixel Sketch'
slider_container.setAttribute('id', 'slider-container')
slider.setAttribute('id', 'slider')
slider.setAttribute('type', 'range')
slider.setAttribute('min', '8')
slider.setAttribute('max', '64')
slider.setAttribute('value', '36')
slider_value.setAttribute('id', 'slider-value')
slider_value.textContent = '36 x 36'
grid.setAttribute('id', 'grid-container')
upper_container.setAttribute('id', 'upper-container')
lower_container.setAttribute('id', 'lower-container')
options_group1.setAttribute('id', 'options-group-1')
options_group2.setAttribute('id', 'options-group-2')

color_btns.setAttribute('id', 'color-buttons')
color_btns.innerHTML = 'Click on a key<br> To map a color to it!'
btns_grid.setAttribute('id', 'buttons-grid')
msg_2.setAttribute('class', 'message')
msg_2.textContent = 'Press Esc to switch between Paint and Erase mode.'
clown_switch.setAttribute('id', 'clown-switch')
clown_switch.setAttribute('src', 'images/clown.png')

bg_color.setAttribute('id', 'bg-color-container')
bg_color.textContent = 'Background Color'
def_bgcolor.setAttribute('class', 'button')
def_bgcolor.textContent = 'Default'
pick_bgcolor.setAttribute('id', 'pick-bgcolor')
pick_bg_btn.setAttribute('class', 'button')
pick_bg_btn.setAttribute('id', 'pick-bgcolor-button')
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
light_switch.setAttribute('src', 'images/moon_temp.png')

//  Slider actions
slider.onmousemove = (e) => {
    slider_value.textContent = `${e.target.value} x ${e.target.value}`
}
slider.onchange = (e) => changeSize(e.target.value)

function changeSize(value) {
    grid_size = value
    grid.innerHTML = ''
    drawGrid(value)
    setPixels()
    show_grid = true
}

//  Grid actions
grid.onmousedown = () => (mouse_down = true)
grid.onmouseup = () => (mouse_down = false)

//  Prevents dragging and context menu from appearing on the grid
grid.addEventListener('dragstart', e => {
    e.preventDefault()
})
grid.addEventListener('contextmenu', e => {
    e.preventDefault()
})

function drawGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size*size; i++) {
        const pixel = document.createElement('div')
        pixel.classList.add('pixel')
        grid.appendChild(pixel)
    }
}

function setPixels() {
    pixels = grid.childNodes
    pixels.forEach(pixel => { 
        pixel.addEventListener('mouseover', paintPixel)
        pixel.addEventListener('mousedown', paintPixel)
    })
}

function paintPixel(e) {
    if (e.type == 'mouseover' && !mouse_down) return

    if (erase) e.target.style.backgroundColor = 'transparent'
    if (erase && clownify) e.target.style.backgroundColor = 'transparent'
    else if (clownify) e.target.style.backgroundColor = hexGen()
    else if (!erase) e.target.style.backgroundColor = current_pixcolor
}

//  Keyboard mappings
document.body.addEventListener('keydown', e => {
    keys.forEach((key, index) => {
        if (key == e.key || key.toLowerCase() == e.key) {
            if (colors[index] == undefined) return
            current_pixcolor = colors[index]
            clownify = false
            clown_switch.setAttribute('src', 'images/clown.png')
        }
    })
    if (e.key == 'Escape') erase = erase ? false : true
    if (e.code == 'ShiftLeft') clownSwitch()
    if (e.key == 'P' || e.key == 'p') console.log(colors) 
    console.log(e)
})

//  Create color buttons grid
for (let i = 0; i < 12; i++) {
    btns_grid.innerHTML += `<div class="color-button" id="${keys[i]}">
                              ${keys[i]}
                              <input type="color" class="color-button-input"></input>
                            </div>`
}

//  Set color with button
btns_grid.childNodes.forEach((key, index) => {
    let color = key.firstChild.nextSibling
    key.onchange = () => {
        key.style.backgroundColor = color.value
        colors[index] = color.value
    }
})

//  Random colors function
function hexGen() {
    const numbers = [
        'a', 'b', 'c', 'd', 'e', 'f',
        '0', '1', '2', '3', '4', '5',
        '6', '7', '8', '9'
    ]
    let index = 0
    let hex_num = '#'
    let i = 0

    while (i < 6) {
        index = Math.floor(Math.random() * 16)
        hex_num += numbers[index]
        i++
    }
    return hex_num
}

//  Clown mode
function clownSwitch() {
    clownify = clownify ? false : true
    if (clownify) {
        clown_switch.setAttribute('src', 'images/glider.png')
    } else {
        clown_switch.setAttribute('src', 'images/clown.png')
    }
}

clown_switch.addEventListener('click', clownSwitch)


//  OPTIONS GROUP 2

//  Default grid background
def_bgcolor.addEventListener('click', () => {
    if (light_mode) {
        grid.style.backgroundColor = def_light_bg
    } else {
        grid.style.backgroundColor = def_dark_bg
    }
    def_state = true
})

//  Grid Background color selector
bgcolor_picker.onchange = () => {
    grid_custom_bg = bgcolor_picker.value
    grid.style.backgroundColor = grid_custom_bg
    def_state = false
}

//  Show grid
show_grid_btn.addEventListener('click', () => {
    show_grid = show_grid ? false : true
    pixels.forEach(pixel => {
      if (show_grid) {
        pixel.style.border = "0.5px solid #2dd4cc"
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
    light_mode = light_mode ? false : true
    
    if (light_mode) {
        body.style.backgroundColor = '#f3fbfb'
        body.style.color = '#133435'

        if (bgcolor_picker && !def_state) {
            grid.style.backgroundColor = grid_custom_bg
        } else {
            grid.style.backgroundColor = def_light_bg
        }
        pixels.forEach(pixel => {
            if (show_grid) pixel.style.border = '1px solid #2dd4cc'
        })
        btns_grid.childNodes.forEach(button => {
            button.style.border = '2px solid #32a899'
            button.style.color = '#2f625f'
        })
        let buttons = document.querySelectorAll('.button')
        buttons.forEach(button => {
            button.style.backgroundColor = '#e9e9ed'
            button.style.border = '2px solid #979797'
            button.style.color = '#2d2f30'
        })

        light_switch.setAttribute('src', 'images/moon_temp.png')
    } else {
        body.style.backgroundColor = '#181a1b'
        body.style.color = '#e8e6e3'

        if (bgcolor_picker && !def_state) {
            grid.style.backgroundColor = grid_custom_bg
        } else {
            grid.style.backgroundColor = def_dark_bg
        }
        pixels.forEach(pixel => {
            if (show_grid) pixel.style.border = '1px solid #2dd4cc'
        })
        btns_grid.childNodes.forEach(button => {
            button.style.border = '2px solid #1d4d39'
            button.style.color = '#31a39d'
        })
        let buttons = document.querySelectorAll('.button')
        buttons.forEach(button => {
            button.style.backgroundColor = '#2b2a33'
            button.style.border = '2px solid #75747a'
            button.style.color = '#d3dff4'
        })
        
        light_switch.setAttribute('src', 'images/sun_temp.png')
    }
})

//  Append children to elements
slider_container.append(slider, slider_value)
upper_container.append(game_name, slider_container)
color_btns.appendChild(btns_grid)
pick_bgcolor.append(bgcolor_picker,pick_bg_btn)
bg_color.append(def_bgcolor, pick_bgcolor)

options_group1.append(color_btns, msg_2, clown_switch)
options_group2.append(bg_color, show_grid_btn, clear_grid, light_switch)
lower_container.append(options_group1, grid, options_group2)
big_container.append(upper_container, lower_container)

body.appendChild(big_container)

window.onload = () => {
    drawGrid(grid_size)
    setPixels()
}

//   function exai() {}
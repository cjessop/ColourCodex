// Get references to DOM elements
const colorDisplay = document.getElementById('color-display');
const redSlider = document.getElementById('red');
const greenSlider = document.getElementById('green');
const blueSlider = document.getElementById('blue');
const redValue = document.getElementById('red-value');
const greenValue = document.getElementById('green-value');
const blueValue = document.getElementById('blue-value');
const rgbCode = document.getElementById('rgb-code');
const copyBtn = document.getElementById('copy-btn');

// Update color display and RGB code when sliders change
const updateColor = () => {
    // Ensure slider values are integers between 0 and 255
    const red = parseInt(redSlider.value);
    const green = parseInt(greenSlider.value);
    const blue = parseInt(blueSlider.value);
    
    // Construct RGB string
    const rgb = `rgb(${red}, ${green}, ${blue})`;
  
    // Update color display
    colorDisplay.style.backgroundColor = rgb;
  
    // Update RGB code display
    rgbCode.value = rgb;
  
    // Update text content of value indicators
    redValue.textContent = red;
    greenValue.textContent = green;
    blueValue.textContent = blue;
  };

// Copy RGB code to clipboard
const copyToClipboard = () => {
  rgbCode.select();
  document.execCommand('copy');
  copyBtn.textContent = 'Copied!';
  setTimeout(() => copyBtn.textContent = 'Copy', 2000);
};

// Add event listeners for interactions
redSlider.addEventListener('input', updateColor);
greenSlider.addEventListener('input', updateColor);
blueSlider.addEventListener('input', updateColor);
copyBtn.addEventListener('click', copyToClipboard);

// Call updateColor initially
updateColor();

const paletteContainer = document.getElementById('palette-container');
const palette = document.getElementById('palette');
const addPaletteBtn = document.getElementById('add-palette-btn');

let paletteColors = [];

const renderPalette = () => {
    palette.innerHTML = '';
    paletteColors.forEach(color => {
      const colorDiv = document.createElement('div');
      colorDiv.classList.add('palette-color');
      colorDiv.style.backgroundColor = color;
      // colorDiv.addEventListener('click', () => {
      //   console.log("Clicked color:", color);
      //   const [r, g, b] = color.match(/\d+/g); // Extract RGB values from color string
      //   console.log("Extracted RGB:", r, g, b);

      //   redSlider.value = parseInt(r);
      //   greenSlider.value = parseInt(g);
      //   blueSlider.value = parseInt(b);
      //   console.log("Slider values:", redSlider.value, greenSlider.value, blueSlider.value);
      //   updateColor();
      // });
      colorDiv.addEventListener('click', (event) => {
        const color = event.target.style.backgroundColor; // Get the color from the clicked element
        const [r, g, b] = color.match(/\d+/g); // Extract RGB values from color string
        //updateColor(parseInt(r), parseInt(g), parseInt(b)); // Pass RGB values to updateColor
        redSlider.value = parseInt(r)
        greenSlider.value = parseInt(g)
        blueSlider.value = parseInt(b)
        updateColor();
    });
    
      palette.appendChild(colorDiv);
    });
  };

const addColorToPalette = () => {
  const currentColor = `rgb(${redSlider.value}, ${greenSlider.value}, ${blueSlider.value})`;
  paletteColors.push(currentColor);
  renderPalette();
};

addPaletteBtn.addEventListener('click', addColorToPalette);

renderPalette();

const colorPalettes = {
    default: [],
    twilight: ['#0081a7', '#00afb9', '#fdfcdc', '#fed9b7', '#f07167'],
    nature: ['#2c7744', '#86ac41', '#ffc857', '#ff8f1c', '#c63d0f'],
    sunset: ['#e55d87', '#5fc3e4', '#f9f3f3', '#ff9e64', '#ffc75f'],
    ocean: ['#006d77', '#83c5be', '#edf6f9', '#ffddd2', '#e29578'],
    vintage: ['#556b2f', '#8ab66b', '#ffecd6', '#f5b7b1', '#d68081'],
    jewel: ['#2f4f4f', '#4d8076', '#eaeaea', '#d16f93', '#94436e']
    // Add more palettes as needed
  };
  
  // Get reference to palette select element
  const paletteSelect = document.getElementById('palette-select');
  
  // Function to populate palette select options
  const populatePaletteOptions = () => {
    const options = Object.keys(colorPalettes);
    options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option.charAt(0).toUpperCase() + option.slice(1);
      paletteSelect.appendChild(optionElement);
    });
  };
  
  // Function to set palette from selected option
  const setPaletteFromOption = () => {
    const selectedOption = paletteSelect.value;
    paletteColors = colorPalettes[selectedOption];
    renderPalette();
  };
  
  // Add event listener for palette select change
  paletteSelect.addEventListener('change', setPaletteFromOption);
  
  // Populate palette options and set initial palette
  populatePaletteOptions();
  setPaletteFromOption();

  function hexToRgb(hex) {
    // Remove the hash sign if present
    hex = hex.replace(/^#/, '');
    
    // Parse the hexadecimal string into three separate components for R, G, and B
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    
    // Return the RGB values as an array
    return [r, g, b];
}

colorDiv.addEventListener('click', (event) => {
  const color = event.target.style.backgroundColor; // Get the color from the clicked element
  const [r, g, b] = color.match(/\d+/g); // Extract RGB values from color string
  updateColor(parseInt(r), parseInt(g), parseInt(b)); // Pass RGB values to updateColor
});
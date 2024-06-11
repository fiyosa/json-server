const { createCanvas, registerFont } = require('canvas')
const path = require('path')

// Register the Arial font
registerFont(path.join(__dirname, 'Arial.ttf'), { family: 'Arial' })

const generateImage = async (req, res) => {
  const { dimension, hexColor } = req.params

  // Validate dimension
  if (!/^\d+$/.test(dimension)) {
    return res.status(400).json({ message: 'Invalid dimension. It should be a positive integer.' })
  }

  const size = parseInt(dimension, 10)
  const text = `${size} x ${size}`

  // Validate hex color
  const hexColorRegex = /^#?[0-9A-F]{6}$/i
  if (!hexColorRegex.test(hexColor)) {
    return res.status(400).json({ message: 'Invalid hex color format. Use RRGGBB.' })
  }

  const normalizedHexColor = hexColor.startsWith('#') ? hexColor : `#${hexColor}`

  try {
    const canvas = createCanvas(size, size)
    const context = canvas.getContext('2d')

    // Set background color
    context.fillStyle = normalizedHexColor
    context.fillRect(0, 0, size, size)

    // Set text properties
    const fontSize = size * 0.1
    context.font = `bold ${fontSize}px Arial`
    context.fillStyle = 'white'
    context.textAlign = 'center'
    context.textBaseline = 'middle'

    // Add text to the canvas multiple times for thickness
    const x = size / 2
    const y = size / 2
    const thickness = 1 // Adjust for desired thickness

    for (let dx = -thickness; dx <= thickness; dx++) {
      for (let dy = -thickness; dy <= thickness; dy++) {
        context.fillText(text, x + dx, y + dy)
      }
    }

    // Get buffer from canvas
    const buffer = canvas.toBuffer('image/png')

    res.type('png')
    res.send(buffer)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error generating image' })
  }
}

module.exports = generateImage

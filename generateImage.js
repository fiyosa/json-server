const { createCanvas } = require('canvas')

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
    context.font = `bold ${size * 0.1}px Arial`
    context.fillStyle = 'white'
    context.textAlign = 'center'
    context.textBaseline = 'middle'

    // Add text to the canvas
    context.fillText(text, size / 2, size / 2)

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

const sharp = require('sharp')
const Jimp = require('jimp')

const generateImage = async (req, res) => {
  const { dimension, hexColor } = req.params

  // Validate dimension
  if (!/^\d+$/.test(dimension)) {
    return res.status(400).send('Invalid dimension. It should be a positive integer.')
  }

  const size = parseInt(dimension, 10)
  const text = `${size} x ${size}`

  // Validate hex color
  const hexColorRegex = /^#?[0-9A-F]{6}$/i
  if (!hexColorRegex.test(hexColor)) {
    return res.status(400).send('Invalid hex color format. Use RRGGBB.')
  }

  // Ensure hex color starts with #
  const normalizedHexColor = hexColor.startsWith('#') ? hexColor : `#${hexColor}`

  try {
    // Create base image
    const image = await sharp({
      create: {
        width: size,
        height: size,
        channels: 4, // RGBA
        background: normalizedHexColor,
      },
    })
      .png()
      .toBuffer()

    // Load the image into Jimp for text overlay
    const jimpImage = await Jimp.read(image)

    // Load a bold font with a smaller size
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE) // Using a smaller font size

    // Add text to the image
    jimpImage.print(
      font,
      0,
      0,
      {
        text: text,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
      },
      size,
      size
    )

    // Get the final buffer
    const finalImage = await jimpImage.getBufferAsync(Jimp.MIME_PNG)

    res.type('png')
    res.send(finalImage)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error generating image')
  }
}

module.exports = generateImage

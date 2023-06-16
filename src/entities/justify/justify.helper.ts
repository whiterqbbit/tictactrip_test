import config from '../../../config'

const targetLineLength = config.LINE_LENGTH // 80
export default class JustifyHelper {

  // takes a text and returns the first line cut out and the remaining text
  private static separateLineFromText(text: string) {
    const lastWordIndex = text.lastIndexOf(' ', config.LINE_LENGTH)
    const line = text.slice(0, lastWordIndex)
    const remainingText = text.slice(lastWordIndex + 1)

    return { line, remainingText }
  }

  private static justifyLine(line: string) {
    const words = line.split(' ')
    const wordCount = words.length

    const spacesToAdd = targetLineLength - line.length
    const spacesPerWord = Math.floor(spacesToAdd / (wordCount - 1))
    const extraSpaces = spacesToAdd % (wordCount - 1)
    const extraSpacesPerWord = extraSpaces / (wordCount - 1)

    let justifiedLine = ''
    let extraSpaceAccumulator = extraSpacesPerWord

    for (let i = 0 ; i < wordCount; i++) {
      justifiedLine += words[i]

      if (i < wordCount - 1) {
        // add spaces between words except for the last one
        justifiedLine += ' '
        justifiedLine += ' '.repeat(spacesPerWord)

        // add extra spaces evenly
        extraSpaceAccumulator += extraSpacesPerWord
        if (extraSpaceAccumulator > 1) {
          justifiedLine += ' '
          extraSpaceAccumulator -= 1
        }
      }
    }

    return justifiedLine
  }

  static justify(textInput: string) {
    let justifiedText = ''

    // trim first and last spaces, remove consecutive spaces
    const sanitizedText = textInput.trim().replace(/\s\s+/g, ' ') 

    if (sanitizedText.length <= targetLineLength) {
      return sanitizedText
    }
    
    // divide input into an array of lines
    let remainingText = sanitizedText
    const lines = []
    while (remainingText.length > targetLineLength) {
      const { line, remainingText: newText } = this.separateLineFromText(remainingText)
      lines.push(line)
      remainingText = newText
      if (remainingText.length < targetLineLength) {
        lines.push(remainingText)
      }
    }

    // justify each line except the last one
    for (let i = 0; i < lines.length; i++) {
      if (i !== lines.length - 1) {
        justifiedText += this.justifyLine(lines[i]) + '\n'
      } else {
        justifiedText += lines[i]
      }
    }

    return justifiedText
  }
}
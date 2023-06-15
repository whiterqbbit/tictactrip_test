export default class JustifyHelper {
  static justify(textInput: string, targetLineLength = 80) {
    let justifiedText = ''

    function divideTextToLines(text: string) {
      const lastWordIndex = text.lastIndexOf(' ', targetLineLength)
      const lineText = text.slice(0, lastWordIndex)
      const remainingText = text.slice(lastWordIndex + 1)

      return { lineText, remainingText }
    }

    function justifyLine(line: string) {
      const words = line.split(' ')
      const wordCount = words.length
      const spacesToAdd = targetLineLength - line.length
      const spacesPerWord = Math.floor(spacesToAdd / (wordCount - 1))
      const extraSpaces = spacesToAdd % (wordCount - 1)

      let justifiedLine = ''

      // TODO : use a less obvious pattern
      for (let i = 0; i < wordCount; i++) {
        justifiedLine += words[i] + ' '
        if (i < wordCount - 1) {
          justifiedLine += ' '.repeat(spacesPerWord)
          if (i < extraSpaces) {
            justifiedLine += ' '
          }
        }
      }

      return justifiedLine
    }

    const lines = []
    let remainingText = textInput

    while (remainingText.length > targetLineLength) {
      const { lineText, remainingText: newText } = divideTextToLines(remainingText)
      lines.push(lineText)
      remainingText = newText
      if (remainingText.length < targetLineLength) {
        lines.push(remainingText)
      }
      // console.log('lines', lines)
    }

    for (const line of lines) {
      justifiedText += justifyLine(line).trim() + '\n'
    }

    if (remainingText.length > 0) {
      justifiedText += remainingText
    }

    return justifiedText
  }
}
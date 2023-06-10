import { QuickPickItem } from 'vscode'

export default function toVariables(text: string): QuickPickItem[] {
  text = text.trim().toLowerCase()
  const textList = text.split(' ')

  const camelCase = toCamelCase(textList)
  const constant = toContant(textList)
  const python = toPythonVariable(textList)

  const res = [
    {
      label: camelCase,
      description: '`camelCase` type variable',
    },
    {
      label: constant,
      description: '`constant` type variable',
    },
  ]

  if (textList.length > 1)
    res.push({
      label: python,
      description: '`python` type variable',
    })

  return res
}

function toCamelCase(textList: string[]): string {
  let result = ''
  textList.forEach((text, index) => {
    if (index === 0) result += text
    else {
      const t = text.charAt(0).toUpperCase() + text.slice(1)
      result += t
    }
  })

  return result
}

function toContant(textList: string[]): string {
  if (textList.length === 1) return textList[0].toUpperCase()

  const l = textList.map((text) => text.toUpperCase())
  const result = l.join('_')
  return result
}

function toPythonVariable(textList: string[]): string {
  const result = textList.join('_')

  return result
}

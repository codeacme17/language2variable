import * as vscode from 'vscode'
import translator from './utils/translator'
import toVariables from './utils/to-variables'

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'chinese2variable.userInput',
    userInput
  )

  context.subscriptions.push(disposable)
}

async function userInput(): Promise<void> {
  const input = await vscode.window.showInputBox({
    prompt: 'enter your variable name',
  })

  const quickPick = vscode.window.createQuickPick()

  if (!input?.trim()) {
    return
  }

  const translatedWord = await translator(input.trim())
  console.log(translatedWord)
  vscode.window.showInformationMessage(translatedWord)
  const variables = toVariables(translatedWord)

  quickPick.items = variables.map((variable) => ({
    label: variable,
  }))

  quickPick.show()

  quickPick.onDidChangeSelection((selection) => {
    if (!selection || !selection[0]) {
      return
    }
    const selectedTranslation = selection[0].label
    const editor = vscode.window.activeTextEditor
    if (editor) {
      editor.edit((editBuilder) => {
        editBuilder.insert(editor.selection.active, selectedTranslation)
      })

      quickPick.hide()
    }
  })
}

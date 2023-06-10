import * as vscode from 'vscode'
import translator from './utils/translator'
import toVariables from './utils/to-variables'

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'language2variable.userInput',
    userInput
  )

  context.subscriptions.push(disposable)
}

async function userInput(): Promise<void> {
  const input = vscode.window.createInputBox()
  const quickPick = vscode.window.createQuickPick()

  input.placeholder = 'plz enter the variable name you want to create'
  input.show()

  input.onDidAccept(async () => {
    if (!input.value.trim()) return

    input.busy = true
    const translatedWord = await translator(input.value.trim())
    input.hide()

    const variables = toVariables(translatedWord)
    quickPick.items = variables
    quickPick.placeholder = 'you can select one'
    quickPick.show()

    quickPick.onDidChangeSelection((selection) => {
      if (!selection || !selection[0]) return

      const selectedTranslation = selection[0].label
      const editor = vscode.window.activeTextEditor
      if (editor) {
        editor.edit((editBuilder) => {
          editBuilder.insert(editor.selection.active, selectedTranslation)
        })

        quickPick.hide()
      }
    })
  })
}

import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'chinese2variable.userInput',
    userInput
  )

  context.subscriptions.push(disposable)
}

async function userInput() {
  const input = await vscode.window.showInputBox({
    prompt: '输入您的中文变量名',
  })

  if (input) {
    const translations = await myTranslator(input)

    const quickPick = vscode.window.createQuickPick()

    quickPick.items = translations.map((translation) => ({
      label: translation,
    }))

    quickPick.show()

    quickPick.onDidChangeSelection((selection) => {
      if (selection && selection[0]) {
        const selectedTranslation = selection[0].label
        const editor = vscode.window.activeTextEditor
        if (editor) {
          editor.edit((editBuilder) => {
            editBuilder.insert(editor.selection.active, selectedTranslation)
          })

          quickPick.hide()
        }
      }
    })
  }
}

function myTranslator(text: string): Promise<string[]> {
  const translations = [
    'Translation 1',
    'Translation 2',
    'Translation 3',
    'Translation 4',
  ]
  return Promise.resolve(translations)
}

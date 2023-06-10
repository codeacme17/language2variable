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
    prompt: 'Enter text to insert',
  })

  if (input) {
    const editor = vscode.window.activeTextEditor
    if (editor) {
      editor.edit((editBuilder) => {
        editBuilder.insert(editor.selection.active, input)
      })
    }
  }
}

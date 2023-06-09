import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "chinese2variable" is now active!'
  )

  let disposable = vscode.commands.registerCommand(
    'chinese2variable.helloWorld',
    () => {
      vscode.window.showInformationMessage('Hello World from chinese2variable!')
    }
  )

  context.subscriptions.push(disposable)
}

export function deactivate() {}

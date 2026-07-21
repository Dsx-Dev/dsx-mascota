import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('dsx-mascota.start', () => {
        const panel = vscode.window.createWebviewPanel(
            'dsxMascota',
            'Compañero DSX 🐬',
            vscode.ViewColumn.Two,
            {
                enableScripts: true,
                retainContextWhenHidden: true,
                localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))]
            }
        );

        const mediaPath = path.join(context.extensionPath, 'media');
        const dolphinGifUri = panel.webview.asWebviewUri(
            vscode.Uri.file(path.join(mediaPath, 'dsx_idle.gif'))
        );

        panel.webview.html = getWebviewContent(dolphinGifUri);
    });

    context.subscriptions.push(disposable);
}

function getWebviewContent(dolphinUri: vscode.Uri) {
    return `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <style>
            body {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: #1e1e24;
                overflow: hidden;
                font-family: sans-serif;
                color: white;
            }
            .dolphin-container {
                max-width: 250px;
                height: auto;
            }
            img {
                width: 100%;
                height: auto;
            }
        </style>
    </head>
    <body>
        <div class="dolphin-container">
            <img src="${dolphinUri}" alt="DSX El Delfín">
        </div>
        <h3>DSX listo para acompañarte...</h3>
    </body>
    </html>`;
}

export function deactivate() {}

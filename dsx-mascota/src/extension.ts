import * as vscode from 'vscode';

// Esta función se ejecuta una sola vez cuando VS Code activa tu extensión
export function activate(context: vscode.ExtensionContext) {
    
    // Registramos la acción para el comando que configuramos en el package.json 
    let disposable = vscode.commands.registerCommand('dsx-mascota.start', () => {
        
        // Creamos y abrimos un nuevo panel (Webview) al lado de tu código [cite: 17]
        const panel = vscode.window.createWebviewPanel(
            'dsxMascota',            // Identificador interno del panel [cite: 17]
            'Compañero DSX 🐬',      // Título que verá el usuario en la pestaña [cite: 17]
            vscode.ViewColumn.Two,   // Indica que se abra en la columna derecha [cite: 17]
            {
                enableScripts: true,          // Permite ejecutar Javascript dentro del Webview (crucial para animaciones) [cite: 17]
                retainContextWhenHidden: true // Mantiene viva a la mascota si cambias de pestaña o archivo [cite: 17]
            }
        );

        // Cargamos el diseño web donde flotará el delfín [cite: 17]
        panel.webview.html = getWebviewContent();
    });

    context.subscriptions.push(disposable);
}

// Esta función devuelve el HTML/CSS básico que se renderizará en la pestaña
function getWebviewContent() {
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
                background-color: #1e1e24; /* Un fondo oscuro que combina con VS Code */
                color: #ffffff;
                font-family: sans-serif;
                overflow: hidden;
            }
            .dolphin {
                font-size: 80px;
                animation: swim 2.5s ease-in-out infinite;
            }
            h1 {
                font-size: 1.5rem;
                margin-top: 15px;
                letter-spacing: 1px;
            }
            @keyframes swim {
                0% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-15px) rotate(5deg); }
                100% { transform: translateY(0px) rotate(0deg); }
            }
        </style>
    </head>
    <body>
        <div class="dolphin">🐬</div>
        <h1>¡Hola, soy DSX!</h1>
        <p>Próximamente: cargando tus ilustraciones animadas...</p>
    </body>
    </html>`;
}

// Función que se ejecuta si la extensión se desactiva de memoria
export function deactivate() {}
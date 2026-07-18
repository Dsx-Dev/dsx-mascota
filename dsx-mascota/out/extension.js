"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
// Esta función se ejecuta una sola vez cuando VS Code activa tu extensión
function activate(context) {
    // Registramos la acción para el comando que configuramos en el package.json 
    let disposable = vscode.commands.registerCommand('dsx-mascota.start', () => {
        // Creamos y abrimos un nuevo panel (Webview) al lado de tu código [cite: 17]
        const panel = vscode.window.createWebviewPanel('dsxMascota', // Identificador interno del panel [cite: 17]
        'Compañero DSX 🐬', // Título que verá el usuario en la pestaña [cite: 17]
        vscode.ViewColumn.Two, // Indica que se abra en la columna derecha [cite: 17]
        {
            enableScripts: true, // Permite ejecutar Javascript dentro del Webview (crucial para animaciones) [cite: 17]
            retainContextWhenHidden: true // Mantiene viva a la mascota si cambias de pestaña o archivo [cite: 17]
        });
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
function deactivate() { }
//# sourceMappingURL=extension.js.map
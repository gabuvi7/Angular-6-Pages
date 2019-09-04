const electron = require('electron')
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')


let win

function createWindow(){
    win = new BrowserWindow({width: 1024, heigth: 768})  
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/platzinger/index.html'), //path la provee node que indica atributos de la ruta.
        protocol: 'file:',
        slashes: true
    }))  
    win.on('closed', () => {
        win = null  
    })   // lo usamos para liberar la memoria al cerrar la app.
}

app.on('ready', createWindow)


app.on('window-all-closed', () => {
    if(process.platform !== "win32"){ //process.platform trae la plataforma del S.O
        app.quit()  
    }

})   //funcion para guardar recursos, vemos el caso especifico de mac


app.on('activated', () => {
    if (win === null){
        createWindow()  
    }
})  



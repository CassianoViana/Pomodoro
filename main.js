const { app, BrowserWindow, ipcMain } = require('electron')

let mainWindow
let tasksWindow
let recreationWindow

ipcMain.on('open-tasks', ()=>{
	if(tasksWindow.isDestroyed())
		createTasksWindow();
	tasksWindow.show();	
	if(recreationWindow != null && !recreationWindow.isDestroyed()){
		recreationWindow.close();
		recreationWindow = null
	}
})

ipcMain.on('open-recreation', ()=>{
	openRecreationWindow();
})

function openRecreationWindow(){
	recreationWindow = new BrowserWindow({
		width: 1600,
		height: 1000,
	});
	recreationWindow.setMenu(null);
	let sites = [
		'https://www.nytimes.com',
		'https://www.uol.com.br',
		'https://www.estadao.com.br',
		'http://jornalmetas.com.br/',
		'http://www.bbc.com/',
		'http://jornaldesantacatarina.clicrbs.com.br/sc',
	]
	let sorteado = parseInt(Math.random()*sites.length);
	recreationWindow.loadURL(sites[sorteado]);
	recreationWindow.once('ready-to-show', ()=>{
		recreationWindow.show();
	})
}

function createWindow(){
	mainWindow = new BrowserWindow({
		width: 300,
		height: 80,
		frame:false,
		//resizable:false
	});
	mainWindow.loadFile('index.html');
	mainWindow.setAlwaysOnTop(true);
	mainWindow.setPosition(1700, 900);
	mainWindow.on('closed', function(){
		mainWindow = null;
	})
}

function createTasksWindow(){
	tasksWindow = new BrowserWindow({
		frame: false,
		show: false,
	});
	tasksWindow.setMenu(null);
	tasksWindow.loadURL('https://mail.google.com/tasks/canvas');
	tasksWindow.once('ready-to-show', ()=>{
		tasksWindow.show();
	})
}

app.on('ready', function(){
	createWindow();
	createTasksWindow();
});

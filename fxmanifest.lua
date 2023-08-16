fx_version 'cerulean'
games { 'gta5' }

author 'Finest RP'
description 'Notification system for FM'
version '0.0.1'

shared_script 'config.lua'
ui_page 'html/index.html'

client_scripts {
	'client/main.lua'
}

files {
	'html/index.html',
	'html/styles.css',
	'html/script.js',
}

-- no need for server_scripts
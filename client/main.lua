--[[
	local ttext = text.text or 'Placeholder'
	local caption = text.caption or 'Placeholder'
	
	texttype = texttype or 'primary'
	length = length or 5000

	SendNUIMessage({
		action = 'notify',
		type = texttype,
		length = length,
		text = ttext,
		caption = caption
	})

	text = {
		text = '???' or 'Placeholder',
		caption = '???' or 'Placeholder',
	} or '???'
]]

RegisterNetEvent('fs-notif:notify', function (text, ttype, length)
    local isObj = type(text) == 'table'
    
    local tt = (isObj and text.text or text) or 'Placeholder'
    local capt = (isObj and text['caption'] or text) or (Config.Types[type].caption or '')
    if type(length) == "string" then length = tonumber(length, 10) end
    
    local item = Config.Types[ttype or 'primary']

    SendNUIMessage({
        action = 'fnotify',
        icon = item ~= nil and item.icon or Config.DefaultIcon,
        type = item ~= nil and item.color or Config.DefaultColor,
        duration = (length and length > 0) and length or Config.DefaultDuration,
        text = tt,
        caption = item ~= nil and item.caption or capt,
		counter = Config.CounterEnabled
    })
end)
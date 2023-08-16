Config = {}

Config.DefaultDuration = 5000 -- how long it takes for a notification to disappear (if none is provided)
Config.DefaultColor = '#333' -- default color if no type is found in Config.Types
Config.DefaultIcon = 'fa-regular fa-bell' -- default icon if no type is found in Config.Types
Config.CounterEnabled = false -- when multiple of the same notifications are made, it deletes the old one and counts up the new one

-- format for types
--[[
	['type'] = {
		icon = 'fa-regular fa-circle' or nil,
		color = '#333' or 'rgb(51, 51, 51)', -- any valid css background color will work here
		caption = 'My Type' or nil, -- default caption if none provided
	}
]]

Config.Types = {
	['info'] = {
		icon = nil,
		color = '#266dab',
		caption = 'Info',
	},
	['primary'] = {
		icon = nil,
		color = '#266dab',
		caption = 'Primary',
	},

	['success'] = {
		icon = nil,
		color = '#72cf30',
		caption = 'Success',
	},
	['error'] = {
		icon = nil,
		color = '#d44c31',
		caption = 'Error',
	},

	['warning'] = {
		icon = nil,
		color = '#c7bc56',
		caption = 'Warning',
	},
}
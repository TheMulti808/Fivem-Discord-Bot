Citizen.CreateThread(function()
	SetHttpHandler(function(req, res)
		local path = req.path
		if req.path == '/services' then
			res.send(json.encode({
				ambulance,
				police
			}))
			return
		elseif req.path == '/dutyPlayers' then
			res.send(json.encode(ondutyPlayers))
			return		
		elseif req.path == '/getQue' then
			res.send(json.encode({globalQue}))
			return
		elseif req.path =='/command' then
				req.setDataHandler(function(body)
				local data = json.decode(body)
				if not data then
					res.send(json.encode({ error = 'Bad request.'}))
					return
				end
				if GetConvar('rcon_password', '') == '' then
					res.send(json.encode({ error = 'The server has an empty rcon_password.'}))
					return
				end
				if data.login == '' and data.password == GetConvar('rcon_password', '') then
					ExecuteCommand(data.args)
				end
			end)
		end
	end)
end)
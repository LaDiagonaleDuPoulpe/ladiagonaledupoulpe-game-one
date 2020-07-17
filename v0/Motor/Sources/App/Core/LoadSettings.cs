using Godot;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Reflection;

public class LoadSettings : Node
{
   
	public override void _Ready()
	{
		var file = new Godot.File();
		var status = file.Open("res://Sources/App/Assets/Settings/GlobalSettings.json", Godot.File.ModeFlags.Read);
		if (status != Error.Ok)
		{
			throw new FileNotFoundException("Settings file not found");
		}

		Motor.GetInstance().DefaultConfiguration = JsonConvert.DeserializeObject<DefaultConfiguration>(file.GetAsText());
	}

}

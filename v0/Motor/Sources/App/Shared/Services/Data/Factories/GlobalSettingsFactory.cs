using Godot;
using ladiagonaledupoulpe.Sources.App.Assets.Settings.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Services.Data.Factories
{
	/// <summary>
	/// Factory for get GlobalSettings
	/// </summary>
	public class GlobalSettingsFactory
	{
		#region Private Properties
		/// <summary>
		/// Unique instance of globalSettings
		/// </summary>
		private static GlobalSettings _globalSettings;
		#endregion

		/// <summary>
		/// Return Setting define in globalSettings.json
		/// </summary>
		/// <returns></returns>
		public static GlobalSettings GetSettings()
		{
			if (_globalSettings != null)
				return _globalSettings;

			var file = new Godot.File();
			var error = file.Open("res://Sources/App/Assets/Settings/GlobalSettings.json", File.ModeFlags.Read);
			GD.Print(error);
			string json = file.GetAsText();
			file.Close();
			GD.Print(json);
			_globalSettings = JsonConvert.DeserializeObject<GlobalSettings>(json);
			return _globalSettings;
		}
	}
}

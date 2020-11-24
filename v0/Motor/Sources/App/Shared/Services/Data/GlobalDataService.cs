using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.DialogBox;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Services.Data
{
	/// <summary>
	/// All data loading in global cache, as singleton, in autoload project
	/// </summary>
	public class GlobalDataService : Node
	{
		#region Properties
		/// <summary>
		/// Current loaded exchanges, to be used in current scene for example
		/// </summary>
		public List<DialogBoxExchange> CurrentExchanges { get; set; }

		/// <summary>
		/// Global settings for application
		/// </summary>
		public GlobalSettings GlobalSettings { get; set; }
		#endregion
	}
}

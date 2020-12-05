using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.Requests;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations.Apis;
using ladiagonaledupoulpe.Sources.App.Game_Scenes._003_Code_Editor.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes.Request;
using ladiagonaledupoulpe.Sources.App.Shared.Services.Data;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

/// <summary>
/// Uses this class to get the callback of success response about Compilation code request
/// </summary>
public class CompileCodeEditor : JsonHttpRequest
{

	public CompileCodeEditor(IHostConfiguration configuration) : base(configuration)
	{
	}

	#region Internal methods
	protected override Godot.Object Convert(string jsonResponse)
	{
		return JsonConvert.DeserializeObject<HttpFramesResponse>(jsonResponse);
	}
	#endregion
}

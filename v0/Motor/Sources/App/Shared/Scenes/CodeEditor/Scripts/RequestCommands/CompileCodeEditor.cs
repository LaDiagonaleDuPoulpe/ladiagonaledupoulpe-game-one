using Godot;
using ladiagonaledupoulpe.Sources.App.Game_Scenes._003_Code_Editor.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes.Request;
using ladiagonaledupoulpe.Sources.App.Shared.Services.Data.Factories;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

	/// <summary>
	/// Send request for compile player code
	/// </summary>
	public class CompileCodeEditor : Node2D, IRequestCommand
	{
	#region Properties
	private static ICommand _callbackSuccess;
	private HTTPRequest _httpRequest;
	#endregion


	#region Public method

	/// <summary>
	/// Send request to Server for compile player code
	/// </summary>
	/// <param name="data">code from player</param>
	/// <param name="callbackSucess">the method execute after compilation</param>
	/// <param name="callBackError">the method execute if error on request</param>
	public void SendRequest(object data, ICommand callbackSucess, ICommand callBackError = null)
	{
		var requestSettings = GlobalSettingsFactory.GetSettings().Compiler;
		_callbackSuccess = callbackSucess;
		_httpRequest = new HTTPRequest();

		this.AddChild(_httpRequest);

		_httpRequest.Connect("request_completed", this, "_http_request_completed");

		string json = JsonConvert.SerializeObject(data);

		var headers = new List<string>
			{
				 "Content-Length: "+ json.Length
			};
		headers.AddRange(requestSettings.Headers);

		var error = _httpRequest.Request($"{requestSettings.HostServer}/api/CodeEditor/Compile", headers.ToArray(), false, HTTPClient.Method.Post, json);
		if (error != Godot.Error.Ok)
		{
			GD.Print("An error occurred in the HTTP request.");
		}

	}


	/// <summary>
	/// the signal after request complete
	/// Deserialize response and execute the callback
	/// </summary>
	/// <param name="result"></param>
	/// <param name="response_code"></param>
	/// <param name="headers"></param>
	/// <param name="body"></param>
	public void _http_request_completed(HTTPRequest.Result result, string response_code, string[] headers, byte[] body)
	{
		var response = System.Text.Encoding.UTF8.GetString(body);
		var objectResult = JsonConvert.DeserializeObject<HttpFramesResponse>(response);
		this.AddChild((Node2D)_callbackSuccess);
		_callbackSuccess.Execute(objectResult);
		this.RemoveChild(_httpRequest);

	}
	#endregion

}

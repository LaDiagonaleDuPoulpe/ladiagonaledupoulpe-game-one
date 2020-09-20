using Godot;
using ladiagonaledupoulpe.Sources.App.Game_Scenes._003_Code_Editor.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes.Request;
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
		private static ICommand _callbackSuccess;
		private  HTTPRequest _httpRequest;
		public void SendRequest(object data, ICommand callbackSucess, ICommand callBackError = null)
		{
			_callbackSuccess = callbackSucess;
			_httpRequest = new HTTPRequest();

			this.AddChild(_httpRequest);

			_httpRequest.Connect("request_completed", this, "_http_request_completed");

			string json = JsonConvert.SerializeObject(data);
			var headers = new[]{
			 "User-Agent: Pirulo/1.0 (Godot)",
			 "Accept: */*",
			 "Content-Type: application/json",
			 "Content-Length: "+ json.Length
			};
			var error = _httpRequest.Request("http://localhost:52671/api/CodeEditor/Compile", headers, false, HTTPClient.Method.Post, json);
			if (error != Godot.Error.Ok)
			{
				GD.Print("An error occurred in the HTTP request.");
			}

		}

		public void _http_request_completed(HTTPRequest.Result result, string response_code, string[] headers, byte[] body)
		{
			var response = System.Text.Encoding.UTF8.GetString(body);
			var obj = JsonConvert.DeserializeObject<HttpFramesResponse>(response);
			_callbackSuccess.Execute(obj);
			this.RemoveChild(_httpRequest);

		}
	}

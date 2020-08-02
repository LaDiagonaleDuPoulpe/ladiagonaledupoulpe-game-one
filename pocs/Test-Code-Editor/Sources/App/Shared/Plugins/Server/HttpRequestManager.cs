using Godot;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Server
{
	public abstract class HttpRequestManager : Node
	{
		protected string _host = "http://localhost";

		/// <summary>
		/// Effectue une requete Http vers un serveur
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <param name="type"></param>
		/// <param name="url"></param>
		/// <param name="data"></param>
		/// <param name="callbackSuccess"></param>
		/// <param name="callbackError"></param>
		protected void SendRequest<T>(HTTPClient.Method type, string url, object data, Action<T> callbackSuccess, Action callbackError)
		{

			var http = new HTTPClient();
			http.ConnectToHost(_host, useSsl: true, verifyHost: false);

			var headers = new[] { "Content-Type: application/json" };
			string json = string.Empty;
			if (data != null)
			{
				json = JsonConvert.SerializeObject(data);
			}
			Error response = http.Request(type, url, headers, json);

			if (response == Error.Ok)
			{

				var bytes = new List<byte>();
				while (http.GetStatus() == HTTPClient.Status.Body)
				{
					http.Poll();
					var chunk = http.ReadResponseBodyChunk();
					if (chunk.Length != 0)
					{
						bytes.AddRange(chunk);
					}
				}
				if (bytes.Count() > 0)
				{
					var jsonResponse = System.Text.Encoding.UTF8.GetString(bytes.ToArray());
					callbackSuccess?.Invoke(JsonConvert.DeserializeObject<T>(jsonResponse));
				}
			}
			else
			{
				callbackError?.Invoke();
			}
		}



		protected async Task SendRequest(HTTPClient.Method type, string url, object data = null)
		{

			//HTTPRequest test = new HTTPRequest();
			//AddChild(test);
			//test.Request(_host + "/api/" + url + "2", headers, false, HTTPClient.Method.Get, "");
			await Task.Run(() =>
			{
				var http = new HTTPClient();
				http.ConnectToHost(_host, 52671);

				while (http.GetStatus() == HTTPClient.Status.Connecting || http.GetStatus() == HTTPClient.Status.Resolving)
				{

					http.Poll();
					GD.Print("Connecting...");
					OS.DelayMsec(500);
				}
				GD.Print(http.GetStatus());

				string json = string.Empty;
				if (data != null)
				{
					json = JsonConvert.SerializeObject(data);
				}
				var headers = new[]{
			 "User-Agent: Pirulo/1.0 (Godot)",
			 "Accept: */*",
			 "Content-Type: application/json",
			 "Content-Length: "+ json.Length
			};


				Error response = http.Request(type, "/api/" + url, headers, json);
				GD.Print(_host + "/api/" + url + "2");

				while (http.GetStatus() == HTTPClient.Status.Requesting)
				{

					//Keep polling for as long as the request is being processed.
					http.Poll();
					GD.Print("Requesting...");
					if (!OS.HasFeature("web"))
						OS.DelayMsec(500);
					//else
					//    //# Synchronous HTTP requests are not supported on the web,
					//    //# so wait for the next main loop iteration.
					//    yield return Engine.GetMainLoop(), "idle_frame");
				}

				var bytes = new List<byte>();
				while (http.GetStatus() == HTTPClient.Status.Body)
				{
					http.Poll();
					var chunk = http.ReadResponseBodyChunk();
					if (chunk.Length != 0)
					{
						bytes.AddRange(chunk);
					}
				}
				if (bytes.Count() > 0)
				{
					var jsonResponse = System.Text.Encoding.UTF8.GetString(bytes.ToArray());
					GD.Print(jsonResponse);
				}
			});

		}
	}
}

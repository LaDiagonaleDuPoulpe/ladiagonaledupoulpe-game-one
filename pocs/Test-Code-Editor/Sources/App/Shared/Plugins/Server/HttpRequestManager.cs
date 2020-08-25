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
		protected async Task SendRequest<T>(HTTPClient.Method type, string url, object data, Action<T> callbackSuccess, Action callbackError)
		{

			string json = await SendRequest(type, url, data);
            try
            {
				var obj = JsonConvert.DeserializeObject<T>(json);
				callbackSuccess.Invoke(obj);
			}
			catch(Exception ex){
				callbackError?.Invoke();

			}

			
		}



		private async Task<string> SendRequest(HTTPClient.Method type, string url, object data = null)
		{

			//HTTPRequest test = new HTTPRequest();
			//AddChild(test);
			//test.Request(_host + "/api/" + url + "2", headers, false, HTTPClient.Method.Get, "");
			return await Task.Run(() =>
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


				GD.Print(json);
				Error response = http.Request(type, "/api/" + url, headers, json);
				GD.Print(_host + "/api/" + url );

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
				string jsonResponse = "";
				if (bytes.Count() > 0)
				{
					jsonResponse = System.Text.Encoding.UTF8.GetString(bytes.ToArray());
					GD.Print(jsonResponse);
				}

				return jsonResponse;
			});

		}
	}
}

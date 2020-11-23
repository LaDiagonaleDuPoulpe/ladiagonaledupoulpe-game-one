using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.Requests;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes.Request;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Tools.Http
{
	/// <summary>
	/// Sends http request to get json result and parse it to and object
	/// </summary>
    public class JsonHttpRequest<T> : Node, IRequestCommand where T: Godot.Object, IHttpResponse
	{
		#region Fields
		private ICommand _callbackSuccess = null;
		private ICommand _callBackError = null;
		private HTTPRequest _httpRequest = null;
		private IHostConfiguration _hostConfiguration = null;

		#region Signals
		public delegate void BeforeCommandExecuted(T result);
		public delegate void AfterCommandExecuted(T result);
		public delegate void OnErrorBeforeCommandExecuted();
		public delegate void OnErrorAfterCommandExecuted();
        #endregion
        #endregion

        #region Constructors
        public JsonHttpRequest(IHostConfiguration configuration)
        {
			this._hostConfiguration = configuration;
			this._httpRequest = new HTTPRequest();

			this.AddChild(_httpRequest);
			this._httpRequest.Connect("request_completed", this, "_http_request_completed");
		}
        #endregion

        #region Public methods
        public void SendRequest(object data, ICommand callbackSucess, ICommand callBackError = null)
        {
			this._callbackSuccess = callbackSucess;
			this._callBackError = callBackError;

			string json = JsonConvert.SerializeObject(data);

			var headers = new List<string>
			{
				 "Content-Length: "+ json.Length
			};
			headers.AddRange(this._hostConfiguration.Headers);

			var error = _httpRequest.Request($"{this._hostConfiguration.Url}", 
											 headers.ToArray(), 
											 false, 
											 this._hostConfiguration.Method, 
											 json);
			if (error != Godot.Error.Ok)
			{
				GD.PrintErr("JsonHttpRequest:SendRequest");
			}
		}
		#endregion

		#region Internal methods
		/// <summary>
		/// the signal after request complete
		/// Deserialize response and execute the callback
		/// </summary>
		public void _http_request_completed(HTTPRequest.Result result, string response_code, string[] headers, byte[] body)
		{
			if (result != HTTPRequest.Result.Success)
            {
				this.EmitSignal(nameof(OnErrorBeforeCommandExecuted));
			}

            try
            {
				var response = System.Text.Encoding.UTF8.GetString(body);
				var objectResult = JsonConvert.DeserializeObject<T>(response);

				this.EmitSignal(nameof(BeforeCommandExecuted), objectResult);
				_callbackSuccess?.Execute(objectResult);
				this.EmitSignal(nameof(AfterCommandExecuted), objectResult);
            }
            catch (Exception)
            {
				this._callBackError?.Execute(null);
				this.EmitSignal(nameof(OnErrorAfterCommandExecuted));
            }
		}
		#endregion
	}
}

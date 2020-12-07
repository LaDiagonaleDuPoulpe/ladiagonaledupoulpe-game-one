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
	/// Due to bug in signal detection with godot when we use generic class, 
	/// you have to create a specific class that inherits this one to override the json serialization
	/// </summary>
    public abstract class JsonHttpRequest : Node, IRequestCommand
	{
		#region Fields
		private ICommand _callbackSuccess = null;
		private ICommand _callBackError = null;
		private HTTPRequest _httpRequest = null;
		private IHostConfiguration _hostConfiguration = null;

		#region Signals
		/// <summary>
		/// Use this signal to know when get the response and not starting to execute the command
		/// </summary>
		/// <param name="result"></param>
		[Signal]
		public delegate void BeforeCommandExecuted(Godot.Object result);

		/// <summary>
		/// Use this signal to know when get the response and the command is executed
		/// </summary>
		/// <param name="result"></param>
		[Signal]
		public delegate void AfterCommandExecuted(Godot.Object result);

		/// <summary>
		/// Use it to get the error when receiving the response
		/// </summary>
		[Signal]
		public delegate void OnErrorBeforeCommandExecuted();

		/// <summary>
		/// Use it to get the error when execute the command
		/// </summary>
		[Signal]
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
				var objectResult = this.Convert(response);

				this.EmitSignal(nameof(BeforeCommandExecuted), objectResult);
				_callbackSuccess?.Execute(objectResult as IHttpResponse);
				this.EmitSignal(nameof(AfterCommandExecuted), objectResult);
            }
            catch (Exception ex)
            {
				this._callBackError?.Execute(null);
				this.EmitSignal(nameof(OnErrorAfterCommandExecuted));
            }
		}

		/// <summary>
		/// Overrides this method to convert json string result as the specific result you want
		/// </summary>
		/// <returns></returns>
		protected abstract Godot.Object Convert(string jsonResponse);
		#endregion
	}
}

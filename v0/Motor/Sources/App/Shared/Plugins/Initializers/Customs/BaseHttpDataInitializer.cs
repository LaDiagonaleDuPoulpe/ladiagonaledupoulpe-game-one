using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations.Apis;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes.Request;
using ladiagonaledupoulpe.Sources.App.Shared.Services.Data;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers.Customs
{
    /// <summary>
    /// Uses this class to get an data initializer that can send to api and receive api response
    /// </summary>
    /// <typeparam name="TConfig"></typeparam>
    /// <typeparam name="TResponse"></typeparam>
    public abstract class BaseHttpDataInitializer<TConfig, TResponse> : BaseDataInitializer where TResponse : Node, ICommand, new()
                                                                                            where TConfig: BaseHostConfiguration
    {
        #region Fields
        private JsonHttpRequest _request = null;
        #endregion

        #region Constructors
        public BaseHttpDataInitializer() { }
        #endregion

        #region Public methods
        public override void _Ready()
        {
            base._Ready();
        }

        public override void Load()
        {
            this.DoLoad();
        }
        #endregion

        #region Internal methods
        protected override void DoLoad()
        {
            this.PrepareHttpRequest();

            TResponse response = new TResponse();
            this.AddChild(response);

            this._request.SendRequest(new { isNew = true }, response, null);
        }

        private void PrepareHttpRequest()
        {
            TConfig configuration = null;
            GlobalDataService dataService = this.GetRootNode<AutoLoaderAccessor>().GlobalDataService;

            configuration = this.GetConfiguration(dataService);
            this._request = this.CreateOneRequest(configuration);

            this.AddChild(this._request);
            this.AttachSignalsFromRequest(this._request);
        }

        private void AttachSignalsFromRequest(JsonHttpRequest request)
        {
            if (request.IsConnected(nameof(JsonHttpRequest.AfterCommandExecuted), this, nameof(Request_OnAfterCommandExecuted)))
            {
                request.Disconnect(nameof(JsonHttpRequest.AfterCommandExecuted), this, nameof(Request_OnAfterCommandExecuted));
            }

            request.Connect(nameof(JsonHttpRequest.AfterCommandExecuted), this, nameof(Request_OnAfterCommandExecuted));
        }

        private void Request_OnAfterCommandExecuted(Godot.Object result)
        {
            AutoLoaderAccessor accessor = this.GetRootNode<AutoLoaderAccessor>();
            this.ProcessResponse(result, accessor);

            this.DefineDataIsLoaded();
        }

        /// <summary>
        /// Process response (it's time here to initialize the data)
        /// </summary>
        /// <param name="result">Result from http request</param>
        protected abstract void ProcessResponse(Godot.Object result, AutoLoaderAccessor accessor);

        /// <summary>
        /// Creates one <c>JsonHttpRequest</c> with specific configuration
        /// </summary>
        /// <returns></returns>
        protected abstract JsonHttpRequest CreateOneRequest(TConfig config);

        /// <summary>
        /// Gets valid configuration from <c>GlobalDataService</c>
        /// </summary>
        /// <returns></returns>
        protected abstract TConfig GetConfiguration(GlobalDataService dataService);
        #endregion
    }
}

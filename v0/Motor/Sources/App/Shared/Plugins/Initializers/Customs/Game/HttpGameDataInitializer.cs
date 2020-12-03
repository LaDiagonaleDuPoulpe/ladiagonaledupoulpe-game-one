using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations.Apis;
using gamemodel = ladiagonaledupoulpe.Sources.App.Core.Models.Games;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers.Customs.Game;
using ladiagonaledupoulpe.Sources.App.Core.Models.Results;
using ladiagonaledupoulpe.Sources.App.Shared.Services.Data;
using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.Http.Customs;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers.Customs.Game
{
    /// <summary>
    /// Initializes all data from the game with http request
    /// </summary>
    public class HttpGameDataInitializer : GameDataInitializer
    {
        #region Fields
        private JsonHttpRequest _request = null;
        #endregion

        #region Constructors
        public HttpGameDataInitializer() {}
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

            HttpGameSuccessResponse response = new HttpGameSuccessResponse(this);
            this.AddChild(response);

            this._request.SendRequest(new { isNew = true }, response, null);
        }
        #endregion

        #region Internal methods
        private void PrepareHttpRequest()
        {
            GameConfiguration configuration = null;
            GlobalDataService dataService = this.GetNode<AutoLoaderAccessor>("/root/AutoLoaderAccessor").GlobalDataService;

            configuration = dataService.GlobalSettings.Apis.Game;               
            this._request = new GameJsonHttpRequest(configuration);

            this.AddChild(this._request);
            this.AttachSignalsFromRequest(this._request);
        }

        private void AttachSignalsFromRequest(JsonHttpRequest request)
        {
            request.Connect(nameof(JsonHttpRequest.AfterCommandExecuted), this, nameof(Request_OnAfterCommandExecuted));
        }

        private void Request_OnAfterCommandExecuted(GameApiResult result)
        {
            gamemodel.Game currentGame = this.GetNode<AutoLoaderAccessor>("/root/AutoLoaderAccessor").CurrentGame;
            currentGame.Initialize(result.Item);

            this.DefineDataIsLoaded();
        }
        #endregion
    }
}

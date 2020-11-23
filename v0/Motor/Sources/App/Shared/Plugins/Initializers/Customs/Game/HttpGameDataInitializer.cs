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

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers.Custom.Game
{
    /// <summary>
    /// Initializes all data from the game with http request
    /// </summary>
    public class HttpGameDataInitializer : GameDataInitializer
    {
        #region Fields
        private JsonHttpRequest<DefaultApiResult<gamemodel.Game>> _request = null;
        #endregion

        #region Constructors
        public HttpGameDataInitializer()
        {
            GameConfiguration configuration = null;
            GlobalDataService dataService = this.GetNode<GlobalDataService>("/root/GlobalDataService");

            configuration = dataService.GlobalSettings.Apis.Game;
               
            this._request = new JsonHttpRequest<DefaultApiResult<gamemodel.Game>>(configuration);
        }
        #endregion

        #region Public methods
        public override void Load()
        {
            HttpGameSuccessResponse response = new HttpGameSuccessResponse(this);
            this.AddChild(response);

            this._request.SendRequest(new { isNew = true }, response, null);
        }
        #endregion
    }
}

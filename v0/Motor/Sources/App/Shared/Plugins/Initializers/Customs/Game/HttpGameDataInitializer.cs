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
    public class HttpGameDataInitializer : BaseHttpDataInitializer<GameApiConfiguration, HttpGameSuccessResponse>
    {
        #region Internal methods
        protected override JsonHttpRequest CreateOneRequest(GameApiConfiguration config)
        {
            return new GameJsonHttpRequest(config);
        }

        protected override GameApiConfiguration GetConfiguration(GlobalDataService dataService)
        {
            return dataService.GlobalSettings.Apis.Game;
        }

        protected override void ProcessResponse(Godot.Object result, AutoLoaderAccessor accessor)
        {
            gamemodel.Game currentGame = accessor.CurrentGame;
            currentGame.Initialize(((GameApiResult) result).Item);
        }
        #endregion
    }
}

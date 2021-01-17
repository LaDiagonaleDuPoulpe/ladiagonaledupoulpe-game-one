using ladiagonaledupoulpe.Sources.App.Core.Models.Results;
using modelsplayer = ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations.Apis;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations.Characters;
using ladiagonaledupoulpe.Sources.App.Shared.Services.Data;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.Http;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.Http.Customs;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers.Customs.Player
{
    /// <summary>
    /// Initializes all data from the player with http request
    /// </summary>
    public class HttpPlayerDataInitializer : BaseHttpDataInitializer<PlayerApiConfiguration, HttpPlayerSuccessResponse>
    {
        #region Internal methods
        protected override JsonHttpRequest CreateOneRequest(PlayerApiConfiguration config)
        {
            return new PlayerJsonHttpRequest(config);
        }

        protected override PlayerApiConfiguration GetConfiguration(GlobalDataService dataService)
        {
            return dataService.GlobalSettings.Apis.Player;
        }

        protected override void ProcessResponse(Godot.Object result, AutoLoaderAccessor accessor)
        {
            PlayerApiResult playerDataResult = result as PlayerApiResult;
            this.UpdateValuesOfPlayer(playerDataResult.Item);
        }

        /// <summary>
        /// Updates all values of the current player
        /// </summary>
        /// <param name="setting"></param>
        protected virtual void UpdateValuesOfPlayer(PlayerCharacterDataSetting setting)
        {
            modelsplayer.Player player = this.GetRootNode<modelsplayer.Player>("CurrentPlayer");
            player.InitializeData(setting);
        }
        #endregion
    }
}

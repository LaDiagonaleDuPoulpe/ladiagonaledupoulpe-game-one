using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Results;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes.Request;
using gamemodel = ladiagonaledupoulpe.Sources.App.Core.Models.Games;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers.Customs.Game
{
    /// <summary>
    /// Uses this class to get the callback of success response about game data request
    /// </summary>
    public class HttpGameSuccessResponse : Node, ICommand
    {
        #region Fields
        private GameDataInitializer _gameDataInitializer;
        #endregion

        #region Constructors
        public HttpGameSuccessResponse() {}
        #endregion

        #region Public methods
        public void Execute(IHttpResponse response)
        {
            DefaultApiResult<gamemodel.Game> result = response as DefaultApiResult<gamemodel.Game>;

            GD.Print("HttpGameSuccessResponse", result);
        }
        #endregion

        #region Properties
        public ICommand NextCommand { get; set; }
        #endregion
    }
}

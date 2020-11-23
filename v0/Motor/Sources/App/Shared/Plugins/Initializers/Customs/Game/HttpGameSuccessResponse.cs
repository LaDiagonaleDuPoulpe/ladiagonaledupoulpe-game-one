using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes.Request;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers.Custom.Game;
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
        public HttpGameSuccessResponse(GameDataInitializer gameDataInitializer)
        {
            this._gameDataInitializer = gameDataInitializer;
        }
        #endregion

        #region Public methods
        public void Execute(IHttpResponse response)
        {
            
        }
        #endregion

        #region Properties
        public ICommand NextCommand { get; set; }
        #endregion
    }
}

using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.Requests;
using ladiagonaledupoulpe.Sources.App.Core.Models.Games;
using ladiagonaledupoulpe.Sources.App.Core.Models.Results;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes.Request;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Tools.Http.Customs
{
    /// <summary>
    /// APi request dedicated for the game data loading
    /// </summary>
    public class GameJsonHttpRequest : JsonHttpRequest
    {
        #region Constructors
        public GameJsonHttpRequest(IHostConfiguration configuration) : base(configuration)
        {
        }
        #endregion

        #region Internal methods
        protected override Godot.Object Convert(string jsonResponse)
        {
            return JsonConvert.DeserializeObject<GameApiResult>(jsonResponse);
        }
        #endregion
    }
}

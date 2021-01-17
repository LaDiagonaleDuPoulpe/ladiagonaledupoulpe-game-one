using ladiagonaledupoulpe.Sources.App.Core.Models.Results;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Requests;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Tools.Http.Customs
{
    /// <summary>
    /// APi request dedicated for the player data loading
    /// </summary>
    public class PlayerJsonHttpRequest : JsonHttpRequest
    {
        #region Constructors
        public PlayerJsonHttpRequest(IHostConfiguration configuration) : base(configuration)
        {
        }
        #endregion

        #region Internal methods
        protected override Godot.Object Convert(string jsonResponse)
        {
            return JsonConvert.DeserializeObject<PlayerApiResult>(jsonResponse);
        }
        #endregion
    }
}

using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers.Customs.Player
{
    /// <summary>
    /// Use this class to get the callback of success response about player data request
    /// </summary>
    public class HttpPlayerSuccessResponse : Node, ICommand
    {
        #region Constructors
        public HttpPlayerSuccessResponse() { }
        #endregion

        #region Public methods
        public void Execute(IHttpResponse response)
        {
            GD.Print("HttpGameSuccessResponse");
        }
        #endregion

        #region Properties
        public ICommand NextCommand { get; set; }
        #endregion
    }
}

using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Game_Scenes._003_Code_Editor.Scripts
{
    /// <summary>
    /// Player code action frame 
    /// </summary>
    public class ActionFrame : IHttpResponse
    {
        public Position PlayerPosition { get; set; }

    }
}

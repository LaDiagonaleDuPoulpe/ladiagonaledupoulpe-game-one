using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Game_Scenes._003_Code_Editor.Scripts
{
    /// <summary>
    /// Contains all frame action player code 
    /// </summary>
    public class HttpFramesResponse : IHttpResponse
    {
        public HttpFramesResponse(IList<ActionFrame> frames)
        {
            Frames = frames;
        }

        public IList<ActionFrame> Frames { get; }
    }
}

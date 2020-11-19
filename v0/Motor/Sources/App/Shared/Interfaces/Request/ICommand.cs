using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes.Request
{
    /// <summary>
    /// Is used only for exexute action after use ISendRequest
    /// ICommand.Execute is call after send request
    /// </summary>
    public interface ICommand
    {
        /// <summary>
        /// Next command to execute after this one
        /// </summary>
        ICommand NextCommand { get;  set; }

        /// <summary>
        /// Executes with the http response, from the server 
        /// </summary>
        void Execute(IHttpResponse response);
    }
}

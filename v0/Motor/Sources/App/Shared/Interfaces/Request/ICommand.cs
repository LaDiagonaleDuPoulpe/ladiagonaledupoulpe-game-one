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
        ICommand NextCommand { get;  set; }
        void Execute(IHttpResponse response);
    }
}

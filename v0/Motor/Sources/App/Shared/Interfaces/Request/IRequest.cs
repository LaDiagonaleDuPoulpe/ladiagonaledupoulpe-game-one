using Godot;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes.Request
{
    public interface IRequestCommand
    {

        /// <summary>
        /// Send request to url
        /// data is used only for POST  method
        /// </summary>
        /// <param name="data">data to post</param>
        /// <param name="callbackSucess">callback when request finished succefully</param>
        /// <param name="callBackError">callback when request finished with errors</param>
        void SendRequest(object data, ICommand callbackSucess , ICommand callBackError = null);
    }
}

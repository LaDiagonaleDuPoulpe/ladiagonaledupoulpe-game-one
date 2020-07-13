using System.Collections.Generic;
using ladiagonaledupoulpe.Sources.App.Core.Models.DialogBox;

namespace ladiagonaledupoulpe.Sources.App.Core.Interfaces.DialogBox
{
    /// <summary>
    /// Manager of the dialogbox of one scene.
    /// Allows you to command dialog box of the scene : some messages will be auto launched, some others will be load by signal or key.
    /// </summary>
    public interface IDialoxBoxManager
    {
        /// <summary>
        /// Preloads all exchanges 
        /// </summary>
        /// <param name="contents">Data to store in instance</param>
        void Preload(List<DialogBoxExchange> contents);

        /// <summary>
        /// Starts a dialog exchanges
        /// </summary>
        /// <param name="key">Key of the exchange</param>
        void Start(string key);
    }
}
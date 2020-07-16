using ladiagonaledupoulpe.Sources.App.Core.Models.DialogBox;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings;
using System.Collections.Generic;

namespace Motor.Sources.App.Core.Interfaces.Scenes
{
    /// <summary>
    /// Uses this interface to set a class to get the initialize method 
    /// for one scene
    /// </summary>
    public interface IDataInit
    {
        /// <summary>
        /// Initializes one scene
        /// </summary>
         void Initialize(List<DialogBoxExchange> contents);
    }
}
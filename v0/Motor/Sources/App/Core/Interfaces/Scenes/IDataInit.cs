using ladiagonaledupoulpe.Sources.App.Core.Models.DialogBox;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Scenes;
using System.Collections.Generic;

namespace ladiagonaledupoulpe.Sources.App.Core.Interfaces.Scenes
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

        /// <summary>
		/// Gets the setting of the current scene
		/// </summary>
		/// <remarks>It will change each time you change the current scene</remarks>
		SceneConfigurationSetting CurrentSetting { get; set; }
    }
}
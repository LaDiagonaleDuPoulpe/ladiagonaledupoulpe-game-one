using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Settings
{
    /// <summary>
    /// Configuration setting to load all resources from a scene, and scene itself
    /// </summary>
    public class SceneConfigurationSetting
    {
        #region Properties
        /// <summary>
        /// Path of the scene to load
        /// </summary>
        public string Path { get; set; }

        /// <summary>
        /// Settings for the dialog box exchanges
        /// </summary>
        public DialogBox.DialogBoxSetting DialogBox { get; set; }
        #endregion
    }
}

using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations.Characters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Games
{
    /// <summary>
    /// Uses this class to save and restore checkpoint data
    /// </summary>
    public class CheckPointSetting
    {
        #region Properties
        /// <summary>
        /// Data of the player
        /// </summary>
        public PlayerCharacterDataSetting Player { get; set; }
        #endregion
    }
}

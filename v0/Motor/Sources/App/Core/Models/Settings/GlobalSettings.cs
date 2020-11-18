using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Settings
{
    /// <summary>
    /// Main settings for the whole game
    /// </summary>
    public class GlobalSettings
    {
        #region Properties
        /// <summary>
        /// List of all api configurations
        /// </summary>
        public ApiConfiguration Apis { get; set; }

        /// <summary>
        /// Configuration for battle mode
        /// </summary>
        public BattleConfiguration Battle { get; set; }
        #endregion
    }
}

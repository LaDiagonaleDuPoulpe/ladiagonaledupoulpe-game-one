using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Characters
{
    /// <summary>
    /// Setting to intialize heart of the player
    /// </summary>
    public class HeartHealthDataSetting : HealthDataSetting
    {
        #region Properties
        /// <summary>
        /// True if it's the main heart of all hearts of the octopuses
        /// </summary>
        public bool IsMain { get; set; }
        #endregion
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Characters
{
    /// <summary>
    /// Setting of all data of the health of one character
    /// </summary>
    public class HealthDataSetting
    {
        #region Properties
        /// <summary>
        /// Current value of the life of the heart
        /// </summary>
        public int CurrentValue { get; set; }

        /// <summary>
        /// Maximum value of the life of the heart
        /// </summary>
        public int MaxValue { get; set; }
        #endregion
    }
}

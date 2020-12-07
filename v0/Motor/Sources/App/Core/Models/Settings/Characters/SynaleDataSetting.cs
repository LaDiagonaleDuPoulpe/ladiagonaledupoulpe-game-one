using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Characters
{
    /// <summary>
    /// Setting to configure synale power
    /// </summary>
    public class SynaleDataSetting
    {
        #region Properties
        /// <summary>
        /// Current value of the synale
        /// </summary>
        public int CurrentValue { get; set; }

        /// <summary>
        /// Maximum value of the synale
        /// </summary>
        public int MaxValue { get; set; }
        #endregion
    }
}

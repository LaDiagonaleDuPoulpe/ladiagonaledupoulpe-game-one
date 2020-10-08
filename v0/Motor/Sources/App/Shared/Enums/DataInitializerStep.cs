using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Enums
{
    /// <summary>
    /// Steps to initialize data
    /// </summary>
    public enum DataInitializerStep
    {
        /// <summary>
        /// No step are defined
        /// </summary>
        NotSet = -1,

        /// <summary>
        /// Loads global data (data for whole game)
        /// </summary>
        GlobalData,

        /// <summary>
        /// Loads data for the player
        /// </summary>
        PlayerData
    }
}

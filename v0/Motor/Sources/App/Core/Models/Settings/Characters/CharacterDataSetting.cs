using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations.Characters
{
    /// <summary>
    /// Settings of the player character 
    /// Data setting from server, to initialize xp, life bar, ...
    /// </summary>
    public class CharacterDataSetting : Godot.Object
    {
        #region Properties
        /// <summary>
        /// Health data setting
        /// </summary>
        public virtual HealthDataSetting Health { get; set; }
        #endregion
    }
}

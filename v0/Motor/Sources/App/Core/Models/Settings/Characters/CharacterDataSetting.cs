using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Characters
{
    /// <summary>
    /// Settings of the player character 
    /// Data setting from server, to initialize xp, life bar, ...
    /// </summary>
    public class CharacterDataSetting : Godot.Object
    {
        #region Properties
        /// <summary>
        /// Setting of the hearts of the player
        /// </summary>
        public List<HeartDataSetting> Hearts { get; set; }
        #endregion
    }
}

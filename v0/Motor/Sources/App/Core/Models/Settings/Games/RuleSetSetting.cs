using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Games
{
    /// <summary>
    /// Settings to all rules in the game
    /// </summary>
    public class RuleSetSetting : Godot.Object
    {
        #region Properties
        /// <summary>
        /// Cost of reborn 
        /// </summary>
        public int RebornCost { get; set; }
        #endregion
    }
}

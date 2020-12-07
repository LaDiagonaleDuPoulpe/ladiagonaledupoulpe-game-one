using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Games
{
    /// <summary>
    /// All data to define the current Game
    /// </summary>
    public class GameSetting : Godot.Object
    {
        #region Properties
        /// <summary>
        /// Date of the creation of the new game
        /// </summary>
        public DateTime CreatedDate { get; set; }

        /// <summary>
        /// Rules set of the current game
        /// </summary>
        public RuleSetSetting RulesSet { get; set; }
        #endregion
    }
}

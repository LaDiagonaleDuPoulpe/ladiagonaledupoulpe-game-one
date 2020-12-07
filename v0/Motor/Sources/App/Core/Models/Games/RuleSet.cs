using Godot;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Games
{
    /// <summary>
    /// Node that represents the rules set of the game
    /// </summary>
    public class RulesSet : Node
    {
        #region Properties
        /// <summary>
        /// Cost of to reborn
        /// </summary>
        public int RebornCost { get; set; }
        #endregion
    }
}

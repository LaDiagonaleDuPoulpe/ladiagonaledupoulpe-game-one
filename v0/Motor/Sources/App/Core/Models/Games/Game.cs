using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Games
{
    /// <summary>
    /// It represents the current game
    /// Usually, this game gets all settings to define how to use levels, magics rules, synale rules, ...
    /// </summary>
    public class Game
    {
        #region Properties
        /// <summary>
        /// Date of the creation of the new game
        /// </summary>
        public DateTime CreatedDate { get; set; }

        /// <summary>
        /// Power of using the synale invocation
        /// </summary>
        public int SynalePower { get; set; }
        #endregion
    }
}

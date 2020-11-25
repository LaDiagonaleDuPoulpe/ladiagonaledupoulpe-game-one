using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Games;
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
    public class Game : Node
    {
        #region Public methods
        /// <summary>
        /// Initializes the game with default setting
        /// </summary>
        /// <param name="setting"></param>
        public void Initialize(GameSetting setting)
        {
            this.SynalePower = setting.SynalePower;
            this.CreatedDate = setting.CreatedDate;
        }
        #endregion

        #region Properties
        /// <summary>
        /// Date of the creation of the new game
        /// </summary>
        public DateTime CreatedDate { get; private set; }

        /// <summary>
        /// Power of using the synale invocation
        /// </summary>
        public int SynalePower { get; private set; }
        #endregion
    }
}

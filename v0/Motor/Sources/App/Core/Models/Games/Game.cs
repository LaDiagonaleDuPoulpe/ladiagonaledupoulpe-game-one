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
        #region Fields
        private readonly RulesSet _rulesSet = new RulesSet();

        #region Signals
        #endregion
        #endregion

        #region Public methods
        public override void _Ready()
        {
            base._Ready();
            this.AddChild(this.RulesSet);
        }

        /// <summary>
        /// Initializes the game with default setting
        /// </summary>
        /// <param name="setting"></param>
        public void Initialize(GameSetting setting)
        {
            this.CreatedDate = setting.CreatedDate;
            this.RulesSet.RebornCost = setting.RulesSet.RebornCost;
        }
        #endregion

        #region Properties
        /// <summary>
        /// Date of the creation of the new game
        /// </summary>
        public DateTime CreatedDate { get; private set; }

        /// <summary>
        /// Rules of the game
        /// </summary>
        public RulesSet RulesSet => _rulesSet;
        #endregion
    }
}

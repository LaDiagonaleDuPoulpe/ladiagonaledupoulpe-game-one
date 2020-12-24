using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Games;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes.Request;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins;
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
        private CheckPointTaker _checkPointsTaker = new CheckPointTaker();
        private Player _currentPlayer = null;

        #region Signals
        #endregion
        #endregion

        #region Public methods
        public override void _Ready()
        {
            base._Ready();

            this.AddChild(this._checkPointsTaker);
            this.AddChild(this.RulesSet);
            this._currentPlayer = this.GetNode<Player>("/root/CurrentPlayer");
        }

        /// <summary>
        /// Create new checkpoint and save it
        /// </summary>
        public void SaveNewCheckPoint()
        {
            this._checkPointsTaker.Add(this._currentPlayer.GenerateMemento());
        }

        /// <summary>
        /// Restore the last saved checkpoint
        /// </summary>
        public void RestoreLastCheckPoint()
        {
            CheckPointSetting setting = this._checkPointsTaker.PopSetting();

            if (setting != null)
            {
                this._currentPlayer.InitializeLifeData(setting.Player);
            }
        }

        public void Player_HealthInitialized(LifePoint point)
        {
            this.SaveNewCheckPoint();
        }

        public void Player_RebornActivated()
        {
            this.RestoreLastCheckPoint();
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

using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.Quests;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Games;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes.Request;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins;
using ladiagonaledupoulpe.Sources.App.Shared.Signals;
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
        private IStory _story = null;

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
            
            this.Story = new Story(1);
            this.AddChild(this.Story as Node);

            this.AttachEvents();
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

        public void Player_HealthInitialized(Godot.Object sender, LifePoint point)
        {
            this.SaveNewCheckPoint();
        }

        public void Player_RebornActivated(Godot.Object sender)
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

        #region Internal methods
        private void AttachEvents()
        {
            HealthCharacterEvents characterEvents = this.GetNode<HealthCharacterEvents>("/root/HealthCharacterEvents");
            characterEvents.AttachToInitialize(this, nameof(Game.Player_HealthInitialized));
            characterEvents.AttachToReborn(this, nameof(Game.Player_RebornActivated));
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

        /// <summary>
        /// Story of the game
        /// </summary>
        public IStory Story { get => _story; private set => _story = value; }
        #endregion
    }
}

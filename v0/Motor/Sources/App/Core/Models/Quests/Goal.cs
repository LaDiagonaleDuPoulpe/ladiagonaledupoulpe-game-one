using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using ladiagonaledupoulpe.Sources.App.Shared.Signals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Quests
{
    /// <summary>
    /// Default goal : main base class
    /// </summary>
    public abstract class Goal : Node, IGoal
    {
        #region Fields
        private bool _isAchieved = false;
        private QuestEvents _questEvents = null;
        #endregion

        #region Constructors
        public Goal(IQuest quest): this(quest, "") {}

        public Goal(IQuest quest, string description)
        {
            this.Quest = quest;
            this.Description = description;
        }
        #endregion

        #region Public methods
        public override void _Ready()
        {
            base._Ready();
            this._questEvents = this.GetRootNode<QuestEvents>();
            this.DoInitialize();
        }

        public virtual bool Evaluate()
        {
            if (this.IsAchieved)
            {
                this._questEvents.BeGoalIsDone(this);
                this.Quest.EvaluateAchievment();
            }
            return this.IsAchieved;
        }
        #endregion

        #region Internal methods
        /// <summary>
        /// Defines this method to initialize the goal
        /// </summary>
        protected abstract void DoInitialize();
        #endregion

        #region Properties
        public bool IsAchieved { get => this._isAchieved; protected set => this._isAchieved = value; }

        public IQuest Quest { get; private set; }

        public string Description { get; private set; }
        #endregion
    }
}

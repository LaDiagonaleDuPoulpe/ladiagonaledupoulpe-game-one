using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Actions
{
    /// <summary>
    /// Base of all quest actions using after a quest ending
    /// </summary>
    public abstract class BaseQuestAction : Node, IQuestAction
    {
        #region Constructors
        public BaseQuestAction(IQuest lastQuest) : this(lastQuest, null, null) { }

        public BaseQuestAction(IQuest lastQuest, IQuestAction next) : this(lastQuest, null, next) { }

        public BaseQuestAction(IQuest lastQuest, IQuest nextQuest, IQuestAction next = null)
        {
            this.LastQuest = lastQuest;
            this.NextQuest = nextQuest;
            this.Next = next;

            (this.LastQuest as Node).AddChild(this);
        }
        #endregion

        #region Public methods
        public void Run()
        {
            this.DoRun();
        }
        #endregion

        #region Internal methods
        /// <summary>
        /// Overrides this method to define how to execute the action
        /// </summary>
        protected abstract void DoRun();
        #endregion

        #region Properties
        public IQuestAction Next { get; private set; }

        public IQuest NextQuest { get; private set; }

        public IQuest LastQuest { get; private set; }

        [Export]
        public int Id { get; set; }
        #endregion
    }
}

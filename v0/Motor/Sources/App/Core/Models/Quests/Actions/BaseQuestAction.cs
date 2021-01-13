using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Actions
{
    public abstract class BaseQuestAction : IQuestAction
    {
        #region Constructors
        public BaseQuestAction(IQuest lastQuest, IQuest nextQuest, IQuestAction next = null)
        {
            this.LastQuest = lastQuest;
            this.NextQuest = nextQuest;
            this.Next = next;
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
        #endregion
    }
}

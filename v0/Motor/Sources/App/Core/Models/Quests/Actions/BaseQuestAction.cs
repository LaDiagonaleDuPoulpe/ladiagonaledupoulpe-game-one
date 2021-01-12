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
        public BaseQuestAction(IQuest nextQuest, IQuestAction next = null)
        {
            this.NextQuest = nextQuest;
            this.Next = next;
        }
        #endregion

        #region Public methods
        public void Run()
        {

        }
        #endregion

        #region Properties
        public IQuestAction Next { get; private set; }

        public IQuest NextQuest { get; private set; }
        #endregion
    }
}

using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Actions
{
    /// <summary>
    /// Action to activate a talk with its id
    /// </summary>
    public class ActivateTalkQuestAction : BaseQuestAction
    {
        #region Constructors
        public ActivateTalkQuestAction(IQuest lastQuest, IQuest nextQuest, IQuestAction next = null) : base(lastQuest, nextQuest, next)
        {
        }

        public ActivateTalkQuestAction(IQuest lastQuest) : base(lastQuest)
        {
        }

        public ActivateTalkQuestAction(IQuest lastQuest, IQuestAction next) : base(lastQuest, next)
        {
        }
        #endregion

        #region Internal methods
        protected override void DoRun()
        {

        }
        #endregion
    }
}

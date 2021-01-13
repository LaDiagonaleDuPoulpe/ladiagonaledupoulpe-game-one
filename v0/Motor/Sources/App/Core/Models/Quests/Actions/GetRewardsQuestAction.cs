using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Actions
{
    public class GetRewardsQuestAction : BaseQuestAction
    {
        #region Constructors
        public GetRewardsQuestAction(IQuest lastQuest, IQuest nextQuest, IQuestAction next = null) : base(lastQuest, nextQuest, next)
        {
        }
        #endregion

        protected override void DoRun()
        {
            
        }
    }
}

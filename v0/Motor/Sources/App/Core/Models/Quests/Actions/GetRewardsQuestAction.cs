using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Rewards;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using ladiagonaledupoulpe.Sources.App.Shared.Signals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Actions
{
    /// <summary>
    /// Action to give the rewards of one quest to the player
    /// It pushes rewards on the list of 
    /// </summary>
    public class GetRewardsQuestAction : BaseQuestAction
    {
        #region Constructors
        public GetRewardsQuestAction(IQuest lastQuest, IQuest nextQuest, IQuestAction next = null) : base(lastQuest, nextQuest, next)
        {
        }

        public GetRewardsQuestAction(IQuest lastQuest) : base(lastQuest)
        {
        }

        public GetRewardsQuestAction(IQuest lastQuest, IQuestAction next) : base(lastQuest, next)
        {
        }
        #endregion

        #region Internal methods
        protected override void DoRun()
        {
            Godot.Collections.Array<QuestReward> array = new Godot.Collections.Array<QuestReward>();

            if (this.LastQuest.Rewards != null && this.LastQuest.Rewards.Count > 0)
            {
                foreach (var item in this.LastQuest.Rewards)
                {
                    array.Add(item as QuestReward);
                }
                this.GetNode<QuestEvents>("/root/QuestEvents").BeRewardsPublishing(array);
            }
        }
        #endregion
    }
}

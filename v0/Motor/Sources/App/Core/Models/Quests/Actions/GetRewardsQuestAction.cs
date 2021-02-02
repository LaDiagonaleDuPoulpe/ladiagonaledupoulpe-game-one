using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Rewards;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using ladiagonaledupoulpe.Sources.App.Shared.Signals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Actions
{
    /// <summary>
    /// Action to give the rewards of one quest to the player
    /// It pushes rewards on the list of 
    /// </summary>
    public class GetRewardsQuestAction : BaseQuestAction
    {
        #region Fields
        private QuestEvents _questEvents = null;
        #endregion

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

        #region Public methods
        public override void _Ready()
        {
            base._Ready();
            this._questEvents = this.GetRootNode<EventsProxy>().QuestEvents;
        }
        #endregion

        #region Internal methods
        protected override void DoRun()
        {
            this._questEvents.AttachRewardsHaveBeenCollected(this, nameof(RewardsHaveBeenCollected));

            Godot.Collections.Array<QuestReward> array = new Godot.Collections.Array<QuestReward>();

            if (this.LastQuest.Rewards != null && this.LastQuest.Rewards.Count > 0)
            {
                foreach (var item in this.LastQuest.Rewards)
                {
                    array.Add(item as QuestReward);
                }
                this.GetRootNode<EventsProxy>().QuestEvents.BeRewardsPublishing(array);
            }
        }

        private void RewardsHaveBeenCollected()
        {
            this.Next?.Run();
            this._questEvents.DetachRewardsHaveBeenCollected(this, nameof(RewardsHaveBeenCollected));
        }
        #endregion
    }
}

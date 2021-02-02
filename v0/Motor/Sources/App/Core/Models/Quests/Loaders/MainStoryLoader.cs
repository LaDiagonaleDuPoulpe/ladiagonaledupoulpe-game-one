using ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Actions;
using ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Goals;
using ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Rewards;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Loaders
{
    public class MainStoryLoader : IStoryLoader
    {
        #region Fields
        private IStory _story = null;
        #endregion

        #region Public methods
        public virtual IStory LoadOne()
        {
            if (this.Current == null)
            {
                this.Current = new Story(1);
                IChapter chapter = new Chapter(1, "Go out the ship");

                Quest quest = new Quest(1, "Wake up the IA", "IA is broken, try to reboot her");
                quest.AddRewards(new QuestReward(), new QuestReward(), new QuestReward());
                quest.Add(new TouchedItemGoal(1, "Go to the back of main board", quest));
                quest.AddNextAction(new GetRewardsQuestAction(quest, new ActivateDialogAction(1, quest)));

                chapter.Add(quest);

                quest = new Quest(2, "Motivate the IA to help you", "Is she an IA ?");
                quest.AddRewards(new QuestReward());
                quest.Add(new TouchedItemGoal(1, "Say hello to IA", quest));
                quest.AddNextAction(new GetRewardsQuestAction(quest, new RequestNewQuestNPCAction(2, quest)));

                chapter.Add(quest);

                this.Current.Add(chapter);

                chapter = new Chapter(2, "Be alive during the trip");
                quest = new Quest(3, "To the boat ?", "Create the boat");
                quest.AddRewards(new QuestReward());
                quest.Add(new TouchedItemGoal(2, "Reorganize the ship", quest));
                quest.AddNextAction(new GetRewardsQuestAction(quest));

                chapter.Add(quest);

                this.Current.Add(chapter);
            }

            return this.Current;
        }
        #endregion

        #region Properties
        public IStory Current { get => this._story; private set => this._story = value; }
        #endregion
    }
}

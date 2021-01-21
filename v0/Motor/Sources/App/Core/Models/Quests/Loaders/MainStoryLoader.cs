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
                IChapter chapter = new Chapter(1, "Sortir du vaisseau");

                Quest quest = new Quest(1, "Wake up the IA", "IA is broken, try to reboot her");
                quest.AddRewards(new QuestReward(), new QuestReward(), new QuestReward());
                quest.Add(new TouchedItemGoal(1, "Accéder à l'arrière du tableau de bord", quest));
                quest.AddNextAction(new GetRewardsQuestAction(quest, new WaitingForNPCAction(2, quest)));

                chapter.Add(quest);

                quest = new Quest(2, "Motivate the IA to help you", "Is she an IA ?");
                quest.AddRewards(new QuestReward());
                quest.Add(new TouchedItemGoal(1, "Accéder à l'arrière du tableau de bord", quest));
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

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests
{
    /// <summary>
    /// Represents a quest in the game.
    /// Quest has a list of goals (steps) to achieve
    /// </summary>
    public interface IQuest: IList<IGoal>
    {
        /// <summary>
        /// Allows you to know if all goals are achieved
        /// </summary>
        bool IsAchieved { get; }

        /// <summary>
        /// True if it's a main quest, false, if it's secondary quest
        /// </summary>
        bool IsMain { get; }

        /// <summary>
        /// Name of the quest
        /// </summary>
        string Name { get; set; }

        /// <summary>
        /// Description of th quest
        /// </summary>
        string Description { get; set; }

        /// <summary>
        /// List of the rewards when the quest is achieved
        /// </summary>
        IList<IQuestReward> Rewards { get; }
    }
}

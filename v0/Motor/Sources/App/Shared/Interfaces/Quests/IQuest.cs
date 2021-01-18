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
        /// Allows you to define the next action before going to other quest
        /// </summary>
        /// <param name="action"></param>
        void AddNextAction(IQuestAction action);

        /// <summary>
        /// Add a list of rewards to give when the quest is achieved
        /// </summary>
        void AddRewards(params IQuestReward[] rewards);

        /// <summary>
        /// Checks if all goals are achieved
        /// And sends event of this achievment
        /// </summary>
        void EvaluateAchievment();

        /// <summary>
        /// Defines quest is active
        /// </summary>
        void Activate();

        /// <summary>
        /// Quest is not active for now
        /// </summary>
        void Deactivate();

        /// <summary>
        /// True if the quest is active
        /// </summary>
        bool IsActive { get; }

        /// <summary>
        /// Allows you to know if all goals are achieved
        /// </summary>
        bool IsAchieved { get; }

        /// <summary>
        /// True if it's a main quest, false, if it's secondary quest
        /// </summary>
        bool IsMain { get; }

        /// <summary>
        /// Id of the quest
        /// </summary>
        int Id { get; set; }

        /// <summary>
        /// Name of the quest
        /// </summary>
        string Name { get; set; }

        /// <summary>
        /// Description of the quest
        /// </summary>
        string Description { get; set; }

        /// <summary>
        /// Date of the validation of the quest
        /// </summary>
        DateTime? ValidatedDate { get; }

        /// <summary>
        /// List of the rewards when the quest is achieved
        /// </summary>
        IList<IQuestReward> Rewards { get; }
    }
}

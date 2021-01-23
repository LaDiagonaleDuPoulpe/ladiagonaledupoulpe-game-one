using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Models.Items;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests
{
    /// <summary>
    /// Represents a goal to achieve inside a quest
    /// </summary>
    public interface IGoal : IItem
    {
        /// <summary>
        /// Evaluate if the goal is achieved
        /// </summary>
        /// <returns>True if it's achieved</returns>
        bool Evaluate();

        /// <summary>
        /// Allows you to know if all goals are achieved
        /// </summary>
        bool IsAchieved { get; }

        /// <summary>
        /// Gets the parent quest
        /// </summary>
        IQuest Quest { get; }

        /// <summary>
        /// Description of the goal
        /// </summary>
        string Description { get; }
    }
}

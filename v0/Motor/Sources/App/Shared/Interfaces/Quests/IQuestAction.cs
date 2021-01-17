using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests
{
    /// <summary>
    /// Use this interface to define an action when a quest is finished
    /// </summary>
    public interface IQuestAction
    {
        /// <summary>
        /// Runs the selected action
        /// </summary>
        void Run();

        /// <summary>
        /// Defines next action to execute after this one
        /// </summary>
        IQuestAction Next { get; }

        /// <summary>
        /// Gets the previous quest that activates this action
        /// </summary>
        IQuest LastQuest { get; }

        /// <summary>
        /// Defines the next quest to start
        /// </summary>
        IQuest NextQuest { get; }
    }
}

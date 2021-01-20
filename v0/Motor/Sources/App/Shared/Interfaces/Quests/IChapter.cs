using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests
{
    /// <summary>
    /// Chapter of the story, contains quest list
    /// </summary>
    public interface IChapter : IList<IQuest>
    {
        /// <summary>
        /// Activates the chapter
        /// </summary>
        void Activate(bool activeQuest = true);

        /// <summary>
        /// Stops using current chapter
        /// </summary>
        void Inactivate();

        /// <summary>
        /// Searches next quest and activates it.
        /// If the chapter is not able to find one not actived quest, return false
        /// </summary>
        bool ActivateNextQuest();

        /// <summary>
        /// Id of the chapter
        /// </summary>
        int Id { get; set; }

        /// <summary>
        /// Chapter step (Displayed id)
        /// </summary>
        int DisplayedId { get; set; }

        /// <summary>
        /// Title of the chapter
        /// </summary>
        string Title { get; set; }

        /// <summary>
        /// Is done if all quests are achieved
        /// </summary>
        bool IsDone { get; }

        /// <summary>
        /// True if chapter is active
        /// </summary>
        bool IsActive { get; }

        /// <summary>
        /// Detects if there is at least one inactive quest
        /// </summary>
        bool HasNextInactiveQuest { get; }
    }
}

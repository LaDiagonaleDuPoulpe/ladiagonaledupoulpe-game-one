using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests
{
    /// <summary>
    /// Story of the game, with chapters
    /// </summary>
    public interface IStory : IList<IChapter>
    {
        /// <summary>
        /// Id of the story
        /// </summary>
        int Id { get; set; }

        /// <summary>
        /// Gets current active quest
        /// </summary>
        IQuest CurrentQuest { get; }
    }
}

using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Models.Items;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests
{
    /// <summary>
    /// Use this interface to load a story with chapters and quests
    /// </summary>
    public interface IStoryLoader
    {
        /// <summary>
        /// Loads one story, with chapters and quests
        /// </summary>
        /// <returns></returns>
        IStory LoadOne();

        /// <summary>
        /// Gets the current story
        /// </summary>
        IStory Current { get; }
    }
}

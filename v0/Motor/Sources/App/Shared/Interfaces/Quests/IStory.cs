﻿using System;
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
        /// Starts the story, and launche the first quest
        /// </summary>
        void Start();

        /// <summary>
        /// Id of the story
        /// </summary>
        int Id { get; set; }
    }
}

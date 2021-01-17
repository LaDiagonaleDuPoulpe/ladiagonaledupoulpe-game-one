using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests
{
    /// <summary>
    /// Uses this interface to create the story loader
    /// </summary>
    public interface IFactoryStoryLoader
    {
        /// <summary>
        /// Gets one story loader to create stories
        /// </summary>
        /// <returns></returns>
        IStoryLoader GetOne();
    }
}

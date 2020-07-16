using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Interfaces.Scenes
{
    /// <summary>
    /// Configuration for one level, a level is one scene
    /// </summary>
    public interface ILevelConfiguration
    {
        /// <summary>
        /// Key of the level
        /// </summary>
        string Key { get; set; }
    }
}

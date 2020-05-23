using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes
{
    /// <summary>
    /// Uses this interface to specify you will display clouds in the scene
    /// </summary>
    public interface IWithClouds
    {
        /// <summary>
        /// One cloud sprite to use to generate all clouds
        /// </summary>
        ICloudSprite CloudSprite { get; }
    }
}

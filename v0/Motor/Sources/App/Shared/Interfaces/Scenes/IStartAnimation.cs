using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes
{
    /// <summary>
    /// Uses this interface to define start and stop method
    /// </summary>
    public interface IStartAnimation
    {
        /// <summary>
        /// Starts the animation
        /// </summary>
        void Start();

        /// <summary>
        /// Stops the animation
        /// </summary>
        void Stop();
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Enums
{
    /// <summary>
    /// Differents states of heart bar
    /// </summary>
    public enum HeartBarState
    {
        /// <summary>
        /// Alive state : everything is ok
        /// </summary>
        Alive,

        /// <summary>
        /// Weak state (near dying state)
        /// </summary>
        Weak,

        /// <summary>
        /// Heart bar is done, dead
        /// </summary>
        Dead
    }
}

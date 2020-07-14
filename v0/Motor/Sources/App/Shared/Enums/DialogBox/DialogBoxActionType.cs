using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Enums
{
    /// <summary>
    /// List of actions with dialog box item
    /// </summary>
    public enum DialogBoxActionType
    {
        /// <summary>
        /// Starting to display one exchange
        /// </summary>
        Start = 0,
        /// <summary>
        /// Show the dialog box
        /// </summary>
        ShowBox = 1,
        /// <summary>
        /// End of one exchange
        /// </summary>
        End = 100,
        /// <summary>
        /// One message of the current exchange is starting to be displayed
        /// </summary>
        StartOneMessage = 1,
        /// <summary>
        /// One message of the current exchange is stopped to be displayed
        /// </summary>
        EndOneMessage = 10
    }
}

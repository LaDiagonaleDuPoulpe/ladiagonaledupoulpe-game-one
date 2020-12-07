using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Enums
{
    /// <summary>
    /// Potential states of a synale
    /// </summary>
    public enum SynaleState
    {
        /// <summary>
        /// SYnale values are initialized
        /// </summary>
        SynaleInitialized,

        /// <summary>
        /// Gets in power
        /// </summary>
        SynaleIncreased,

        /// <summary>
        /// Gets out power
        /// </summary>
        SynaleDecreased,

        /// <summary>
        /// Synale is done, no more power
        /// </summary>
        SynaleDone
    }
}

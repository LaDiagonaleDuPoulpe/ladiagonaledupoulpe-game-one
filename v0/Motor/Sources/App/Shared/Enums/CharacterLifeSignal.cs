using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Enums
{
    /// <summary>
    /// List of signal about character life
    /// </summary>
    public enum CharacterLifeSignal
    {
        /// <summary>
        /// Use this key to connect to event signal, when health changed
        /// </summary>
        HealthChanged,

        /// <summary>
        /// Use this key to connect to event signal, when there is no life
        /// </summary>
        LifeIsGone
    }
}

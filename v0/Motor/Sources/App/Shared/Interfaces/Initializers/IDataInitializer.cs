using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Signals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Initializers
{
    /// <summary>
    /// Contract for all data initializers in the game
    /// </summary>
    public interface IDataInitializer : IWithSignals
    {
        #region Public methods
        /// <summary>
        /// Loads all data from database
        /// </summary>
        void Load();
        #endregion

        #region Properties
        /// <summary>
        /// Gets unique key of the initializer
        /// </summary>
        string Key { get; }

        /// <summary>
        /// Know if data loaded is finished
        /// </summary>
        bool IsLoaded { get; }
        #endregion
    }
}

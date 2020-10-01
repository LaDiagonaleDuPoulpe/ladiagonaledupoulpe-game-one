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
    public interface IDataInitializer
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
        #endregion
    }
}

using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Initializers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers
{
    /// <summary>
    /// Initializer of all data of the player
    /// </summary>
    public abstract class PlayerDataInitializer : Godot.Object, IDataInitializer
    {
        #region Fields
        #region Signals
        /// <summary>
        /// Data are loaded
        /// </summary>
        /// <param name="data">Content data</param>
        [Signal]
        public delegate void DataLoaded(object data);
        #endregion
        #endregion

        #region Public methods
        /// <summary>
        /// Loads all data from database
        /// </summary>
        public abstract void Load();
        #endregion
    }
}

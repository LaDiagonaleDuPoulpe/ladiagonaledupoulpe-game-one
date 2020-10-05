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
    /// Parent class of all data initializers
    /// Uses it to define a data initializer
    /// </summary>
    public abstract class BaseDataInitializer : Node, IDataInitializer
    {
        #region Fields
        #region Signals
        /// <summary>
        /// Data are loaded
        /// </summary>
        /// <param name="data">Content data</param>
        [Signal]
        public delegate void DataLoaded(Godot.Object sender, Godot.Object data);

        /// <summary>
        /// Beginining of the data loading
        /// </summary>
        [Signal]
        public delegate void StartLoading(Godot.Object sender);
        #endregion
        #endregion

        #region Public methods
        public abstract void Load();
        #endregion

        #region Properties
        public string Key => this.GetType().Name;
        #endregion
    }
}

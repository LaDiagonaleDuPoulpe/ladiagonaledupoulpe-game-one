using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
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
        public virtual void Load()
        {
            this.DoLoad();
            this.DefineDataIsLoaded();
        }
        #endregion

        #region Internal methods
        /// <summary>
        /// Define data is loaded and launch signal to tell about it
        /// </summary>
        protected void DefineDataIsLoaded()
        {
            this.IsLoaded = true;
            this.EmitSignal(LoadDataType.DataLoaded.ToString(), this, new Godot.Object());
        }

        /// <summary>
        /// Defines this method to set the behavior to get the data
        /// </summary>
        protected virtual void DoLoad() { }
        #endregion

        #region Properties
        /// <summary>
        /// Unic key of the initializer
        /// </summary>
        public virtual string Key => this.GetType().Name;

        /// <summary>
        /// True if all data of the current loader are loaded
        /// </summary>
        public bool IsLoaded { get; protected set; }
        #endregion
    }
}

using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Preloaders
{
    /// <summary>
    /// Singleton to load some group of data initializers
    /// Plugin to put in autoload singleton mode
    /// </summary>
    public class DataPreloader : Node
    {
        #region Fields
        private ProxyDataInitializer _globalDataInitializer = null;

        #region Signals
        /// <summary>
        /// Data are loaded
        /// </summary>
        /// <param name="data">Content data</param>
        [Signal]
        public delegate void DataLoaded(Godot.Object sender, Godot.Object data);
        #endregion
        #endregion

        #region Public methods
        /// <summary>
        /// Starts to load the data about the step part
        /// It calss the <c>ProxyDataInitializer</c>
        /// </summary>
        public void Load(Enums.DataInitializerStep step)
        {
            base._Ready();
            this._globalDataInitializer = this.GetNode<ProxyDataInitializer>("/root/ProxyDataInitializer");

            this._globalDataInitializer.Connect(LoadDataType.DataLoaded.ToString(), this, nameof(globalDataInitializer_DataLoaded));
            this._globalDataInitializer.CurrentStep = Enums.DataInitializerStep.GlobalData;
            this._globalDataInitializer.Load();
        }
        #endregion

        #region Internal methods
        private void globalDataInitializer_DataLoaded(Godot.Object sender, Godot.Object data)
        {
            this.EmitSignal(LoadDataType.DataLoaded.ToString(), sender, data);
        }
        #endregion
    }
}

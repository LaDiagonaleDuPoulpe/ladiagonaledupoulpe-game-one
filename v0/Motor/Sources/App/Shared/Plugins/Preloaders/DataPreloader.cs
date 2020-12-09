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
        private ProxyDataInitializer _proxyDataInitializer = null;

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
            this._proxyDataInitializer = this.GetNode<ProxyDataInitializer>("/root/ProxyDataInitializer");

            if (this._proxyDataInitializer.IsConnected(nameof(ProxyDataInitializer.DataLoaded), this, nameof(globalDataInitializer_DataLoaded)))
            {
                this._proxyDataInitializer.Disconnect(nameof(ProxyDataInitializer.DataLoaded), this, nameof(globalDataInitializer_DataLoaded));
            }
            this._proxyDataInitializer.Connect(nameof(ProxyDataInitializer.DataLoaded), this, nameof(globalDataInitializer_DataLoaded));
            
            this._proxyDataInitializer.CurrentStep = step;
            this._proxyDataInitializer.Load();
        }
        #endregion

        #region Internal methods
        private void globalDataInitializer_DataLoaded(Godot.Object sender, Godot.Object data)
        {
            this.EmitSignal(nameof(DataLoaded), sender, data);
        }
        #endregion
    }
}

using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Preloaders
{
    /// <summary>
    /// Uses it to preload the first necessary data before load the root scene
    /// </summary>
    public class MainDataPreloader : Node
    {
        #region Fields
        private MainDataInitializer _globalDataInitializer = null;
        #endregion

        #region Public methods
        public override void _Ready()
        {
            base._Ready();
            this._globalDataInitializer = this.GetNode<MainDataInitializer>("/root/MainDataInitializer");
            this._globalDataInitializer.CurrentStep = Enums.DataInitializerStep.GlobalData;
            this._globalDataInitializer.Load();
        }
        #endregion
    }
}

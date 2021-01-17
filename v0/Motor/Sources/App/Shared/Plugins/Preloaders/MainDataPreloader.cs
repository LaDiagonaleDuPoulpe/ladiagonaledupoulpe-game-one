using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Preloaders
{
    /// <summary>
    /// Uses it to preload the first necessary data before load the root scene
    /// Plugin to put in autoload singleton mode
    /// </summary>
    public class MainDataPreloader : Node
    {
        #region Fields
        private DataPreloader _dataPreloader = null;
        #endregion

        #region Public methods
        public override void _Ready()
        {
            base._Ready();
            this._dataPreloader = this.GetRootNode<AutoLoaderAccessor>().DataPreloader;
            this._dataPreloader.Load(Enums.DataInitializerStep.GlobalData);
        }
        #endregion
    }
}

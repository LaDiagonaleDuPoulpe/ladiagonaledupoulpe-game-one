using ladiagonaledupoulpe.Sources.App.Core.Models.Settings;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Services.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers
{
    /// <summary>
    /// Initialize the main data of the game
    /// </summary>
    public abstract class GlobalDataDataInitializer : BaseDataInitializer
    {
        #region Public methods
        public override void Load()
        {
            GlobalDataService globalDataService = this.GetNode<GlobalDataService>("/root/GlobalDataService");

            globalDataService.GlobalSettings = this.GetGlobalSettings();

            this.IsLoaded = true;

            this.EmitSignal(LoadDataType.DataLoaded.ToString(), this, new Godot.Object());
        }
        #endregion

        #region Internal methods
        /// <summary>
        /// Get global settings instance
        /// </summary>
        /// <returns></returns>
        protected abstract GlobalSettings GetGlobalSettings();
        #endregion
    }
}

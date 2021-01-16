using ladiagonaledupoulpe.Sources.App.Core.Models.Settings;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Services.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers.Customs.Global
{
    /// <summary>
    /// Initialize the main data of the game
    /// </summary>
    public abstract class GlobalDataDataInitializer : BaseDataInitializer
    {
        #region Internal methods
        protected override void DoLoad()
        {
            GlobalDataService globalDataService = this.GetRootNode<GlobalDataService>();
            globalDataService.GlobalSettings = this.GetGlobalSettings();
        }
        #endregion

        #region Properties
        /// <summary>
        /// Get global settings instance
        /// </summary>
        /// <returns></returns>
        protected abstract GlobalSettings GetGlobalSettings();
        #endregion
    }
}

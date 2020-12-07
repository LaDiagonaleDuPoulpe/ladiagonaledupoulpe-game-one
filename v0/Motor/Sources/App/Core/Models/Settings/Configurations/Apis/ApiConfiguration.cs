using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations.Apis
{
    /// <summary>
    /// Srttings in json file to organize all apis configurations (urls, headers settings, ...)
    /// </summary>
    public class ApiConfiguration : DefaultConfiguration
    {
        #region Properties
        /// <summary>
        /// Compiler api configuration
        /// </summary>
        public CompilerApiConfiguration Compiler { get; set; }

        /// <summary>
        /// Game api configuration
        /// </summary>
        public GameApiConfiguration Game { get; set; }

        /// <summary>
        /// Player api configuration
        /// </summary>
        public PlayerApiConfiguration Player { get; set; }
        #endregion
    }
}

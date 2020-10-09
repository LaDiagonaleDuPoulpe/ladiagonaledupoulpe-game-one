using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Settings
{
    /// <summary>
    /// Main settings for the whole game
    /// </summary>
    public class GlobalSettings
    {
        #region Properties
        /// <summary>
        /// Compiler configuration
        /// </summary>
        public CompilerConfiguration Compiler { get; set; }
        #endregion
    }
}

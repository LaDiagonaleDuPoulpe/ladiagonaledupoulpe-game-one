﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations
{
    /// <summary>
    /// Srttings in json file to organize all apis configurations (urls, headers settings, ...)
    /// </summary>
    public class ApiConfiguration
    {
        #region Properties
        /// <summary>
        /// Compiler api configuration
        /// </summary>
        public CompilerConfiguration Compiler { get; set; }

        /// <summary>
        /// Game api configuration
        /// </summary>
        public GameConfiguration Game { get; set; }
        #endregion
    }
}

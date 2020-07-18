﻿using ladiagonaledupoulpe.Sources.App.Core.Interfaces.Scenes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations
{
    /// <summary>
    /// Configuration for one level, a level is one scene
    /// </summary>
    public class LevelConfiguration : ILevelConfiguration
    {
        #region Properties
        /// <summary>
        /// Key of the level
        /// </summary>
        public string Key { get; set; }
        #endregion
    }
}

﻿using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Requests;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Godot.HTTPClient;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations.Apis
{
    /// <summary>
    /// Default host configuration to define settings to connect to one api
    /// </summary>
    public abstract class BaseHostConfiguration : DefaultConfiguration, IHostConfiguration
    {
        #region Properties
        /// <summary>
        /// Headers for configure request HTTP
        /// </summary>
        public IList<string> Headers { get; set; }

        /// <summary>
        /// Relative url (without host server)
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// Default method to send to the server
        /// </summary>
        public Method Method { get; set; } = Method.Post;
        #endregion
    }
}

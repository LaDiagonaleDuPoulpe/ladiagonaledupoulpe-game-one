using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations
{
    /// <summary>
    /// Default host configuration to define settings to connect to one api
    /// </summary>
    public abstract class BaseHostConfiguration
    {
        #region Properties
        /// <summary>
        /// Host server api url 
        /// </summary>
        public string HostServer { get; set; }

        /// <summary>
        /// Headers for configure request HTTP
        /// </summary>
        public IList<string> Headers { get; set; }
        #endregion
    }
}

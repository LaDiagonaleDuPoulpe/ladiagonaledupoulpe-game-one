using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations
{
    /// <summary>
    /// Settings Compiler Server
    /// </summary>
    public class CompilerConfiguration
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

using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Initializers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers
{
    /// <summary>
    /// Composition class to know if an initializer is loaded
    /// </summary>
    public class LoadedDataInitializerResult
    {
        #region Constructors
        public LoadedDataInitializerResult(IDataInitializer initializer)
        {
            this.Initializer = initializer;
        }
        #endregion

        #region Properties
        /// <summary>
        /// Data initializer
        /// </summary>
        public IDataInitializer Initializer { get; private set; }

        /// <summary>
        /// State of the data initializer
        /// </summary>
        public bool IsLoaded { get; set; } = false;
        #endregion
    }
}

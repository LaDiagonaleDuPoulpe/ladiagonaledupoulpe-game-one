using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Enums
{
    /// <summary>
    /// Load data type enumeration about steps in data loading
    /// </summary>
    public enum LoadDataType
    {
        /// <summary>
        /// Before loading data
        /// </summary>
        StartLoading,

        /// <summary>
        /// Loading data, this is the begining
        /// </summary>
        DataLoading,

        /// <summary>
        /// We get the data
        /// </summary>
        DataLoaded
    }
}

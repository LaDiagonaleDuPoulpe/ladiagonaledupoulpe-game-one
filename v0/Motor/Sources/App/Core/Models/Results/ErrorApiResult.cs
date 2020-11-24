using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Results
{
    /// <summary>
    /// Use this class to get the error of the api http response
    /// </summary>
    public class ErrorApiResult
    {
        #region Properties
        /// <summary>
        /// Code of the last error
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// Last message of the last error
        /// </summary>
        public string Message { get; set; }
        #endregion
    }
}

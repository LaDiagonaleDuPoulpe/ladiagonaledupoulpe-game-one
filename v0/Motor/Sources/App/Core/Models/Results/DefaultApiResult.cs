using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Results
{
    /// <summary>
    /// Default class to get result of api request
    /// Uses it when the pattern of the api response is based on result pattern
    /// </summary>
    public class DefaultApiResult<T>: Godot.Object, IHttpResponse 
                                      where T: class
    {
        #region Properties
        /// <summary>
        /// Success of the last action
        /// </summary>
        public bool IsSuccess { get; set; }

        /// <summary>
        /// Current item (not null if success is true)
        /// </summary>
        public T Item { get; set; }

        /// <summary>
        /// Gets the last error data
        /// </summary>
        public ErrorApiResult LastError { get; set; }
        #endregion
    }
}

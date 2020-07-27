using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Enums
{
    /// <summary>
    /// Types of loading action 
    /// </summary>
    public enum LoadingActionsType
    {
        /// <summary>
        /// Starting loading for all files
        /// </summary>
        Begin,

        /// <summary>
        /// End loading all resources
        /// </summary>
        End,

        /// <summary>
        /// Reinit the loading resources 
        /// </summary>
        Reinit,

        /// <summary>
        /// Begin loading one resource
        /// </summary>
        BeginLoadingResource,

        /// <summary>
        /// End loading one resource
        /// </summary>
        EndLoadingResource
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Godot.HTTPClient;

namespace ladiagonaledupoulpe.Sources.App.Core.Interfaces.Requests
{
    /// <summary>
    /// Default host configuration to define settings to connect to one api
    /// </summary>
    public interface IHostConfiguration
    {
        /// <summary>
        /// Headers for configure request HTTP
        /// </summary>
        IList<string> Headers { get; set; }

        /// <summary>
        /// Full url (without host server)
        /// </summary>
        string Url { get; set; }

        /// <summary>
        /// Default method to send to the server
        /// </summary>
        Method Method { get; set; } 
    }
}

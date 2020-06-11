using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Interfaces.Scenes
{
    /// <summary>
    /// Uses this interface to allow resources loader to know one scene could load resources
    /// </summary>
    public interface IWithJson
    {
        string Name { get; set; }
    }
}

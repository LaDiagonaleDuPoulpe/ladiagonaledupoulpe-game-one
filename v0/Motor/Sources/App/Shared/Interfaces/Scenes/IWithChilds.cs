using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes
{
    /// <summary>
    /// Scene or node with cilds
    /// </summary>
    public interface IWithChilds
    {
        /// <summary>
        /// Add child
        /// </summary>
        /// <param name="node"></param>
        void AddChild(Godot.Node node, bool legibleUniqueName = false);
    }
}

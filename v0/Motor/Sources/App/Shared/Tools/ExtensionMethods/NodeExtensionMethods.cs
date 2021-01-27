using Godot;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods
{
    /// <summary>
    /// Methods to add on Godot.Node
    /// </summary>
    public static class NodeExtensionMethods
    {
        #region Public methods
        /// <summary>
        /// Removes all nodes from one parent node
        /// </summary>
        /// <param name="parent"></param>
        public static void RemoveAllOldies(this Godot.Node parent)
        {
            foreach (var item in parent.GetChildren())
            {
                Node node = item as Node;
                parent.RemoveChild(node);
                node.QueueFree();
            }
        }
        #endregion
    }
}

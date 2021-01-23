using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Models.Items;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods
{
    /// <summary>
    /// Apply methods to <c>IItem</c> interface
    /// </summary>
    public static class IITemExtensionMethods
    {
        #region Public methods
        /// <summary>
        /// Remove child from parent and queue free item
        /// </summary>
        /// <param name="item"></param>
        public static void ToBeFree(this IItem item, Godot.Node parent = null)
        {
            Node node = item as Node;
            parent?.RemoveChild(node);
            node.QueueFree();
        }
        #endregion
    }
}

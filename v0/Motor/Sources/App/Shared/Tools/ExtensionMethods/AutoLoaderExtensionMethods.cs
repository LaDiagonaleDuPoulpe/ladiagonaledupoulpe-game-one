using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods
{
    /// <summary>
    /// Gets auto loader extensions methods to help to get nodes, ...
    /// </summary>
    public static class AutoLoaderExtensionMethods
    {
        #region Fields
        private const string DEFAULT_PATH = "/root/";
        #endregion

        #region Public methods
        /// <summary>
        /// Gets instance from singleton autoloader
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="node">Node to apply the method</param>
        /// <param name="specificName">If not empty, it's the name in the autoloader</param>
        /// <returns></returns>
        public static T GetRootNode<T>(this Godot.Node node, string specificName = "") where T: class
        {
            if (string.IsNullOrEmpty(specificName))
            {
                specificName = typeof(T).Name;
            }

            return node.GetNode<T>(DEFAULT_PATH + specificName);
        }
        #endregion
    }
}

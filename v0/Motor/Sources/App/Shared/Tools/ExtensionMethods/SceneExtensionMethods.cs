using Godot;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods
{
    /// <summary>
    /// Methods to help scene (node)
    /// </summary>
    public static class SceneExtensionMethods
    {
        #region Public methods
        /// <summary>
        /// Returns a new instance of one scene (node) from resource url
        /// </summary>
        /// <typeparam name="T">Type of the scene</typeparam>
        /// <param name="node"></param>
        /// <param name="relativePath">Path without .tscn</param>
        /// <returns></returns>
        public static T ToInstance<T>(this Godot.Node node, string relativePath) where T:class
        {
            var scene = GD.Load<PackedScene>($"res://Sources/App/Shared/Scenes/{relativePath}.tscn");
            T instance = scene.Instance() as T;

            return instance;
        }
        #endregion
    }
}

using Godot;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes
{
    /// <summary>
    /// Uses it to precise scene or node is a main scene
    /// </summary>
    public interface IMainScene
    {
        /// <summary>
        /// Size of the window
        /// </summary>
        Vector2 WindowSize { get; }
    }
}

using Godot;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Base.Scenes
{
    /// <summary>
    /// Parent scene of all scene (root and active scenes)
    /// </summary>
    public abstract class BaseScene : Node2D
    {
        #region Signals
        [Signal]
        public delegate void ShowBox();
        #endregion
    }
}

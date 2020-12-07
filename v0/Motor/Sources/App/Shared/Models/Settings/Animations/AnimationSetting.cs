using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Models.Settings.Animations
{
    /// <summary>
    /// Use this class to set the value a current animation
    /// You can define the key of the animation, and the speed scale of it
    /// </summary>
    public class AnimationSetting : Godot.Object
    {
        #region Properties
        /// <summary>
        /// Unic key of the animation to play
        /// </summary>
        public string Key { get; set; }

        /// <summary>
        /// Speed scale of the current animation 
        /// (default value : 1)
        /// </summary>
        public int SpeedScale { get; set; } = 1;
        #endregion
    }
}

using Godot;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods
{
    /// <summary>
    /// New methods for godot animation
    /// </summary>
    public static class AnimationExtensionMethods
    {
        #region Public methods
        /// <summary>
        /// Defines value of one key, from one animation
        /// </summary>
        /// <param name="animation"></param>
        /// <param name="animationId"></param>
        /// <param name="time"></param>
        /// <param name="position"></param>
        public static void DefinePositionToAnimation(this Animation animation, int animationId, float time, Vector2 position)
        {
            int key = animation.TrackFindKey(animationId, time, true);
            if (key >= 0)
            {
                animation.TrackSetKeyValue(animationId, key, position);
            }
        }
        #endregion
    }
}

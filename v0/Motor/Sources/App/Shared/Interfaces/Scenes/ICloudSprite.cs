using System;
using Godot;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes
{
    /// <summary>
    /// Contract to define the rules of the cloud sprite
    /// </summary>
    public interface ICloudSprite
    {
        /// <summary>
        /// Animated sprite, representing the animated cloud
        /// </summary>
        AnimatedSprite AnimatedSprite { get; }
    }
}

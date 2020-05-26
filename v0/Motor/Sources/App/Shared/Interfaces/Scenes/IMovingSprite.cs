using System;
using Godot;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes
{
    /// <summary>
    /// Contract to define the rules of the sprite
    /// </summary>
    public interface IMovingSprite : ICloneable
    {
        /// <summary>
        /// Animated sprite, representing the animated sprite
        /// </summary>
        AnimatedSprite AnimatedSprite { get; }

        /// <summary>
        /// Position of the item
        /// </summary>
        Vector2 Position { get; set; }

        /// <summary>
        /// Position of the sprite in the Z axis
        /// </summary>
        int ZIndex { get; set; }
    }
}

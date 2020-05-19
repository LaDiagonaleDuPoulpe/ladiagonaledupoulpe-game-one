using Godot;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Scenes.Dialog
{
    /// <summary>
    /// Uses this class to define one message to display to the dialogbox
    /// </summary>
    public class MessageContent
    {
        #region Properties
        /// <summary>
        /// Text to display in the dialog box
        /// </summary>
        public string Content { get; set; }

        /// <summary>
        /// Sprite frames to animate the dialog
        /// </summary>
        public SpriteFrames SpriteFrames { get; set; }

        /// <summary>
        /// Direction of the animated sprite
        /// </summary>
        public AnimatedSpriteDirection SpriteDirection { get; set; }
        #endregion
    }
}

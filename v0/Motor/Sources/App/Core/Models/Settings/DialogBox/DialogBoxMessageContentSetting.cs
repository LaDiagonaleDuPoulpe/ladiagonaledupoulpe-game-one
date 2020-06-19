using ladiagonaledupoulpe.Sources.App.Shared.Scenes.Dialog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Settings.DialogBox
{
    /// <summary>
    /// Setting of one message in exchange item
    /// </summary>
    public class DialogBoxMessageContentSetting
    {
        #region Properties
        /// <summary>
        /// One message content to display in dialog box
        /// </summary>
        public string Content { get; set; }

        /// <summary>
        /// Direction to display sprite of the message
        /// </summary>
        public AnimatedSpriteDirection SpriteDirection { get; set; }

        /// <summary>
        /// Path of the sprite animation to load
        /// </summary>
        public string SpriteFramesPath { get; set; }
        #endregion
    }
}

using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.DialogBox;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.DialogBox;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Scenes.Dialog;
using System;
using System.Collections.Generic;

namespace ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods
{
    /// <summary>
    /// Methods to help exchange setting class instances
    /// </summary>
    public static class ExchangeSettingExtensionMethod
    {
        #region Public methods
        /// <summary>
        /// Gets one instance of exchange thanks for setting
        /// </summary>
        /// <returns></returns>
        public static DialogBoxExchange Convert(this DialogBoxExchangesItemSetting setting, Func<string, string, bool, Resource> loadResource)
        {
            DialogBoxExchange item = new DialogBoxExchange();

            item.AutoLoad = setting.AutoLoad;
            item.Key = setting.Key;
            item.TimeBeforeStart = setting.TimeBeforeStart;

            item.Messages = new List<MessageContent>();
            setting.Messages?.ForEach(messageSetting => item.Messages.Add(messageSetting.Convert(loadResource)));

            return item;
        }

        /// <summary>
        /// Gets one instance of exchange thanks for setting
        /// </summary>
        /// <returns></returns>
        public static MessageContent Convert(this DialogBoxMessageContentSetting setting, Func<string, string, bool, Resource> loadResource)
        {
            MessageContent message = new MessageContent();

            message.Content = setting.Content;
            message.SpriteDirection = (AnimatedSpriteDirection)Enum.Parse(typeof(AnimatedSpriteDirection), setting.SpriteDirection);
            message.SpriteFrames = (SpriteFrames)loadResource(setting.SpriteFramesPath, string.Empty, false);

            return message;
        }
        #endregion
    }
}

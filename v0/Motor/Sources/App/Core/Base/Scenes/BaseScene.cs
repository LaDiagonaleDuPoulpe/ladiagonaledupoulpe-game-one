using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings;
using ladiagonaledupoulpe.Sources.App.Shared.Scenes.Dialog.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Services;
using Motor.Sources.App.Core.Interfaces.Scenes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Base.Scenes
{
    /// <summary>
    /// Base class to each scene in project
    /// </summary>
    public abstract class BaseScene : Node2D, IDataInit
    {
        #region Fields
        #endregion

        #region Public methods
        public void Initialize(List<DialogBoxExchange> contents)
        {
            GD.Print("Initialize");
            DialoxBoxManager.Instance.Preload(contents);
        }
        #endregion

        #region Internal methods
        #endregion

        #region Properties
        #endregion
    }
}

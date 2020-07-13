using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.DialogBox;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings;
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
        private DialoxBoxManager _dialoxBoxManager = null;
        #endregion

        #region Constructors
        public BaseScene(): base()
        {

        }
        #endregion

        #region Public methods
        public override void _Ready()
        {
            this.DialoxBoxManager = this.GetNode<DialoxBoxManager>("/root/DialoxBoxManager");
        }

        public void Initialize(List<DialogBoxExchange> contents)
        {
            this.DialoxBoxManager.Preload(contents);
        }
        #endregion

        #region Internal methods
        #endregion

        #region Properties
        /// <summary>
        /// Manager of the dialog box (autoload singleton)
        /// </summary>
        public DialoxBoxManager DialoxBoxManager { get => this._dialoxBoxManager; private set => this._dialoxBoxManager = value; }
        #endregion
    }
}

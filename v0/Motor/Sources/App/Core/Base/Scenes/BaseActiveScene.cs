using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.DialogBox;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.Scenes;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.DialogBox;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Services;
using ladiagonaledupoulpe.Sources.App.Shared.Services.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Base.Scenes
{
    /// <summary>
    /// Base class to each active scene in project
    /// </summary>
    public abstract class BaseActiveScene : BaseScene, IDataInit
    {
        #region Fields
        private GlobalDataService _globalDataService = null;
        private Player _currentPlayer = null;
        private OnePlayerStatusBar _statusBar = null;
        #endregion

        #region Constructors
        public BaseActiveScene(): base()
        {

        }
        #endregion

        #region Public methods
        public override void _Ready()
        {
            base._Ready();

            this.GlobalDataService = this.GetNode<GlobalDataService>("/root/GlobalDataService");
            this._currentPlayer = this.GetNode<Player>("/root/CurrentPlayer");
            this._statusBar = this.GetNode<OnePlayerStatusBar>("/root/OnePlayerStatusBar");

            this.Initialize(this.GlobalDataService.CurrentExchanges);

            this.PrepareEvents();
        }

        public void Initialize(List<DialogBoxExchange> contents)
        {
            this.DialoxBoxManager.Preload(contents);
        }
        #endregion

        #region Internal methods
        private void PrepareEvents()
        {
            IDialoxBoxManager dialogBoxManager = this.GetNode<IDialoxBoxManager>("/root/DialoxBoxManager");
            dialogBoxManager.Connect(DialogBoxActionType.EndOfOneExchange.ToString(), this, nameof(EndOfOneExchange));
        }

        private void EndOfOneExchange()
        {
            GD.Print("EndOfOneExchange");
        }

        /// <summary>
        /// Defines visibility of player, statusbar, ...
        /// </summary>
        /// <param name="visible"></param>
        protected virtual void SetVisibilityGlobalNodes()
        {            
            this._currentPlayer.Visible = this.RootNodesVisibility;
            this._statusBar.Visible = this.RootNodesVisibility;
        }
        #endregion

        #region Properties
        /// <summary>
        /// Service to get global project data
        /// </summary>
        public GlobalDataService GlobalDataService { get => this._globalDataService; private set => this._globalDataService = value; }

        /// <summary>
        /// Defines visibility of player, statusbar, ...
        /// </summary>
        public virtual bool RootNodesVisibility { get => true; }
        #endregion
    }
}

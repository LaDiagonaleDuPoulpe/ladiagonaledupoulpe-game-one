using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.DialogBox;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.Scenes;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.DialogBox;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins;
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
        #region Constructors
        public BaseActiveScene(): base()
        {

        }
        #endregion

        #region Public methods
        public override void _Ready()
        {
            base._Ready();

            this.Initialize(this.AutoLoaderAccessor.GlobalDataService.CurrentExchanges);
            this.PrepareEvents();
        }

        public void Initialize(List<DialogBoxExchange> contents)
        {
            this.DialoxBoxManager.Preload(contents);
            this.SetVisibilityGlobalNodes();
        }
        #endregion

        #region Internal methods
        private void PrepareEvents()
        {
            this.AutoLoaderAccessor.DialogBoxManager.Connect(DialogBoxActionType.EndOfOneExchange.ToString(), this, nameof(EndOfOneExchange));
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
            this.AutoLoaderAccessor.CurrentPlayer.Visible = this.RootNodesVisibility;
            this.AutoLoaderAccessor.StatusBar.SetVisibility(this.RootNodesVisibility);
        }
        #endregion

        #region Properties
        
        /// <summary>
        /// Defines visibility of player, statusbar, ...
        /// </summary>
        public virtual bool RootNodesVisibility { get => true; }
        #endregion
    }
}

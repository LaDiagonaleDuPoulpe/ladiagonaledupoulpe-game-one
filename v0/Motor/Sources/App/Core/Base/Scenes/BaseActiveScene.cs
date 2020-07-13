using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.DialogBox;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings;
using ladiagonaledupoulpe.Sources.App.Shared.Services;
using ladiagonaledupoulpe.Sources.App.Shared.Services.Data;
using Motor.Sources.App.Core.Interfaces.Scenes;
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

            this.Initialize(this.GlobalDataService.CurrentExchanges);
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
        /// Service to get global project data
        /// </summary>
        public GlobalDataService GlobalDataService { get => this._globalDataService; private set => this._globalDataService = value; }
        #endregion
    }
}

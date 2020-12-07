﻿using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Initializers;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers.Customs.Global;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers
{
    /// <summary>
    /// Factory and singleton to initialize all data initializer
    /// </summary>
    public class ProxyDataInitializer : BaseDataInitializer
    {
        #region Fields
        private Dictionary<DataInitializerStep, DataInitializerGroup> _dataInitializerGroups = new Dictionary<DataInitializerStep, DataInitializerGroup>();
        #endregion

        #region Constructors
        public ProxyDataInitializer()
        {
            this.DefineDataInitializerGroups();
        }
        #endregion

        #region Public methods
        public override void Load()
        {
            if(this.CurrentStep > 0)
            {
                this._dataInitializerGroups[this.CurrentStep].Load();
            }
        }

        public void Initializer_DataLoaded(Godot.Object sender,  Godot.Object data)
        {
            this.EmitSignal(nameof(DataLoaded), this, data);
        }
        #endregion

        #region Internal methods
        private void DefineDataInitializerGroups()
        {
            this._dataInitializerGroups.Add(DataInitializerStep.GlobalData, new DataInitializerGroup(DataInitializerStep.GlobalData));
            this._dataInitializerGroups.Add(DataInitializerStep.NewGame, new DataInitializerGroup(DataInitializerStep.NewGame));

            foreach (var item in this._dataInitializerGroups)
            {
                this.AddChild(item.Value as Node);
                item.Value.Connect(nameof(DataInitializerGroup.DataLoaded), this, nameof(Initializer_DataLoaded));
            }

            this.DefineGlobalDataInitializer();
            this.DefinePlayerInitializer();
        }

        private void DefineGlobalDataInitializer()
        {
            GlobalDataDataInitializer initializer = new JsonGlobalDataDataInitializer();

            this._dataInitializerGroups[DataInitializerStep.GlobalData].Add(initializer);
        }

        private void DefinePlayerInitializer()
        {
            this._dataInitializerGroups[DataInitializerStep.NewGame].Add(new Customs.Game.HttpGameDataInitializer());
            this._dataInitializerGroups[DataInitializerStep.NewGame].Add(new Customs.Player.HttpPlayerDataInitializer());
        }
        #endregion

        #region Properties
        /// <summary>
        /// Current step of data loading
        /// </summary>
        public DataInitializerStep CurrentStep { get; set; }
        #endregion
    }
}

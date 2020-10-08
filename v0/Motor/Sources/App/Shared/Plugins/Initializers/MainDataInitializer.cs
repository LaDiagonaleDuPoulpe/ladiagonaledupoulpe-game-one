using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Initializers;
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
    public class MainDataInitializer : BaseDataInitializer
    {
        #region Fields
        private Dictionary<DataInitializerStep, DataInitializerGroup> _dataInitializers = new Dictionary<DataInitializerStep, DataInitializerGroup>();
        #endregion

        #region Constructors
        public MainDataInitializer()
        {
            this.DefineGlobalDataInitializer();
            this.DefinePlayerInitializer();
        }
        #endregion

        #region Public methods
        public override void Load()
        {
            if(this.CurrentStep > 0)
            {
                this._dataInitializers[this.CurrentStep].Load();
            }
        }

        public void Initializer_DataLoaded(Godot.Object sender,  Godot.Object data)
        {
            //IDataInitializer initializer = sender as IDataInitializer;

            //LoadedDataInitializerResult item = this._dataInitializers.First(result => result.Initializer.Key == initializer.Key);
            //initializer.IsLoaded = true;

            //if (this._dataInitializers.All(result => result.IsLoaded))
            //{
            //    this._dataInitializers.ForEach(init => this.RemoveChild(init.Initializer as Node));
            //    this.EmitSignal(LoadDataType.DataLoaded.ToString(), this, null);
            //}
        }
        #endregion

        #region Internal methods
        private void DefineGlobalDataInitializer()
        {
            GlobalDataDataInitializer initializer = new JsonGlobalDataDataInitializer();

            this.AddAndConnectInitializer(DataInitializerStep.GlobalData, initializer);
        }

        private void DefinePlayerInitializer()
        {
            PlayerDataInitializer initializer = new InMemoryPlayerDataInitializer();

            this.AddAndConnectInitializer(DataInitializerStep.PlayerData, initializer);
        }

        private void AddAndConnectInitializer(DataInitializerStep step, IDataInitializer initializer)
        {
            initializer.Connect(LoadDataType.DataLoaded.ToString(), this, nameof(Initializer_DataLoaded));

            //this._dataInitializers.Add(step, new LoadedDataInitializerResult(initializer));
            this.AddChild(initializer as Node);
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

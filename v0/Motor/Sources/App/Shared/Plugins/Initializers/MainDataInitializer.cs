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
        private List<LoadedDataInitializerResult> _dataInitializers = new List<LoadedDataInitializerResult>();
        #endregion

        #region Constructors
        public MainDataInitializer()
        {
            InMemoryPlayerDataInitializer initializer = new InMemoryPlayerDataInitializer();

            initializer.Connect(LoadDataType.DataLoaded.ToString(), this, nameof(Initializer_DataLoaded));

            this._dataInitializers.Add(new LoadedDataInitializerResult(initializer));
        }
        #endregion

        #region Public methods
        public override void Load()
        {
            this._dataInitializers.ForEach(item => item.Initializer.Load());
        }

        public void Initializer_DataLoaded(Godot.Object sender,  Godot.Object data)
        {
            IDataInitializer initializer = sender as IDataInitializer;

            LoadedDataInitializerResult item = this._dataInitializers.First(result => result.Initializer.Key == initializer.Key);
            item.IsLoaded = true;

            if (this._dataInitializers.All(result => result.IsLoaded))
            {
                this.EmitSignal(LoadDataType.DataLoaded.ToString(), this, null);
            }
        }
        #endregion
    }
}

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
    public class GlobalDataInitializer : Node, IDataInitializer
    {
        #region Fields
        #region Signals
        /// <summary>
        /// Beginining of the data loading
        /// </summary>
        [Signal]
        public delegate void StartLoading();

        /// <summary>
        /// End of the data loading
        /// </summary>
        [Signal]
        public delegate void DataLoaded();
        #endregion

        private List<(IDataInitializer Initializer, bool Loaded)> _dataInitializers = new List<(IDataInitializer, bool)>();
        #endregion

        #region Constructors
        public GlobalDataInitializer()
        {
            InMemoryPlayerDataInitializer initializer = new InMemoryPlayerDataInitializer();

            initializer.Connect(LoadDataType.DataLoaded.ToString(), this, nameof(Initializer_DataLoaded));

            this._dataInitializers.Add((Initializer: initializer, Loaded: false));
        }
        #endregion

        #region Public methods
        public void Load()
        {
            this._dataInitializers.ForEach(item => item.Item1.Load());
        }

        public void Initializer_DataLoaded(IDataInitializer initializer, object data)
        {
            GD.Print("Initializer_DataLoaded");

            (IDataInitializer Initializer, bool Loaded) item = this._dataInitializers.First(result => result.Initializer.Key == initializer.Key);
            item.Loaded = true;

            if (this._dataInitializers.All(result => result.Loaded))
            {
                this.EmitSignal(LoadDataType.DataLoaded.ToString(), null);
            }
        }
        #endregion
    }
}

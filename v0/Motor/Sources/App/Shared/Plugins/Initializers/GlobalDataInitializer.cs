using Godot;
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

        private List<IDataInitializer> _dataInitializers = new List<IDataInitializer>();
        #endregion

        #region Constructors
        public GlobalDataInitializer()
        {
            this._dataInitializers.Add(new InMemoryPlayerDataInitializer());
        }
        #endregion

        #region Public methods
        public void Load()
        {
            this._dataInitializers.ForEach(item => item.Load());
        }
        #endregion
    }
}

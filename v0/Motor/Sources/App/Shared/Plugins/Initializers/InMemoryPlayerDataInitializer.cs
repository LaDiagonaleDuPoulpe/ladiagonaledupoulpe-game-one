using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers
{
    /// <summary>
    /// In memory data initializer for a player
    /// </summary>
    public class InMemoryPlayerDataInitializer : PlayerDataInitializer
    {
        #region Public methods
        public override void Load()
        {
            this.EmitSignal(LoadDataType.DataLoaded.ToString(), this, new Godot.Object());
        }
        #endregion
    }
}

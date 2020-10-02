using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Characters;
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
    /// Initializer of all data of the player
    /// </summary>
    public abstract class PlayerDataInitializer : BaseDataInitializer
    {
        #region Public methods
        public override void Load()
        {
            CharacterDataSetting setting = new CharacterDataSetting();

            this.DefineSetting(setting);

            this.EmitSignal(LoadDataType.DataLoaded.ToString(), this, setting);
        }
        #endregion

        #region Internal methods
        /// <summary>
        /// You can override this methode to set some values from setting
        /// </summary>
        /// <param name="setting">Setting is not null</param>
        protected virtual void DefineSetting(CharacterDataSetting setting)
        {
            // Here, nothing to do
        }
        #endregion
    }
}
